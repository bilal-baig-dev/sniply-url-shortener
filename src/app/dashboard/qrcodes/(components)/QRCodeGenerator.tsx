"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRCodeStyling, { Options as QRCodeStylingOptions } from "qr-code-styling";
import { Upload, Copy, MoveRight } from "lucide-react";
import CreateShortURL from "@/app/(components)/CreateShortURL";
import { fileType, ShortURLDetails } from "@/interfaces";
import { CORNER_DOT_STYLES, CORNER_STYLES, DOT_STYLES } from "@/lib/constants";
import ColorPicker from "@/components/common/ColorPicker";
import DownloadButton from "./DownloadButton";
import { useCustomToast } from "@/hooks/useCustomToast";
import Spinner from "@/components/common/Spinner";
import { useFormStatus } from "react-dom";
import { updatedQRCodeDetails } from "@/actions/db";
import { useRouter } from "next/navigation";

export default function QRCodeGenerator() {
  const [options, setOptions] = useState<QRCodeStylingOptions>({
    width: 300,
    height: 300,
    type: "svg",
    data: "",
    image: "",
    margin: 10,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 5,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#000000",
      type: "square",
    },
    backgroundOptions: {
      color: "#fff",
    },
    cornersSquareOptions: {
      color: "#000000",
      type: "square",
    },
    cornersDotOptions: {
      color: "#000000",
      type: "square",
    },
  });
  const { showToast } = useCustomToast();
  const router = useRouter();

  const [details, setDetails] = useState<ShortURLDetails>({
    title: "",
    longURL: "",
    shortURL: "",
    id: "",
  });

  const { pending } = useFormStatus();

  function resetDetails() {
    setDetails({ title: "", longURL: "", shortURL: "", id: "" });
  }

  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newQrCode = new QRCodeStyling(options);
      setQrCode(newQrCode);
    }
  }, []);

  useEffect(() => {
    if (qrCode && qrRef.current) {
      qrCode.update(options);
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);
    }
  }, [qrCode, options]);

  useEffect(() => {
    if (details.shortURL) {
      setOptions((prev) => ({ ...prev, data: details.shortURL }));
    }
  }, [details]);

  useEffect(() => {
    return () => {
      resetDetails();
    };
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setOptions((prev) => ({
            ...prev,
            image: result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQRCode = (extension: fileType) => {
    if (qrCode) {
      qrCode.download({ extension });
    }
  };

  const copyToClipboard = async () => {
    if (qrCode) {
      try {
        const blob = await qrCode.getRawData("png");
        if (!blob) throw new Error("Blob is null.");

        const clipboardItem = new ClipboardItem({
          "image/png": Promise.resolve(blob as Blob),
        });
        await navigator.clipboard.write([clipboardItem]);
        showToast({
          title: "Copied To Clipboard!",
          variant: "success",
          duration: 3000,
        });
      } catch (err) {
        console.error("Error copying to clipboard:", err);
        showToast({
          title: "Something went wrong",
          variant: "error",
          duration: 3000,
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <Tabs defaultValue={"configure"} value={details.shortURL ? "customize" : "configure"}>
          <TabsList className="mb-4">
            <TabsTrigger value="configure" disabled={details.shortURL ? true : false}>
              Configure code
            </TabsTrigger>
            <TabsTrigger value="customize" disabled={!details.shortURL}>
              Customize design
            </TabsTrigger>
          </TabsList>
          <TabsContent value="configure">
            <CreateShortURL setShortURLDetails={(info) => setDetails(info)} urlDetails={details} />
          </TabsContent>
          {details.shortURL && (
            <TabsContent value="customize">
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                action={async () => {
                  const blob = await qrCode?.getRawData("png");
                  if (!(blob instanceof Blob)) {
                    showToast({
                      title: "Expected Blob, received unsupported type.",
                      variant: "error",
                      duration: 3000,
                    });
                    return;
                  }
                  const base64String = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      resolve(reader.result as string);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                  });
                  await updatedQRCodeDetails({
                    id: details.id,
                    qrCodeDetails: {
                      qrCodeoptions: options,
                      qrCodeImage: base64String,
                    },
                  });
                  showToast({
                    title: "QRCode Created Successfully!",
                    variant: "success",
                    duration: 3000,
                  });
                  router.push("/dashboard/qrcodes");
                  resetDetails();
                }}
              >
                <div className="gap-6 flex flex-col">
                  <div className="gap-3 flex flex-col">
                    <Label>QR Code Style</Label>
                    <Select
                      value={options?.dotsOptions?.type}
                      onValueChange={(value) => setOptions((prev) => ({ ...prev, dotsOptions: { ...prev.dotsOptions, type: value as any } }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Pattern" />
                      </SelectTrigger>
                      <SelectContent>
                        {DOT_STYLES.map((pattern) => (
                          <SelectItem key={pattern.id} value={pattern.id}>
                            {pattern.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label>Corner Square Style</Label>
                    <Select
                      value={options.cornersSquareOptions?.type}
                      onValueChange={(value) =>
                        setOptions((prev) => ({ ...prev, cornersSquareOptions: { ...prev.cornersSquareOptions, type: value as any } }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Corner Style" />
                      </SelectTrigger>
                      <SelectContent>
                        {CORNER_STYLES.map((style) => (
                          <SelectItem key={style.id} value={style.id}>
                            {style.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label>Corner Dot Style</Label>
                    <Select
                      value={options?.cornersDotOptions?.type}
                      onValueChange={(value) => setOptions((prev) => ({ ...prev, cornersDotOptions: { ...prev.dotsOptions, type: value as any } }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Dot Style" />
                      </SelectTrigger>
                      <SelectContent>
                        {CORNER_DOT_STYLES.map((style) => (
                          <SelectItem key={style.id} value={style.id}>
                            {style.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <ColorPicker
                    label="QR Code Color"
                    value={options?.dotsOptions?.color || "#000000"}
                    onChange={(color) => setOptions((prev) => ({ ...prev, dotsOptions: { ...prev.dotsOptions, color } }))}
                  />

                  <ColorPicker
                    label="Background Color"
                    value={options.backgroundOptions?.color || "#FFFFFF"}
                    onChange={(color) => setOptions((prev) => ({ ...prev, backgroundOptions: { ...prev.backgroundOptions, color } }))}
                  />

                  <ColorPicker
                    label="Corner Square Color"
                    value={options.cornersSquareOptions?.color || "#000000"}
                    onChange={(color) => setOptions((prev) => ({ ...prev, cornersSquareOptions: { ...prev.cornersSquareOptions, color } }))}
                  />

                  <ColorPicker
                    label="Corner Dot Color"
                    value={options.cornersDotOptions?.color || "#000000"}
                    onChange={(color) => setOptions((prev) => ({ ...prev, cornersDotOptions: { ...prev.cornersDotOptions, color } }))}
                  />
                  <div>
                    <Label>Logo</Label>
                    <div className="space-y-2">
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                      <Button type="button" onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Logo
                      </Button>
                      <Slider
                        value={[options.imageOptions?.imageSize ? options.imageOptions.imageSize * 100 : 40]}
                        onValueChange={(value) =>
                          setOptions((prev) => ({ ...prev, imageOptions: { ...prev.imageOptions, imageSize: value[0] / 100 } }))
                        }
                        min={10}
                        max={100}
                        step={2}
                      />
                    </div>
                  </div>
                  <Button disabled={pending} className="flex mt-10 w-full items-center justify-center gap-3" type="submit">
                    {pending ? (
                      <Spinner />
                    ) : (
                      <>
                        Create QRCode
                        <MoveRight className="h-4 w-4 animate-moveArrowRight" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <div ref={qrRef} className="w-[300px] h-[300px] bg-transparent flex items-center justify-center" />
                  <div className="flex gap-2">
                    <DownloadButton handleDownload={(type) => downloadQRCode(type)} />
                    <Button type="button" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
