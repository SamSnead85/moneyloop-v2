import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MoneyLoop | AI-Powered Financial Command Center",
  description: "The one stop shop to manage your absolute wealth. AI-powered insights, automated bill payments, and complete financial visibility in a single dashboard.",
  keywords: ["personal finance", "AI financial agent", "budget automation", "wealth management", "money tracking"],
  authors: [{ name: "MoneyLoop" }],
  openGraph: {
    title: "MoneyLoop | AI-Powered Financial Command Center",
    description: "Take control of your financial future with AI-powered automation and insights.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoneyLoop | AI-Powered Financial Command Center",
    description: "Take control of your financial future with AI-powered automation and insights.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#08080c" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
