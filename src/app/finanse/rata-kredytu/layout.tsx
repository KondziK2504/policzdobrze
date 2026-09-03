import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator raty kredytu – oblicz miesięczną ratę",
  description:
    "Oblicz orientacyjną miesięczną ratę kredytu, sumę spłat oraz koszt odsetek.",
  alternates: {
    canonical: "https://policzdobrze.pl/finanse/rata-kredytu",
  },
};

export default function RataKredytuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}