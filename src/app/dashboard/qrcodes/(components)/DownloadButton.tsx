import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { fileType } from "@/interfaces";
import { Download, ImageDown, PenTool } from "lucide-react";
import React from "react";

const DownloadItem = ({ handleDownload, text, icon, type }: any) => {
  return (
    <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => handleDownload(type)}>
      {icon}
      {text}
    </DropdownMenuItem>
  );
};

function DownloadButton({ handleDownload }: { handleDownload: (type: fileType) => void }) {
  return (
    <div className="inline-flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="secondary" className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DownloadItem handleDownload={handleDownload} type="svg" text={"SVG"} icon={<PenTool className="w-4 h-4" />} />
          <DownloadItem handleDownload={handleDownload} type="png" text={"PNG"} icon={<ImageDown className="w-4 h-4" />} />
          <DownloadItem handleDownload={handleDownload} type="jpeg" text={"JPG"} icon={<ImageDown className="w-4 h-4" />} />
          <DownloadItem handleDownload={handleDownload} type="webp" text={"WebP"} icon={<ImageDown className="w-4 h-4" />} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DownloadButton;
