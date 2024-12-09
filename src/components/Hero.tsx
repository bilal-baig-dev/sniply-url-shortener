"use client";
import ProductBadge from "./ProductBadge";
import AvatarGroup from "./AvatarGroup";
import RatingGroup from "./RatingGroup";
import LaunchOfferText from "./common/LaunchOfferText";
import Block from "./common/Block";
import Flex from "./common/Flex";
import { Button } from "./ui/button";
import UrlShortener from "@/app/(components)/UrlShortener";

function Hero() {
  return (
    <Block>
      <section className="flex gap-12 flex-col lg:flex-row justify-between mt-14 w-full xl:max-w-7xl mx-auto">
        <div className="relative flex flex-col basis-full gap-5">
          <ProductBadge title="Sniply Free Shorten URL" subtitle="Marketing Tool" />
          <Flex className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-7xl font-bold">
              Create Short, Memorable Links
              <br />
              <span className="dark:text-black text-white inline-block mt-2 p-2 bg-primary -rotate-1">in seconds.</span>
            </h1>
            <p className="font-light text-lg md:text-xl lg:max-w-3xl">
              Perfect for social media, marketing campaigns, or personal use. With built-in analytics to track every click.
            </p>
          </Flex>
          <div className="flex flex-col gap-2 items-start my-4">
            <Button size={"lg"} className="rounded-full w-auto flex px-20">
              Get Started
            </Button>
            <LaunchOfferText title="Sniply -" description="Shorten your first link in seconds" />
          </div>

          <div className="flex flex-col gap-4 items-start">
            <AvatarGroup />
            <div className="flex gap-2 flex-col items-start">
              <RatingGroup />
              <span className="text-sm font-normal">Trusted by over 1,000+ businesses worldwide</span>
            </div>
          </div>
        </div>
        <Flex className="flex flex-col w-full max-w-3xl gap-2">
          <UrlShortener />
        </Flex>
        {/* <div className="mt-16 w-full max-w-7xl mx-auto relative transform transition-transform ease-in-out duration-300 hover:scale-105">
          <div className="absolute  inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none"></div>
          <Image src="/images/crm-dashboard-demo-v2.webp" alt="Hero Image" width={1400} height={800} className="rounded-3xl shadow-2xl" />
        </div> */}
      </section>
    </Block>
  );
}

export default Hero;
