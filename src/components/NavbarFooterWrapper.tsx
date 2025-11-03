"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NavbarFooterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <>
      {!isAuthRoute && <Navbar />}
      <main
        className={`flex-1 w-full ${
          isAuthRoute
            ? "flex items-center justify-center bg-gray-100"
            : "max-w-[1400px] mx-auto p-5 pt-30 md:pt-25"
        }`}
      >
        {children}
      </main>
      {!isAuthRoute && <Footer />}
    </>
  );
}
