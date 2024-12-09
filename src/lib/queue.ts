import { getGeoData } from "@/actions/apiHelper";
import prisma from "@/config/db/prisma";
import { extractSource } from "./extractSource";

function updateJsonField(field: any, key: string, date: string): any {
  const updatedField = { ...field };
  updatedField[key] = updatedField[key] || {};
  updatedField[key][date] = (updatedField[key][date] || 0) + 1;
  return updatedField;
}

// Function to create analytics entry if it doesn't exist
async function createAnalytics(shortUrlId: string) {
  return await prisma.analytics.create({
    data: {
      shortUrlId,
      countries: {},
      devices: {},
      sources: {},
      ipAddresses: [],
      cities: {},
    },
  });
}

export async function processAnalyticsQueue() {
  try {
    // Get unprocessed items with less than 3 attempts
    const items = await prisma.analyticsQueue.findMany({
      where: {
        processed: false,
        attempts: {
          lt: 3,
        },
      },
    });

    for (const item of items) {
      try {
        const data = item.data as any;

        const { shortUrlId, ipAddress, device, referer, userAgent, date } = data;

        // Update analyticsa
        await prisma.$transaction(async (tx) => {
          // Get existing analytics or create a new one
          const analytics = await tx.analytics.findUnique({
            where: { shortUrlId },
          });

          const analyticsCopy = {
            countries: analytics?.countries || {},
            devices: analytics?.devices || {},
            sources: analytics?.sources || {},
            cities: analytics?.cities || {},
            ipAddresses: analytics?.ipAddresses || [],
          };

          // Check if the click is unique
          const isUniqueClick = !analytics?.ipAddresses?.includes(ipAddress);

          //extract sources

          const source = extractSource(referer, userAgent);

          // Get geo data
          const geoData = await getGeoData(ipAddress);

          const createUpdateObject = {
            ipAddresses: isUniqueClick ? [...((analyticsCopy?.ipAddresses as any) || []), ipAddress] : undefined,
            countries: updateJsonField(analyticsCopy?.countries, geoData?.country || "Unknow", date),
            devices: updateJsonField(analyticsCopy?.devices, device, date),
            sources: updateJsonField(analyticsCopy?.sources, source, date),
            cities: updateJsonField(analyticsCopy?.cities, geoData?.city || "Unknow", date),
          };

          // Update aggregated metrics
          await tx.analytics.upsert({
            where: { shortUrlId },
            create: {
              ...createUpdateObject,
              shortUrlId,
            },
            update: {
              ...createUpdateObject,
            },
          });

          // Update unique clicks if it's a unique click
          await tx.shortUrl.update({
            where: { id: shortUrlId },
            data: {
              totalClicks: { increment: 1 },
              uniqueClicks: isUniqueClick ? { increment: 1 } : undefined, // Increment if unique, otherwise undefined
            },
          });

          // Mark queue item as processed
          await tx.analyticsQueue.update({
            where: { id: item.id },
            data: {
              processed: true,
              processedAt: new Date(),
            },
          });
        });
      } catch (error) {
        console.log(error, "ERROR WHILE PROCESSING ANALYTICS");
        // Update attempt count on failure
        await prisma.analyticsQueue.update({
          where: { id: item.id },
          data: {
            attempts: { increment: 1 },
            error: error instanceof Error ? error.message : "Unknown error",
          },
        });
      }
    }
  } catch (err) {
    console.log(err, "ERROR WHILE PROCESSING ANALYTICS");
    throw new Error(err as any);
  }
}
