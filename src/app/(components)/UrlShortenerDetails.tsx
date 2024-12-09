import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, Facebook, Link2, Linkedin, Mail, MessageCircle, Type, View, WandSparkles } from "lucide-react";
import TwitterIcon from "@/components/svgs/icon-twitter";
import { Separator } from "@/components/ui/separator";
import Flex from "@/components/common/Flex";
import Link from "next/link";
import CopyToClipBoardButton from "./CopyToClipboardButton";
import ViewAnalytics from "./ViewAnalytics";

interface UrlShortenerDetailsProps {
  longUrl: string;
  title?: string;
  tinyUrl: string;
  id: string;
  resetDetails: () => void;
}

export default function UrlShortenerDetails({ id, longUrl, title, tinyUrl, resetDetails }: UrlShortenerDetailsProps) {
  const shareUrl = (platform: string) => {
    let shareLink = "";
    switch (platform) {
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(tinyUrl)}&text=${encodeURIComponent(title || "Check out this link!")}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tinyUrl)}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(tinyUrl)}&title=${encodeURIComponent(
          title || "Shared Link"
        )}`;
        break;
      case "whatsapp":
        shareLink = `https://wa.me/?text=${encodeURIComponent(`${title || "Check out this link!"} ${tinyUrl}`)}`;
        break;
      case "email":
        shareLink = `mailto:?subject=${encodeURIComponent(title || "Shared Link")}&body=${encodeURIComponent(`Check out this link: ${tinyUrl}`)}`;
        break;
    }
    if (shareLink) window.open(shareLink, "_blank");
  };

  return (
    <Card className="w-full max-w-2xl border-none shadow-none flex flex-col gap-4 justify-center">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold">Shortened URL</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <div className="space-y-2">
          <Label htmlFor="long-url" className="font-semibold flex items-center gap-2">
            <Link2 />
            Your Long URL
          </Label>
          <Input id="long-url" value={longUrl} readOnly />
        </div>
        {title && (
          <div className="space-y-2">
            <Label htmlFor="title" className="font-semibold flex items-center gap-2">
              <Type />
              Your Title
            </Label>
            <Input id="title" value={title} readOnly />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="tiny-url" className="font-semibold flex items-center gap-2">
            <WandSparkles />
            Tiny URL
          </Label>
          <div className="flex space-x-2">
            <Input id="tiny-url" value={tinyUrl} readOnly className="flex-grow" />
            <CopyToClipBoardButton textToCopy={tinyUrl} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col flex-wrap gap-4 p-0">
        <Flex className="flex gap-2 w-full my-2 items-start justify-start">
          <Button asChild variant="default">
            <Link href={tinyUrl} target="_blank" rel="noopener noreferrer" className="flex gap-1">
              <View className="h-4 w-4" />
              Visit URL
            </Link>
          </Button>
          <ViewAnalytics id={id} />
          {/* <Button>
            <Link href={`/dashboard/analytics/${id}`} className="flex gap-1">
              <BarChart3 className="h-4 w-4" />
              {session ? "View Analytics" : "login to view analytics"}
            </Link>
          </Button> */}
        </Flex>
        <Separator />
        <Flex className="flex w-full justify-center">
          <Label className="text-md flex items-center gap-2">
            <ExternalLink />
            Share on Social Media
          </Label>
        </Flex>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="icon" onClick={() => shareUrl("twitter")}>
            <TwitterIcon className="dark:fill-white" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => shareUrl("facebook")}>
            <Facebook className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => shareUrl("linkedin")}>
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => shareUrl("whatsapp")}>
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => shareUrl("email")}>
            <Mail className="h-4 w-4" />
          </Button>
        </div>
        <div onClick={resetDetails} className="p-2 mt-5 underline cursor-pointer hover:text-blue-500">
          Create Another Shorten URL
        </div>
      </CardFooter>
    </Card>
  );
}
