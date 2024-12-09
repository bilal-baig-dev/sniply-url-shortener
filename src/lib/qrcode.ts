"use server";
import QRCode from "qrcode";
import { QRCodeToStringOptions } from "qrcode";

export interface QRCodeStyleOptions {
  url: string;
  width: number;
  height: number;
  foregroundColor: string;
  backgroundColor: string;
  borderColor: string;
  borderStyle: "solid" | "dashed" | "dotted";
  borderWidth: number;
  cornerType: "square" | "rounded";
  dotType: "square" | "rounded" | "dots";
  style: "default" | "circular" | "diamond" | "ninja" | "cosmic";
  logoUrl?: string;
  text: string;
  textPosition: "top" | "bottom";
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
}

export async function generateQRCodeImage(options: QRCodeStyleOptions): Promise<string> {
  // Base QR code options with correct typing
  const qrCodeOptions: QRCodeToStringOptions = {
    width: options.width,
    margin: 0,
    color: {
      dark: options.foregroundColor,
      light: options.backgroundColor,
    },
    errorCorrectionLevel: options.errorCorrectionLevel,
    type: "svg" as const, // Type assertion to fix the type error
  };

  // Generate base SVG
  let svg = await QRCode.toString(options.url, qrCodeOptions);

  // Apply custom styling based on selected style
  switch (options.style) {
    case "circular":
      svg = applyCircularStyle(svg);
      break;
    case "diamond":
      svg = applyDiamondStyle(svg);
      break;
    case "ninja":
      svg = applyNinjaStyle(svg);
      break;
    case "cosmic":
      svg = applyCosmicStyle(svg);
      break;
  }

  // Add border
  svg = addBorderToSVG(svg, options);

  // Add text if specified
  if (options.text) {
    svg = addTextToSVG(svg, options);
  }

  // Add logo if specified
  if (options.logoUrl) {
    svg = addLogoToSVG(svg, options);
  }

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function applyCircularStyle(svg: string): string {
  return svg
    .replace(
      "<svg",
      `<svg><defs><clipPath id="circular-clip">
      <circle cx="50%" cy="50%" r="45%"/>
    </clipPath></defs>`
    )
    .replace("<path", '<path clip-path="url(#circular-clip)"');
}

function applyDiamondStyle(svg: string): string {
  return svg
    .replace(
      "<svg",
      `<svg><defs><clipPath id="diamond-clip">
      <path d="M50,0 L100,50 L50,100 L0,50 Z"/>
    </clipPath></defs>`
    )
    .replace("<path", '<path clip-path="url(#diamond-clip)"');
}

function applyNinjaStyle(svg: string): string {
  return svg.replace(/d="M([^"]+)"/g, (match, path) => {
    return `d="${path}" rx="2" ry="2"`;
  });
}

function applyCosmicStyle(svg: string): string {
  return svg
    .replace(
      "<svg",
      `<svg><defs>
      <linearGradient id="cosmic-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#8B5CF6"/>
        <stop offset="100%" style="stop-color:#3B82F6"/>
      </linearGradient>
    </defs>`
    )
    .replace(/fill="([^"]+)"/, 'fill="url(#cosmic-gradient)"');
}

function addBorderToSVG(svg: string, options: QRCodeStyleOptions): string {
  return svg.replace("<svg", `<svg style="border: ${options.borderWidth}px ${options.borderStyle} ${options.borderColor};"`);
}

function addTextToSVG(svg: string, options: QRCodeStyleOptions): string {
  const textY = options.textPosition === "top" ? 20 : options.height - 10;
  const textElement = `<text x="50%" y="${textY}" text-anchor="middle" 
    fill="${options.foregroundColor}" font-family="Arial, sans-serif" 
    font-size="14">${options.text}</text>`;

  return svg.replace("</svg>", `${textElement}</svg>`);
}

function addLogoToSVG(svg: string, options: QRCodeStyleOptions): string {
  const logoSize = Math.min(options.width, options.height) * 0.2;
  const logoX = (options.width - logoSize) / 2;
  const logoY = (options.height - logoSize) / 2;

  const logoElement = `<image href="${options.logoUrl}" 
    x="${logoX}" y="${logoY}" 
    width="${logoSize}" height="${logoSize}"/>`;

  return svg.replace("</svg>", `${logoElement}</svg>`);
}
