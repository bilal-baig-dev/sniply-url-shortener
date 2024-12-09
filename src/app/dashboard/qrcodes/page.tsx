"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Edit2, Trash2, BarChart2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import QRCodeStyling, { Options as QRCodeStylingOptions } from "qr-code-styling";
import { getUserUrls } from "@/actions/db";
import moment from "moment";
import Flex from "@/components/common/Flex";
import Image from "next/image";
import DownloadButton from "./(components)/DownloadButton";
import { Column, fileType, ShortUrl } from "@/interfaces";
import { appConfig } from "@/config/appConfig";
import PaginatedTable from "../(components)/PaginatedTable";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 10;

const headers = ["QR Code", "Site Logo", "Short Code", "Long URL", "Total Clicks", "Unique Visitor", "Created At", "Download", "Actions"];

export default function QRCodesList() {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUrls = async (page: number) => {
    setLoading(true);

    const { urls, totalPages, totalItems } = await getUserUrls(page, ITEMS_PER_PAGE, localStorage.getItem("identifier") as string, true);
    setUrls(urls as ShortUrl[]);
    setTotalPages(totalPages);
    setTotalItems(totalItems);
    setLoading(false);
  };

  useEffect(() => {
    fetchUrls(currentPage);
  }, [currentPage]);

  // const handleDelete = (id: string) => {
  //   // TODO: Implement delete functionality in the backend
  //   setUrls((prev) => prev.filter((url) => url.id !== id));
  // };

  const downloadQRCode = (extension: fileType, options: QRCodeStylingOptions) => {
    if (typeof window !== "undefined") {
      const newQrCode = new QRCodeStyling(options);
      newQrCode.download({ extension, name: `${appConfig.appName}-${new Date().toISOString()}` });
    }
  };

  const columns: Column<ShortUrl>[] = useMemo(
    () => [
      {
        header: "QR Code",
        accessor: "qrCode",
        render: (value) => <Image alt="QR Code" width={100} height={80} src={value} />,
      },
      {
        header: "Favicon",
        accessor: "originalUrl",
        render: (value) => <img src={`${value}/favicon.ico`} className="h-8 w-8 bg-slate-600 rounded-full" alt="Favicon" />,
      },
      {
        header: "Short URL",
        accessor: "shortCode",
        render: (value, row) => (
          <a
            href={`https://${process.env.NEXT_PUBLIC_SHORT_URL}/${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {`${process.env.NEXT_PUBLIC_SHORT_URL}/${value}`}
          </a>
        ),
      },
      {
        header: "Original URL",
        accessor: "originalUrl",
        render: (value, row) => <TableCell className="max-w-xs truncate">{value}</TableCell>,
      },
      {
        header: "Total Clicks",
        accessor: "totalClicks",
      },
      {
        header: "Unique Clicks",
        accessor: "uniqueClicks",
      },
      {
        header: "Created At",
        accessor: "createdAt",
        render: (value) => moment(value).format("MMMM D, Y HH:mm:ss"),
      },
      {
        header: "Download",
        accessor: "qrCodeOptions",
        render: (value) => (
          <TableCell>
            <DownloadButton handleDownload={(type) => downloadQRCode(type, JSON.parse(value))} />
          </TableCell>
        ),
      },
      {
        header: "Actions",
        accessor: "id",
        render: (value, row) => (
          <TableCell>
            <div className="flex space-x-2 gap-3 items-center">
              <Button variant="ghost" className="p-0" size="sm" disabled>
                <Edit2 className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" className="p-0" size="sm" disabled>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
              <Link href={`/dashboard/analytics/${value}`}>
                <Button variant="ghost" className="p-0" size="sm">
                  <BarChart2 className="h-4 w-4" />
                  <span className="sr-only">Analytics</span>
                </Button>
              </Link>
            </div>
          </TableCell>
        ),
      },
    ],
    []
  );

  const skeletonColumns = useMemo(() => {
    return (
      <>
        <TableCell>
          <Skeleton className="h-20 w-24 bg-slate-600 rounded-none" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-8 bg-slate-600 rounded-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-20" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-12" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-12" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-12" />
        </TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </TableCell>
      </>
    );
  }, []);

  return (
    <div className="space-y-4">
      <Flex className="w-full justify-between">
        <h2 className="text-2xl font-bold">QR Codes</h2>
        <Link href={"/dashboard/qrcodes/create"}>
          <Button className="flex items-center justify-center gap-3" type="submit">
            <QrCode className="w-4 h-4" />
            Create QR Code
          </Button>
        </Link>
      </Flex>
      <PaginatedTable
        headers={headers}
        itemsPerPage={ITEMS_PER_PAGE}
        loading={loading}
        data={urls}
        columns={columns}
        totalItems={totalItems}
        totalPages={totalPages}
        skeletonColumns={skeletonColumns}
      />
    </div>
  );
}
