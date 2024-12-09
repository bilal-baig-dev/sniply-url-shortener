import { processAnalyticsQueue } from "@/lib/queue";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
export const maxDuration = 5;

export async function GET(request: Request) {
  try {
    const headersList = headers();
    const authHeader = headersList.get("authorization");
    // Verify the authorization token
    if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.error("Unauthorized cron job attempt");
      return new Response("Unauthorized", {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    await processAnalyticsQueue();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to process analytics queue:", error);
    return NextResponse.json({ error: "Failed to process queue" }, { status: 500 });
  }
}
