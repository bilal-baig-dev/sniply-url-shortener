import { notFound, permanentRedirect } from "next/navigation";
import { headers } from "next/headers";
import prisma from "@/config/db/prisma";
import { LANGUAGES } from "@/lib/constants";
import Home from "../page";

export default async function MyPage({ params }: { params: { shortCode: string } }) {
  const shortCode = params.shortCode;

  const url = await prisma.shortUrl.findUnique({
    where: { shortCode },
  });

  if (LANGUAGES[shortCode]) {
    return <Home />;
  }

  if (!url) return notFound();

  const headersList = headers();
  const ipAddress = headersList.get("x-forwarded-for") || "Unknown";
  const country = headersList.get("cf-ipcountry") || "Unknown";
  const device = getDeviceType(headersList.get("user-agent"));
  const referer = headersList.get("referer") || "Direct";
  const userAgent = headersList.get("user-agent") || "Unknown";
  const date = new Date().toISOString().split("T")[0]; // Get current date

  const analyticsData: any = {
    shortUrlId: url.id,
    ipAddress,
    country,
    device,
    referer,
    userAgent,
    date,
    timestamp: new Date(),
  };

  await prisma.analyticsQueue.createMany({
    data: {
      shortUrlId: analyticsData.shortUrlId as string,
      data: analyticsData,
    },
  });

  return permanentRedirect(url.originalUrl);
}

function getDeviceType(userAgent: string | null): string {
  if (!userAgent) return "Unknown";
  if (/mobile/i.test(userAgent)) return "Mobile";
  if (/tablet/i.test(userAgent)) return "Tablet";
  return "Desktop";
}
