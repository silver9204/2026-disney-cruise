import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Disney Adventure 2026 · Family Voyage Planner",
  description: "2026 Disney Adventure 싱가포르 크루즈 가족 여행 대시보드",
};

export const dynamic = "force-static";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${geist.variable} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
