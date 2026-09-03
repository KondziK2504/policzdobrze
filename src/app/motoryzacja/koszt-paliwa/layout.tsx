import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator kosztu paliwa – oblicz koszt przejazdu",
  description:
    "Oblicz koszt paliwa dla wybranej trasy. Podaj dystans, spalanie i cenę paliwa, aby sprawdzić koszt podróży oraz zużycie paliwa.",
  alternates: {
    canonical: "https://www.policzdobrze.pl/motoryzacja/koszt-paliwa",
  },
  openGraph: {
    title: "Kalkulator kosztu paliwa – PoliczDobrze.pl",
    description:
      "Sprawdź, ile zapłacisz za paliwo na wybranej trasie.",
    url: "https://www.policzdobrze.pl/motoryzacja/koszt-paliwa",
    siteName: "PoliczDobrze.pl",
    locale: "pl_PL",
    type: "website",
  },
};

export default function KosztPaliwaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}