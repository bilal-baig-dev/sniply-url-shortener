import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import prisma from "@/config/db/prisma";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    let { title, longURL, token = null, userId = null, isEdit, shortURLId: id } = await req.json();
    // const cookieStore = cookies();
    // let token = cookieStore.get("user-token")?.value;

    // Generate token for non-authenticated users
    if (!userId && !token) {
      token = nanoid();
    }

    if (!isValidUrl(longURL)) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // Generate unique shortCode
    let shortCode, existingUrl;
    if (!isEdit) {
      do {
        shortCode = nanoid(7);
        existingUrl = await prisma.shortUrl.findUnique({ where: { shortCode } });
      } while (existingUrl);
    }
    let shortURL;
    if (!isEdit) {
      // Create short URL record
      shortURL = await prisma.shortUrl.create({
        data: {
          originalUrl: longURL,
          shortCode: shortCode as string,
          title,
          token: userId ? null : token,
          userId: userId ?? null,
        },
      });
    } else {
      shortURL = await prisma.shortUrl.update({
        data: {
          originalUrl: longURL,
          title,
        },
        where: {
          id,
          userId: userId,
        },
      });
    }

    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`;

    // Create the response
    const response = NextResponse.json({ shortUrl, setToken: !userId && token, token, id: shortURL.id });

    return response;
  } catch (error) {
    console.error("Error shortening URL:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
