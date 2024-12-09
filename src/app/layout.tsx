import { LoaderStyles } from "@/lib/constants";
import { ThemeProvider } from "@/providers/theme/theme-provider";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { appConfig } from "@/config/appConfig";
import FloatingButton from "@/components/common/FloatingButton";

const bricolageGrotesque = Bricolage_Grotesque({ weight: ["200", "300", "400", "500", "600", "700"], subsets: ["latin"] });
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
  title: {
    default: "Create Short, Memorable Links in seconds",
    template: `%s | ${appConfig.appName}`,
  },
  description:
    "Transform URLs: Shorten, Share, Track clicks, customize links, and add CTAs to any page you share. Simplify your marketing with branded short links that drive results.",

  openGraph: {
    title: "Create Short, Memorable Links in seconds",
    description:
      "Transform URLs: Shorten, Share, Track clicks, customize links, and add CTAs to any page you share. Simplify your marketing with branded short links that drive results.",
    url: BASE_URL,
    siteName: appConfig.appName,
    images: [
      {
        url: `${BASE_URL}/images/sniply-shorten-long-url-track-analytics-free.webp`,
        width: 1200,
        height: 630,
        alt: "Dashboard showing shortened URLs and analytics tracking for free.",
      },
    ],
    type: "website",
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let content = children;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bricolageGrotesque.className}>
        <NextTopLoader {...LoaderStyles} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {content}
          {/* <FloatingButton /> */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
