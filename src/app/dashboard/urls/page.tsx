"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Edit2, Trash2, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteShortURL, getUserUrls } from "@/actions/db";
import moment from "moment";
import { Column, ShortUrl } from "@/interfaces";
import PaginatedTable from "../(components)/PaginatedTable";
import Modal from "../(components)/Modal";

const ITEMS_PER_PAGE = 10;
const headers = ["Site Logo", "Short Code", "Long URL", "Total Clicks", "Unique Visitor", "Created At", "Actions"];

export default function YourUrlsPage() {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [shortUrlIdToDelete, setShortUrlIdToDelete] = useState<string | null>(null);

  const fetchUrls = async (page: number) => {
    setLoading(true);

    const { urls, totalPages, totalItems } = await getUserUrls(page, ITEMS_PER_PAGE, localStorage.getItem("identifier") as string);
    setUrls(urls as ShortUrl[]);
    setTotalPages(totalPages);
    setTotalItems(totalItems);
    setLoading(false);
  };

  useEffect(() => {
    fetchUrls(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: string | null) => {
    setUrls((prev) => prev.filter((url) => url.id !== id));
    await deleteShortURL(id as string);
    setOpenModal(false);
  };

  const columns: Column<ShortUrl>[] = useMemo(
    () => [
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
        header: "Actions",
        accessor: "id",
        render: (value, row) => (
          <TableCell>
            <div className="flex space-x-2 gap-3 items-center">
              <Link href={`/dashboard/edit/${value}`}>
                <Button variant="ghost" className="p-0" size="sm">
                  <Edit2 className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              </Link>
              <Button
                onClick={() => {
                  setOpenModal(true);
                  setShortUrlIdToDelete(value);
                }}
                variant="ghost"
                className="p-0"
                size="sm"
              >
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
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Sniply Links</h2>
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
      <Modal
        open={openModal}
        setCloseModal={(state) => setOpenModal(state)}
        title="Delete Short URL"
        handleAction={() => handleDelete(shortUrlIdToDelete)}
        description="Are you sure you want to delete this short URL? This action cannot be undone, and it will be permanently removed."
      />
    </>
  );
}
