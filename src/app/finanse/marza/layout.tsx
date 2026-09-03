import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator marży – oblicz marżę i zysk",
  description:
    "Oblicz marżę procentową, zysk oraz narzut na podstawie ceny zakupu i ceny sprzedaży.",
  alternates: {
    canonical: "https://policzdobrze.pl/finanse/marza",
  },
};

export default function MarzaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}