import BackButton from "@/components/common/BackButton";
import Section from "@/components/common/Section";
import Container from "@/components/Container";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `404 Page Not Found`,
};
export default function NotFound() {
  return (
    <Container>
      <Section className="mt-8 flex items-center justify-center w-full min-h-[calc(100vh-30rem)]">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex flex-col gap-4 justify-center items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-center">Page Not Found!</h2>
            <p>This page you requested doesn&apos;t exist</p>
            <BackButton className="mt-4 text-white dark:text-background bg-primary hover:bg-primary/90 py-2 px-4" text="Go Back Home" url="/" />
          </div>
        </Suspense>
      </Section>
    </Container>
  );
}
