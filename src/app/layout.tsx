import type { Metadata } from "next";
import { Baloo_2, Quicksand } from "next/font/google";
import "./globals.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import ToastNotification from "@/components/common/toast";

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

export const metadata: Metadata = {
  title: "Whiskers Admin",
  description: "Web Admin for Whiskers Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={`${baloo_2_init.variable} ${quicksand_init.variable} antialiased`}
      >
        {children}

        <ToastNotification />
      </body>
    </html>
  );
}
