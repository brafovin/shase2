import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BMW | The Ultimate Driving Experience",
  description:
    "Discover BMW's world-class lineup of luxury vehicles. Experience the perfect blend of performance, innovation, and elegance.",
  keywords: "BMW, luxury cars, electric vehicles, M Series, performance, automotive",
  openGraph: {
    title: "BMW | The Ultimate Driving Experience",
    description: "Discover the pinnacle of automotive engineering and luxury.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-[#0a0a0a] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
