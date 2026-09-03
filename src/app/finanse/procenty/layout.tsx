import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator procentów – procent z liczby i zmiana procentowa",
  description:
    "Oblicz procent z liczby, sprawdź ile procent stanowi jedna liczba z drugiej oraz oblicz podwyżkę lub obniżkę procentową.",
  alternates: {
    canonical: "https://www.policzdobrze.pl/finanse/procenty",
  },
};

export default function ProcentyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}