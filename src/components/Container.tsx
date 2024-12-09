import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow w-full  overflow-hidden mt-16">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Container;
