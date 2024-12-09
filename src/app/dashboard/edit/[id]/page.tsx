"use client";
import { getShortURlDetailsById } from "@/actions/db";
import CreateShortURL from "@/app/(components)/CreateShortURL";
import Flex from "@/components/common/Flex";
import { Card } from "@/components/ui/card";
import { ShortURLDetails } from "@/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function EditURLDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [details, setDetails] = useState<ShortURLDetails>({
    title: "",
    longURL: "",
    shortURL: "",
    id: "",
  });

  const fetchShortenURLDetails = useCallback(async (shortURLId: string) => {
    const shortenURLDBDetails = await getShortURlDetailsById(shortURLId);
    setDetails({
      title: shortenURLDBDetails?.title as string,
      longURL: shortenURLDBDetails?.originalUrl as string,
      shortURL: shortenURLDBDetails?.shortCode as string,
      id: shortenURLDBDetails?.id as string,
    });
  }, []);

  useEffect(() => {
    if (id) {
      fetchShortenURLDetails(id as string);
    }
  }, [id]);

  const redirectAfterUpdation = useCallback((info: ShortURLDetails) => {
    setDetails(info);
    router.push("/dashboard/urls");
  }, []);

  return (
    <Flex className="flex flex-col w-full justify-center items-center max-w-2xl gap-2">
      <Card className="w-full flex flex-col gap-4 justify-center rounded-2xl border-2 shadow-2xl p-10">
        <CreateShortURL setShortURLDetails={redirectAfterUpdation} urlDetails={details} isEdit={true} shortURLId={id as string} />
      </Card>
    </Flex>
  );
}

export default EditURLDetails;
