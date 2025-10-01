import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import { PageTransition } from "@/components/page-transition"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Navigation } from "@/components/navigation"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
})

export const metadata: Metadata = {
  title: "Tesleem Oladepo - FullStack Developer",
  description:
    "Experienced FullStack Developer with 3+ years in React.js and Node.js. Building scalable web applications with modern technologies.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${sourceSans.variable} antialiased`}
    >
      <body className="font-sans">
        <Navigation />
        <PageTransition>{children}</PageTransition>
        <ScrollToTop />
      </body>
    </html>
  );
}
