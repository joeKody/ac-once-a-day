import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AC once day",
  description: "Have you solved a problem today?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col bg-gradient-to-tr from-zinc-900 via-neutral-950 to-zinc-900 to items-center min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
