import { QRPreset } from "@/interfaces";
import { ArrowRight, BarChart, BarChart3, LayoutDashboard, Link, Link2, Settings, Share2, WandSparkles } from "lucide-react";
import { NextTopLoaderProps } from "nextjs-toploader";

export const maxAge = 60 * 60 * 24;
export const LoginPagePath = "/login";

export const QR_PRESETS: QRPreset[] = [
  {
    id: "classic",
    name: "Classic",
    pattern: { type: "squares" },
    cornerStyle: { type: "square" },
    frame: { style: "classic" },
  },
  {
    id: "rounded",
    name: "Rounded Dots",
    pattern: { type: "dots", moduleSize: 0.5 },
    cornerStyle: { type: "rounded", radius: 8 },
    frame: { style: "rounded", padding: 16 },
  },
  {
    id: "elegant",
    name: "Elegant Square",
    pattern: { type: "squares" },
    cornerStyle: { type: "extraRound", radius: 12 },
    frame: { style: "shadow" },
  },
  {
    id: "minimal-dots",
    name: "Minimal Dots",
    pattern: { type: "dots", moduleSize: 0.4 },
    cornerStyle: { type: "dots" },
    frame: { style: "minimal" },
  },
  {
    id: "classy-rounded",
    name: "Classy Rounded",
    pattern: { type: "rounded", cornerRadius: 4 },
    cornerStyle: { type: "rounded", radius: 8 },
    frame: { style: "classic" },
  },
  {
    id: "modern-square",
    name: "Modern Square",
    pattern: { type: "squares" },
    cornerStyle: { type: "square" },
    frame: { style: "minimal" },
  },
  {
    id: "dotted-elegant",
    name: "Dotted Elegant",
    pattern: { type: "dots", moduleSize: 0.45 },
    cornerStyle: { type: "rounded", radius: 10 },
    frame: { style: "shadow" },
  },
  {
    id: "rounded-corners",
    name: "Rounded Corners",
    pattern: { type: "squares" },
    cornerStyle: { type: "rounded", radius: 6 },
    frame: { style: "rounded" },
  },
  {
    id: "pixel-perfect",
    name: "Pixel Perfect",
    pattern: { type: "squares" },
    cornerStyle: { type: "square" },
    frame: { style: "none" },
  },
  {
    id: "smooth-dots",
    name: "Smooth Dots",
    pattern: { type: "dots", moduleSize: 0.5 },
    cornerStyle: { type: "dots" },
    frame: { style: "minimal" },
  },
  {
    id: "professional",
    name: "Professional",
    pattern: { type: "squares" },
    cornerStyle: { type: "square" },
    frame: { style: "classic" },
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    pattern: { type: "rounded", cornerRadius: 2 },
    cornerStyle: { type: "rounded", radius: 4 },
    frame: { style: "minimal" },
  },
  {
    id: "tech-style",
    name: "Tech Style",
    pattern: { type: "dots", moduleSize: 0.6 },
    cornerStyle: { type: "square" },
    frame: { style: "shadow" },
  },
  {
    id: "corporate",
    name: "Corporate",
    pattern: { type: "squares" },
    cornerStyle: { type: "extraRound", radius: 10 },
    frame: { style: "classic" },
  },
  {
    id: "bold-minimal",
    name: "Bold Minimal",
    pattern: { type: "squares" },
    cornerStyle: { type: "rounded", radius: 8 },
    frame: { style: "none" },
  },
];

export const CORNER_DOT_STYLES = [
  { id: "square", name: "Squares" },
  { id: "dots", name: "Dots" },
];

export const CORNER_STYLES = [
  { id: "square", name: "Square" },
  { id: "dot", name: "Dot" },
  { id: "extra-rounded", name: "Extra Rounded" },
];

export const DOT_STYLES = [
  { id: "square", name: "Square" },
  { id: "dots", name: "Dots" },
  { id: "rounded", name: "Rounded" },
  { id: "extra-rounded", name: "Extra Rounded" },
  { id: "classy", name: "Classy" },
  { id: "classy-rounded", name: "Classy Rounded" },
];

