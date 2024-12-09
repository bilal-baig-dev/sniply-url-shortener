import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

import { notFound, ReadonlyURLSearchParams } from "next/navigation";
import { adultKeywords } from "./constants";

const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/[^\s]*)?$/i;

export const isValidUrl = (url: string): boolean => {
  const trimmedUrl = url.trim();
  const testUrl = urlRegex.test(trimmedUrl);
  const lowercaseUrl = trimmedUrl.toLowerCase();
  const isValidKeyword = !adultKeywords.some((keyword) => lowercaseUrl.includes(keyword));
  return testUrl && isValidKeyword;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  const parsedDate = new Date(dateString);

  const options: { [key: string]: string } = { year: "numeric", month: "long", day: "numeric" };

  const formattedDate = parsedDate.toLocaleDateString("en-US", options);

  return formattedDate;
}

export function paginate<T>(items: T[], page: number, pageSize: number): { results: T[]; total: number } {
  const total = items.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const results = items.slice(startIndex, endIndex);

  return { results, total };
}

export function getDetailsByURLSearchParams(currentSearchParams: ReadonlyURLSearchParams) {
  const tags = currentSearchParams?.getAll("tags");
  const search = currentSearchParams?.get("q");

  return { tags, search };
}

export function getSearchQuery(query: string) {
  if (Array.isArray(query)) {
    return query[0];
  } else if (typeof query === "string") {
    return query;
  } else {
    return ""; // or throw an error, depending on your use case
  }
}

export function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}
