"use server";
import prisma from "@/config/db/prisma";
import { getSession } from "./auth";
import { AnalyticsDashboardData } from "@/interfaces";
import moment from "moment";

export async function deleteShortURL(id: string) {
  try {
    const session = await getSession();
    const userId = session?.user?.email;

    await prisma.shortUrl.delete({
      where: { id, userId },
    });
    return "Success";
  } catch (error) {
    console.log(error, "ERROR WHILE DELETING RECORD");
    throw new Error(`${error}: ERROR WHILE DELETING RECORD`);
  }
}

export async function getShortURlDetailsById(id: string) {
  try {
    const session = await getSession();
    const userId = session?.user?.email;

    return prisma.shortUrl.findFirst({
      where: { id, userId },
    });
  } catch (error) {
    console.log(error, "ERROR WHILE GETTING RECORD");
    throw new Error(`${error}: ERROR WHILE GETTING RECORD`);
  }
}

export async function updatedQRCodeDetails({
  id,
  qrCodeDetails,
}: {
  id: string;
  qrCodeDetails: {
    qrCodeImage: string;
    qrCodeoptions: any;
  };
}) {
  try {
    const result = await prisma.shortUrl.update({
      where: {
        id,
      },
      data: {
        qrCode: qrCodeDetails?.qrCodeImage || null,
        qrCodeOptions: JSON.stringify(qrCodeDetails.qrCodeoptions) || null,
        updatedAt: new Date(),
        isQRCodeEnabled: true,
      },
    });

    return "Success";
  } catch (error) {
    console.log(error, "ERROR WHILE UPDATING QRCODE DETAILS");
    throw new Error(`${error}: ERROR WHILE UPDATING QRCODE DETAILS `);
  }
}

export async function getUserUrls(page: number, limit: number, token: string, isQRCodeEnabled = false) {
  const session = await getSession();
  const userId = session?.user?.email;

  const skip = (page - 1) * limit;

  const whereClause = userId ? { OR: [{ userId }, { token: token ?? undefined }] } : { token: token ?? undefined }; // If no user ID, use token to identify the user

  const [urls, totalItems] = await Promise.all([
    prisma.shortUrl.findMany({
      where: {
        ...whereClause,
        ...(isQRCodeEnabled && { isQRCodeEnabled }),
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.shortUrl.count({ where: { ...whereClause, ...(isQRCodeEnabled && { isQRCodeEnabled }) } }),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  return { urls, totalPages, totalItems };
}

// Define types for the analytics record if not already defined
type CountryData = { [key: string]: { [key: string]: number } };
type DeviceData = { [key: string]: { [key: string]: number } };
type SourceData = { [key: string]: { [key: string]: number } };

export async function getAnalyticsByShortUrlId(shortUrlId: string): Promise<AnalyticsDashboardData | null> {
  const shortURLDetails = await prisma.shortUrl.findUnique({
    where: { id: shortUrlId },
    include: { analytics: true },
  });

  if (!shortURLDetails?.analytics) {
    return {
      clicks: 0,
      uniqueClicks: 0,
      shortURL: `${process.env.SHORT_URL}/${shortURLDetails?.shortCode as string}`,
      countries: {
        "No Data": 0,
      },
      devices: {
        "No Data": 0,
      },
      sources: {
        "No Data": 0,
      },
      clicksOverTime: [],
    };
  }

  const analyticsData: AnalyticsDashboardData = {
    clicks: 0,
    uniqueClicks: 0,
    shortURL: "",
    countries: {},
    devices: {},
    sources: {},
    clicksOverTime: [],
  };

  analyticsData.uniqueClicks = shortURLDetails.uniqueClicks;
  analyticsData.clicks = shortURLDetails.totalClicks;
  analyticsData.shortURL = `${process.env.SHORT_URL}/${shortURLDetails.shortCode}`;

  if (shortURLDetails?.analytics?.countries) {
    for (const [country, data] of Object.entries(shortURLDetails?.analytics?.countries as CountryData)) {
      const totalClicks = Object.values(data).reduce((sum, value) => sum + value, 0);
      analyticsData.countries[country] = totalClicks;
    }
  }

  if (shortURLDetails?.analytics?.devices) {
    for (const [device, data] of Object.entries(shortURLDetails?.analytics?.devices as DeviceData)) {
      const totalClicks = Object.values(data).reduce((sum, value) => sum + value, 0);
      analyticsData.devices[device] = totalClicks;
    }
  }

  if (shortURLDetails?.analytics?.sources) {
    for (const [source, data] of Object.entries(shortURLDetails?.analytics?.sources as SourceData)) {
      const totalClicks = Object.values(data).reduce((sum, value) => sum + value, 0);
      analyticsData.sources[source] = totalClicks;
    }
  }

  const clicksOverTimeMap: Map<string, number> = new Map();

  for (const [country, data] of Object.entries(shortURLDetails.analytics.countries as CountryData)) {
    for (const [date, clicks] of Object.entries(data)) {
      clicksOverTimeMap.set(date, (clicksOverTimeMap.get(date) || 0) + clicks);
    }
  }

  const startDate = moment().startOf("month");
  const endDate = moment();

  for (let date = startDate.clone(); date.isBefore(endDate); date.add(1, "day")) {
    const dateString = date.format("YYYY-MM-DD");
    const clicks = clicksOverTimeMap.get(dateString) || 0;
    analyticsData.clicksOverTime.push({ date: dateString, clicks });
  }

  return analyticsData;
}
