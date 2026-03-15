import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import MainProviders from "@/Providers/MainProviders";
import Provider from "@/Providers/Provider";
import { Toaster } from "sonner";
import Navbar from "@/components/sheared/Navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MachineM8",
  description: "Top-Quality Instruments Ready To Rent At Flexible Rates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <MainProviders>
          <Navbar />
          <Provider> {children} </Provider>
        </MainProviders>
        <Toaster position="top-right" closeButton />
      </body>
    </html>
  );
}