export const COLOR_PRESETS = ["#000000", "#FF0000", "#FFA500", "#008000", "#0000FF", "#4B0082", "#EE82EE", "#FFC0CB", "#808080", "#FFFFFF"];

export const LoaderStyles: NextTopLoaderProps = {
  color: "hsl(var(--primary))",
  height: 5,
  speed: 300,
  showSpinner: false,
};

export const avatars = ["/images/avatar-1.jpg", "/images/avatar-2.jpg", "/images/avatar-3.jpg", "/images/avatar-4.jpg", "/images/avatar-5.jpg"];

export const navMenu = [
  {
    text: "Home",
    id: "home",
  },
  {
    text: "How It Works",
    id: "how-it-works",
  },
  {
    text: "FAQ",
    id: "faq",
  },
];

export const faqs = [
  {
    question: "Is Sniply free to use?",
    answer:
      "Sniply offers both free and premium plans. Our free plan includes basic URL shortening and limited analytics, while our premium plans offer advanced features like custom alias & detailed analytics",
  },
  {
    question: "How long do the shortened links last?",
    answer:
      "Sniply links created with ShortLink do not expire. They will remain active as long as our service is operational. However, we reserve the right to deactivate links that violate our terms of service.",
  },
  {
    question: "Can I customize my shortened URLs?",
    answer:
      "Yes, ShortLink offers custom URL options for premium users. This allows you to create branded, memorable links that align with your business or personal brand.",
  },
  {
    question: "What kind of analytics does ShortLink provide?",
    answer:
      "ShortLink provides comprehensive analytics including click counts, geographic data, referrer information, and device types. Premium users get access to more detailed reports and real-time data.",
  },
];

export const highlights = [
  {
    title: "Paste Your Link",
    description: "Enter your long URL into our shortener",
    icon: Link,
  },
  {
    icon: ArrowRight,
    title: "Get Short URL",
    description: "Click shorten and receive your custom short link",
  },
  {
    icon: BarChart,
    title: "Track & Analyze",
    description: "Monitor your link's performance with our analytics",
  },
];

export const featuresGridOne = [
  {
    icon: Link2,
    title: "Enter Long URL",
    description: "Easily paste any long URL with no length restrictions, automatically validated for accuracy, and receive your custom short link",
    items: [
      {
        name: "Paste any URL, no matter how long or complex",
      },
      {
        name: "Auto-Detects invalid URLs to prevent errors",
      },
      {
        name: "Click shorten and receive your custom short link",
      },
    ],
    timeSaved: "25",
  },
  {
    icon: WandSparkles,
    title: "Get Shortened URL Instantly",
    description: "Receive a unique short link generated instantly, with one-click copying and the ability to preview the destination before sharing",
    items: [
      {
        name: "Generate short links instantly",
      },
      {
        name: "Ensure unique codes every time",
      },
      {
        name: "Copy the link with one click",
      },
      {
        name: "Preview the destination link",
      },
    ],
    timeSaved: "30",
  },
  {
    icon: Share2,
    title: "Easy Social Media Sharing",
    description:
      'Effortlessly share your shortened URLs on various social media platforms and messaging apps, with a convenient "Visit URL" button and quick copy options',
    items: [
      {
        name: "Share links on social platforms",
      },
      {
        name: "Send via WhatsApp, email, or SMS",
      },
      {
        name: 'Use a "Visit URL" button for quick preview',
      },
      {
        name: "Quickly copy links for reuse",
      },
    ],
    timeSaved: "10",
  },
  {
    icon: LayoutDashboard,
    title: "Access Your Dashboard (After Sign-In)",
    description: "Manage your shortened links from a dashboard where you can view your URL history, track analytics, and easily edit or delete links",
    items: [
      {
        name: "View all past URLs.",
      },
      {
        name: "Track analytics for performance",
      },
      {
        name: "Edit or delete URLs anytime (coming soon)",
      },
      {
        name: "Set expiration dates for links (coming soon)",
      },
    ],
    timeSaved: "35",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Access real-time click tracking, geographic insights, device statistics, and referrer data to analyze your link performance effectively",
    items: [
      {
        name: "Monitor total clicks in real time",
      },
      {
        name: "Get geographic click data",
      },
      {
        name: "Track devices and browsers used",
      },
      {
        name: "Identify referral sources",
      },
    ],
    timeSaved: "40",
  },
  {
    icon: Settings,
    title: "Customize and Manage Your Short URLs (Coming Soon)",
    description:
      "Enjoy advanced features like custom slugs, QR code generation, password protection for secure links, and automatic expiration settings for better control",
    items: [
      {
        name: "Personalize with custom slugs",
      },
      {
        name: "Generate QR codes instantly",
      },
      {
        name: "Add password protection",
      },
      {
        name: "Set automatic link expiration",
      },
    ],
    timeSaved: "15",
  },
];

