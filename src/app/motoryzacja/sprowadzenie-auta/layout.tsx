import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator sprowadzenia auta – koszt importu samochodu",
  description:
    "Oblicz orientacyjny koszt sprowadzenia samochodu z zagranicy. Uwzględnij cenę auta, transport, akcyzę i dodatkowe koszty.",
  alternates: {
    canonical: "https://www.policzdobrze.pl/motoryzacja/sprowadzenie-auta",
  },
  openGraph: {
    title: "Kalkulator sprowadzenia auta – PoliczDobrze.pl",
    description:
      "Oszacuj koszt importu samochodu z zagranicy.",
    url: "https://www.policzdobrze.pl/motoryzacja/sprowadzenie-auta",
    siteName: "PoliczDobrze.pl",
    locale: "pl_PL",
    type: "website",
  },
};

export default function SprowadzenieAutaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}