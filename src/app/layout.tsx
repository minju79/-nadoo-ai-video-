import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

const nanumPen = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: '400',
  variable: '--font-handwriting',
});

export const metadata: Metadata = {
  title: "나도 AI 미디어 | Premium Video Solutions",
  description: "살아 움직이는 비즈니스의 시작. 나도 AI 미디어가 당신의 브랜드를 영상으로 혁신합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${cormorant.variable} ${nanumPen.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
