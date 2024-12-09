import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const APP_API_KEY = process.env.APP_API_KEY!;

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/auth") || request.nextUrl.pathname.startsWith("/api/cron")) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api")) {
    const authResult = handleAuthorization(request);
    if (authResult) return authResult;
  }

  const response = NextResponse.next();
  response.headers.set("x-current-path", request.nextUrl.pathname);
  return response;
}

function handleAuthorization(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || authHeader !== `${APP_API_KEY}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images|.well-known|favicon.ico).*)", "/api/:path*"],
};
