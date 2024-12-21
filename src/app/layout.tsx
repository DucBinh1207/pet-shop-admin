"use client";

import { Baloo_2, Quicksand } from "next/font/google";
import "./globals.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import ToastNotification from "@/components/common/toast";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";

const baloo_2_init = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo_2",
});

const quicksand_init = Quicksand({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en" className="h-full w-full">
      <body
        className={`${baloo_2_init.variable} ${quicksand_init.variable} antialiased`}
      >
        <div className="flex">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="relative flex flex-1 flex-col lg:ml-72.5">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
        </div>

        {children}

        <ToastNotification />
      </body>
    </html>
  );
}
