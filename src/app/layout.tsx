import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const siteUrl = "https://policzdobrze.pl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "PoliczDobrze.pl – Darmowe kalkulatory online",
    template: "%s | PoliczDobrze.pl",
  },

  description:
    "Darmowe kalkulatory online. Oblicz koszty paliwa, spalanie samochodu, koszt podróży, sprowadzenie auta i wiele innych rzeczy.",

  keywords: [
    "kalkulator",
    "kalkulatory online",
    "darmowe kalkulatory",
    "kalkulator paliwa",
    "kalkulator spalania",
    "kalkulator kosztu przejazdu",
    "kalkulator sprowadzenia auta",
  ],

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: "PoliczDobrze.pl – Darmowe kalkulatory online",
    description:
      "Proste i darmowe kalkulatory do codziennych obliczeń.",
    url: siteUrl,
    siteName: "PoliczDobrze.pl",
    locale: "pl_PL",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PoliczDobrze.pl – Darmowe kalkulatory online",
    description:
      "Proste i darmowe kalkulatory do codziennych obliczeń.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}