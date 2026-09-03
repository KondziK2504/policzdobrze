import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator VAT – netto, brutto i podatek VAT",
  description:
    "Oblicz kwotę netto, brutto i VAT dla stawek 23%, 8%, 5% lub 0%.",
  alternates: {
    canonical: "https://www.policzdobrze.pl/finanse/vat",
  },
};

export default function VATLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}