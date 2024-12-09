import { QRCodeOptions } from "@/interfaces";
import QRCode from "qrcode";

export const generateQRCode = async (options: QRCodeOptions): Promise<string> => {
  const qrOptions = {
    errorCorrectionLevel: options.errorCorrectionLevel || "H",
    margin: options.margin || 4,
    color: {
      dark: options.colorDark || "#000000",
      light: options.colorLight || "#FFFFFF",
    },
    width: options.width || 300,
    type: "svg" as const,
  };

  try {
    return await QRCode.toString(options.text, qrOptions);
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Failed to generate QR code");
  }
};
