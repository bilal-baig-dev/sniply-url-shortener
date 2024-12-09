import { ButtonProps } from "@/components/ui/button";
import { Session } from "next-auth";
export interface AnalyticsData {
  shortUrlId: string;
  ipAddress: string;
  timestamp: Date;
  country: string;
  device: string;
  referer: string;
  userAgent: string;
  date: string;
}

export type AnalyticsDashboardData = {
  clicks: number;
  uniqueClicks: number;
  shortURL: string;
  countries: { [key: string]: number };
  devices: { [key: string]: number };
  sources: { [key: string]: number };
  clicksOverTime: { date: string; clicks: number }[];
};

export interface SiteConfig {
  maintenanceMode: boolean;
  comingSoonMode: boolean;
  waitlistMode: boolean;
  notificationBar: boolean;
}

export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  className?: string;
}

export interface BlogSearchRequestParams {
  tags: string[];
  search?: string;
  page?: number;
  limit?: number;
}
export type CategoyProps = {
  name: string;
  isSelected: boolean;
};

export type BlogPostsResponse = { posts: BlogPostProps[]; categories: CategoyProps[] };

export type UserSession = Session | null;
export type CustomButtonProps = ButtonProps & { text?: string | React.ReactElement };
export type BlogCardProps = {
  title: string;
  description: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
  slug: string;
  avatar: string;
  link: string;
  featured: boolean;
  tags: string;
  keywords: string;
  draft: boolean;
};

export type BlogPostProps = BlogCardProps & {
  fileName: string;
};

export type NavItem = {
  url?: string;
  id?: string;
  text: string;
};

export type NavMenuProps = {
  menu: NavItem[];
  isSideBar?: boolean;
};

type IconTextItems = {
  icon: any;
  name: string;
};

type FeatureItem = {
  icon: any;
  title: string;
  description: string;
};

export type FeatureSectionContent = {
  title: string;
  subtitle: string;
  imageUrl: string;
  iconTextItems: IconTextItems[];
  featureItems: FeatureItem[];
  contentPosition?: string;
};

export type FeaturesSectionProps = {
  features: FeatureSectionContent[];
};

export interface OrderEmailProps {
  name: string;
  email: string;
  companyName: string;
  total: string;
  orderId: string;
  startEndPeriod?: string;
  date?: string;
  description: string;
  amount: string;
  tax: string;
  actionUrl: string;
  supportUrl: string;
  websiteLogoURL: string;
}

export interface QRPreset {
  id: string;
  name: string;
  pattern: {
    type: "dots" | "squares" | "rounded" | "classy" | "elegant" | "custom";
    moduleSize?: number;
    cornerRadius?: number;
    customPattern?: string;
  };
  cornerStyle: {
    type: "square" | "rounded" | "dots" | "extraRound";
    radius?: number;
  };
  frame?: {
    style: "classic" | "rounded" | "shadow" | "minimal" | "none";
    padding?: number;
  };
}

export interface QRCodeOptions {
  text: string;
  width?: number;
  height?: number;
  colorDark?: string;
  colorLight?: string;
  preset: QRPreset;
  margin?: number;
  frameText?: string;
  frameColor?: string;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
}

export interface ShortURLDetails {
  title: string;
  longURL: string;
  shortURL: string;
  id: string;
}
export type Column<T> = {
  header: string; // Column header text
  accessor: keyof T; // Key from the row data to access
  render?: (value: T[keyof T], row: T) => React.ReactNode; // Optional custom render function
};

export type ShortUrl = {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: Date | string;
  totalClicks: number;
  uniqueClicks: number;
  qrCode: string;
  qrCodeOptions: any;
};

export type fileType = "svg" | "png" | "jpeg" | "webp";
