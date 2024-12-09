import Container from "@/components/Container";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import FeatureHighlights from "@/components/FeatureHighlights";
import FeaturesGrid from "@/components/FeatureGridOne";
import Hero from "@/components/Hero";
import { faqs, featuresGridOne, highlights } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { headers } from "next/headers";
import Script from "next/script";

export default function Home() {
  const headersList = headers();
  const lang = headersList.get("x-current-path")?.split("/")[1] as string;
  return (
    <>
      {lang && (
        <>
          <Script async src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
          <Script async id="google-translate-init">
            {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: '${lang},en',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: true
              },
              'google_translate_element'
            );
          }
        `}
          </Script>

          <div id="google_translate_element" className="fixed top-2 right-2 z-50"></div>
        </>
      )}
      <Container>
        <Hero />
        <FeaturesGrid
          title="Why Choose Sniply?"
          description="Enjoy free analytics, a dedicated performance dashboard, QR code generation, link expiration, and much more with Sniply"
          features={featuresGridOne}
        />

        <FeatureHighlights
          title="How It Works"
          description="Our URL shortener is designed to be simple and effective. Just paste your long URL, click the button, and get your shortened link
                instantly. Share it anywhere, and track its performance with our analytics dashboard."
          highlights={highlights}
        />
        <FAQ faqs={faqs} />
        <CTA
          title="Share Faster, Everywhere."
          description="Transform URLs: Shorten, Share, Track."
          btn={
            <Link href={"/login"}>
              <Button size={"lg"} className="rounded-full py-8 flex px-20">
                Get Started
              </Button>
            </Link>
          }
        />
      </Container>
    </>
  );
}
