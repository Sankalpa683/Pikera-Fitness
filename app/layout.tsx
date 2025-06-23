import type React from "react"
import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Nepali Nutrition - Food Macro Tracker",
  description: "Find macronutrient values of common Nepali foods for fitness creators and clients",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
