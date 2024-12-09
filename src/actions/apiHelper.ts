"use server";
import { Reader } from "@maxmind/geoip2-node";
import path from "path";
import { getSession } from "./auth";
const APP_API_KEY = process.env.APP_API_KEY!;
let geoipReader: Reader | null = null;

export async function initGeoIpReader() {
  if (!geoipReader) {
    geoipReader = await Reader.open(path.join(process.cwd(), "src/data/db/GeoLite2-City.mmdb"));
  }
  return geoipReader;
}

export async function getGeoData(ip: string) {
  try {
    const reader: any = await initGeoIpReader();
    const result = await reader.city(ip);

    return {
      country: result.country?.names?.en,
      city: result.city?.names?.en,
      latitude: result.location?.latitude,
      longitude: result.location?.longitude,
    };
  } catch (error) {
    console.error("Error getting geo data:", error);
    return null;
  }
}

export async function apiRequestToMakeShortenURL({
  title = "",
  longURL,
  token,
  isEdit,
  shortURLId,
}: {
  title?: string;
  longURL: string;
  token: string;
  isEdit?: boolean;
  shortURLId?: string | null;
}) {
  try {
    const session = await getSession();
    const result = await fetch(`${process.env.BASE_URL}/api/shorten`, {
      body: JSON.stringify({ title, longURL, token, userId: session?.user?.email || null, isEdit, shortURLId }),
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: APP_API_KEY,
      },
    });

    if (!result.ok) {
      throw new Error(`Failed to shorten URL: ${result.statusText}`);
    }

    const data = await result.json(); // Parse JSON from the response

    return { shortUrl: data.shortUrl, setToken: data.setToken, token: data.token, id: data.id }; // Extract shortUrl from the parsed data
  } catch (error: any) {
    console.error("Error making shorten URL request:", error);
    throw new Error(`Failed to shorten URL: ${error}`);
  }
}
