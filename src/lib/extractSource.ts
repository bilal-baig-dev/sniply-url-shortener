export function extractSource(referer: string, userAgent: string): string {
  // Check if it's coming from a known social media platform
  if (referer) {
    if (referer.includes("facebook.com")) return "Facebook";
    if (referer.includes("twitter.com") || referer.includes("t.co")) return "Twitter";
    if (referer.includes("linkedin.com")) return "LinkedIn";
    if (referer.includes("instagram.com")) return "Instagram";
    if (referer.includes("pinterest.com")) return "Pinterest";
    if (referer.includes("reddit.com")) return "Reddit";
    if (referer.includes("tiktok.com")) return "TikTok";
    if (referer.includes("pinterest.com")) return "Pinterest";
    if (referer.includes("youtube.com")) return "YouTube";
    if (referer.includes("WhatsApp") || userAgent.includes("WhatsApp")) return "WhatsApp";
  }

  // Check if it's coming from a search engine
  if (referer) {
    if (referer.includes("google.")) return "Google";
    if (referer.includes("bing.com")) return "Bing";
    if (referer.includes("outlook.com")) return "Outlook";
    if (referer.includes("yahoo.com")) return "Yahoo";
    if (referer.includes("webmail")) return "Webmail";
    if (referer.includes("hotmail.com")) return "Hotmail";
    if (referer.includes("duckduckgo.com")) return "DuckDuckGo";
  }

  // Check if it's a bot
  if (userAgent && /bot|crawler|spider|crawling/i.test(userAgent)) {
    return "Bot";
  }

  // If referer exists but doesn't match known sources
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      return refererUrl.hostname;
    } catch (error) {
      // console.error("Invalid referer URL:", referer);
    }
  }

  // If no referer or couldn't determine the source
  return "Direct";
}
