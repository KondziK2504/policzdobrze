import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator brutto netto – przelicz cenę",
  description:
    "Przelicz cenę brutto na netto lub netto na brutto. Wybierz odpowiednią stawkę VAT.",
  alternates: {
    canonical: "https://www.policzdobrze.pl/finanse/brutto-netto",
  },
};

export default function BruttoNettoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}