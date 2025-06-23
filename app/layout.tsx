import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-manrope",
})

// Global Metadata
export const metadata: Metadata = {
  title: "Nepali Food Macros | Track Calories & Nutrition – Pikera Fitness",
  description:
    "Accurate macros for 100+ healthy Nepali foods. Instantly find protein, carbs, fats, and calories in dhido, gundruk, iskus, tama, and more. Built for fitness creators by Pikera Fitness.",
  keywords: [
    "nepali food macros",
    "nepali food calories",
    "nepali food protein",
    "healthy nepali foods",
    "nepali fitness nutrition",
    "dhido macros",
    "gundruk nutrition",
    "pikera fitness macros",
    "nepali diet tracking",
  ],
  metadataBase: new URL("https://fitness.pikeraai.com/"), // replace with actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nepali Food Macros | Pikera Fitness",
    description:
      "Track calories, proteins, carbs and fats in traditional Nepali meals with Pikera Fitness.",
    url: "https://fitness.pikeraai.com/",
    siteName: "Pikera Fitness",
    images: [
      {
        url: "https://fitness.pikeraai.com/nepali-food-macros.png", // Make sure this exists
        width: 1200,
        height: 630,
        alt: "Nepali Food Macros – Pikera Fitness",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nepali Food Macros – Pikera Fitness",
    description:
      "100+ Nepali food macro breakdowns – calories, protein, carbs, and fat – all in one page.",
    site: "@pikera_fitness",
    images: ["https://fitness.pikeraai.com/nepali-food-macros.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data (JSON-LD) for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Nepali Food Macros – Pikera Fitness",
              "url": "https://fitness.pikeraai.com/",
              "description":
                "Track protein, carbs, fats, and calories of Nepali food like dhido, gundruk, tama, and more. Ideal for Nepali fitness creators and diet planning.",
              "publisher": {
                "@type": "Organization",
                "name": "Pikera Fitness",
                "url": "https://fitness.pikeraai.com/",
              },
            }),
          }}
        />
      </head>
      <body className={`${manrope.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
