"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import UrlShortenerDetails from "./UrlShortenerDetails";
import CreateShortURL from "./CreateShortURL";
import { ShortURLDetails } from "@/interfaces";

export default function UrlShortener() {
  const [details, setDetails] = useState<ShortURLDetails>({
    title: "",
    longURL: "",
    shortURL: "",
    id: "",
  });

  function resetDetails() {
    setDetails({ title: "", longURL: "", shortURL: "", id: "" });
  }

  useEffect(() => {
    return () => {
      resetDetails();
    };
  }, []);

  return (
    <Card className="w-full flex flex-col gap-4 justify-center rounded-2xl border-2 shadow-2xl p-10">
      <CreateShortURL setShortURLDetails={(info) => setDetails(info)} urlDetails={details} />
      {details.shortURL && (
        <UrlShortenerDetails
          id={details.id}
          longUrl={details.longURL}
          title={details.title || ""}
          tinyUrl={details.shortURL}
          resetDetails={resetDetails}
        />
      )}
    </Card>
  );
}
