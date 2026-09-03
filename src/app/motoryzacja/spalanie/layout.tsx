import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator spalania samochodu – l/100 km",
  description:
    "Darmowy kalkulator spalania samochodu. Oblicz średnie spalanie w l/100 km, koszt przejechania 100 km oraz koszt zużytego paliwa.",
  alternates: {
    canonical: "https://www.policzdobrze.pl/motoryzacja/spalanie",
  },
  openGraph: {
    title: "Kalkulator spalania samochodu – PoliczDobrze.pl",
    description:
      "Oblicz spalanie samochodu w l/100 km oraz koszt paliwa.",
    url: "https://www.policzdobrze.pl/motoryzacja/spalanie",
    siteName: "PoliczDobrze.pl",
    locale: "pl_PL",
    type: "website",
  },
};

export default function SpalanieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}