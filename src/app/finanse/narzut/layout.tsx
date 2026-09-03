import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator narzutu – oblicz cenę sprzedaży",
  description:
    "Oblicz cenę sprzedaży, zysk i marżę na podstawie ceny zakupu oraz procentowego narzutu.",
  alternates: {
    canonical: "https://policzdobrze.pl/finanse/narzut",
  },
};

export default function NarzutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}