import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Implify App",
  description: "By Antonio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" font-mono ">{children}</body>
    </html>
  );
}
