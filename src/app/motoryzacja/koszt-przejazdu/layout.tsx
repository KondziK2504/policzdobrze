import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator kosztu przejazdu – oblicz koszt paliwa",
  description:
    "Darmowy kalkulator kosztu przejazdu samochodem. Oblicz koszt paliwa, koszt 100 km oraz koszt podróży na osobę.",
  alternates: {
    canonical: "https://policzdobrze.pl/motoryzacja/koszt-przejazdu",
  },
  openGraph: {
    title: "Kalkulator kosztu przejazdu – PoliczDobrze.pl",
    description:
      "Oblicz koszt przejazdu, potrzebne paliwo i koszt podróży na osobę.",
    url: "https://policzdobrze.pl/motoryzacja/koszt-przejazdu",
    siteName: "PoliczDobrze.pl",
    locale: "pl_PL",
    type: "website",
  },
};

export default function KosztPrzejazduLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}