import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator betonu – oblicz ilość betonu w m³",
  description:
    "Darmowy kalkulator betonu. Oblicz objętość betonu potrzebnego do fundamentu, płyty, posadzki lub innej konstrukcji.",
  alternates: {
    canonical: "https://policzdobrze.pl/budowa-remont/beton",
  },
  openGraph: {
    title: "Kalkulator betonu – PoliczDobrze.pl",
    description:
      "Oblicz ilość potrzebnego betonu w metrach sześciennych.",
    url: "https://policzdobrze.pl/budowa-remont/beton",
    siteName: "PoliczDobrze.pl",
    locale: "pl_PL",
    type: "website",
  },
};

export default function BetonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}