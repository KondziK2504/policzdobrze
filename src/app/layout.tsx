import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PoliczDobrze.pl – Darmowe kalkulatory online",
    template: "%s | PoliczDobrze.pl",
  },

  description:
    "Darmowe kalkulatory online. Oblicz koszty paliwa, spalanie samochodu, koszt podróży, sprowadzenie auta oraz wiele innych rzeczy.",

  keywords: [
    "kalkulator",
    "kalkulatory online",
    "darmowy kalkulator",
    "kalkulator paliwa",
    "kalkulator spalania",
    "kalkulator kosztu przejazdu",
    "kalkulator sprowadzenia auta",
  ],

  openGraph: {
    title: "PoliczDobrze.pl – Darmowe kalkulatory online",
    description:
      "Proste i darmowe kalkulatory do codziennych obliczeń.",
    type: "website",
    locale: "pl_PL",
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
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}