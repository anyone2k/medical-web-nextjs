import type { Metadata } from "next";
import { Domine } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";

const domine = Domine({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MDS Online",
  description: "Best online platform to find a doct",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={domine.className}>
          <Navbar/>
          <main>
          {children}
          </main>
          </body>
      </html>
    </AuthProvider>
  );
}
