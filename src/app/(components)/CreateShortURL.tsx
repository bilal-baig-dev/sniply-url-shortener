"use client";
import { useCustomToast } from "@/hooks/useCustomToast";
import { Suspense } from "react";
import { Input } from "@/components/ui/input";
import { CardTitle } from "@/components/ui/card";
import { Link2, Type } from "lucide-react";
import Flex from "@/components/common/Flex";
import { Label } from "@/components/ui/label";
import { apiRequestToMakeShortenURL } from "@/actions/apiHelper";
import { isValidUrl } from "@/lib/utils";
import ShortenURLButton from "./UrlShortenButton";
import { ShortURLDetails } from "@/interfaces";
import { Skeleton } from "@/components/ui/skeleton";

type CreateShortURLProps = {
  setShortURLDetails: (info: ShortURLDetails) => void;
  urlDetails: ShortURLDetails;
  isEdit?: boolean;
  shortURLId?: string | null;
};

function CreateShortURL({ setShortURLDetails, urlDetails, isEdit = false, shortURLId = null }: CreateShortURLProps) {
  const { showToast } = useCustomToast();

  return (
    <>
      {(!urlDetails.shortURL || isEdit) && (
        <>
          <CardTitle className="text-2xl font-bold">Shorten Your URLs Instantly</CardTitle>
          <form
            className="flex w-full mt-4 flex-col max-w-3xl justify-center gap-5"
            action={async (formData) => {
              try {
                const title = formData.get("title") as string;
                const longURL = formData.get("url") as string;
                const validateURL = isValidUrl(longURL);
                if (!validateURL) {
                  showToast({
                    title: `Entered URL is not valid or inappropriate`,
                    variant: "error",
                    duration: 5000,
                  });
                  return;
                }
                const response = await apiRequestToMakeShortenURL({
                  title,
                  longURL,
                  token: localStorage.getItem("identifier") as string,
                  isEdit,
                  shortURLId,
                });

                if (response.setToken) {
                  localStorage.setItem("identifier", response.token);
                }
                const info = {
                  ...urlDetails,
                  shortURL: response.shortUrl,
                  title,
                  longURL,
                  id: response.id,
                };
                setShortURLDetails(info);
                showToast({
                  title: isEdit ? "Shorten URL Updated!" : "Shorten URL Created!",
                  variant: "success",
                  duration: 3000,
                });
              } catch (error: any) {
                showToast({
                  title: `Error:${error?.message}`,
                  variant: "error",
                  duration: 5000,
                });
              }
            }}
          >
            <Flex className="flex w-full flex-col gap-3">
              <Label htmlFor="title" className="font-semibold flex items-center gap-2">
                <Type />
                {isEdit ? "Edit Title" : "Enter Title (Optional)"}
              </Label>
              <Input id="title" name="title" type="text" defaultValue={urlDetails?.title} placeholder="X Profile Shorten URL" required />
            </Flex>
            <Flex className="flex w-full flex-col gap-3">
              <Label htmlFor="url" className="font-semibold items-center flex gap-2">
                <Link2 />
                {isEdit ? "Update Destination Link" : "Enter Long Link Here"}
              </Label>
              <Flex className="w-full">
                <Input id="url" name="url" type="url" defaultValue={urlDetails?.longURL} placeholder="Paste Your Long Link Here" required />
              </Flex>
            </Flex>
            <Suspense fallback={<Skeleton className="h-4 w-20" />}>
              <ShortenURLButton isEdit={isEdit} />
            </Suspense>
          </form>
        </>
      )}
    </>
  );
}

export default CreateShortURL;