export const adultKeywords: string[] = [
  "adult",
  "porn",
  "sex",
  "nude",
  "xxx",
  "xnxx",
  "nxx",
  "xnx",
  "xxxx",
  "erotic",
  "sexually explicit",
  "adult content",
  "dating",
  "hookup",
  "escort",
  "cam",
  "fetish",
  "lingerie",
  "sexual",
  "lewd",
  "adult videos",
  "pornography",
  "adult dating",
  "mature",
  "swinger",
  "bdsm",
  "strip",
  "prostitution",
  "adult toys",
  "sex shop",
  "kinky",
  "hot",
  "sensual",
  "adult film",
  "cheating",
  "affair",
  "cougar",
  "erotic literature",
  "adult games",
  "furry",
  "incest",
  "amateur",
  "asphyxiation",
  "bondage",
  "orgy",
  "polyamory",
  "voyeur",
  "swinging",
  "fetish",
  "adult social networking",
  "sexting",
  "sex cam",
  "bikini",
  "adult chat",
  "kink",
  "erotica",
  "porn star",
  "striptease",
  "webcam",
  "threesome",
];

export const LANGUAGES = {
  af: "Afrikaans",
  sq: "Albanian",
  ar: "Arabic",
  hy: "Armenian",
  az: "Azerbaijani",
  eu: "Basque",
  be: "Belarusian",
  bn: "Bengali",
  bg: "Bulgarian",
  ca: "Catalan",
  zh: "Chinese",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  eo: "Esperanto",
  et: "Estonian",
  tl: "Filipino",
  fi: "Finnish",
  fr: "French",
  gl: "Galician",
  ka: "Georgian",
  de: "German",
  el: "Greek",
  gu: "Gujarati",
  ht: "Haitian Creole",
  he: "Hebrew",
  hi: "Hindi",
  hu: "Hungarian",
  is: "Icelandic",
  id: "Indonesian",
  ga: "Irish",
  it: "Italian",
  ja: "Japanese",
  kn: "Kannada",
  ko: "Korean",
  la: "Latin",
  lv: "Latvian",
  lt: "Lithuanian",
  mk: "Macedonian",
  ms: "Malay",
  mt: "Maltese",
  mi: "Maori",
  mr: "Marathi",
  mn: "Mongolian",
  ne: "Nepali",
  no: "Norwegian",
  fa: "Persian",
  pl: "Polish",
  pt: "Portuguese",
  pa: "Punjabi",
  ro: "Romanian",
  ru: "Russian",
  sr: "Serbian",
  sk: "Slovak",
  sl: "Slovenian",
  so: "Somali",
  es: "Spanish",
  sw: "Swahili",
  sv: "Swedish",
  ta: "Tamil",
  te: "Telugu",
  th: "Thai",
  tr: "Turkish",
  uk: "Ukrainian",
  ur: "Urdu",
  uz: "Uzbek",
  vi: "Vietnamese",
  cy: "Welsh",
  yi: "Yiddish",
} as { [key: string]: string };
