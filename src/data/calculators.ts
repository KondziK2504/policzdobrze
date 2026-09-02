export type Calculator = {
  icon: string;
  name: string;
  description: string;
  category: string;
  keywords: string;
  href: string;
  status: "active" | "coming-soon";
};

export const calculators: Calculator[] = [
  // =========================
  // MOTORYZACJA
  // =========================

  {
    icon: "🚗",
    name: "Kalkulator kosztu przejazdu",
    description:
      "Oblicz koszt paliwa, całkowity koszt podróży i koszt przypadający na jedną osobę.",
    category: "Motoryzacja",
    keywords:
      "przejazd paliwo podróż samochód auto trasa km koszt podróży",
    href: "/motoryzacja/koszt-przejazdu",
    status: "active",
  },

  {
    icon: "⛽",
    name: "Kalkulator spalania",
    description:
      "Oblicz średnie spalanie samochodu w l/100 km oraz koszt przejazdu.",
    category: "Motoryzacja",
    keywords:
      "spalanie samochód auto paliwo benzyna diesel l/100 km",
    href: "/motoryzacja/spalanie",
    status: "active",
  },

  {
    icon: "💰",
    name: "Kalkulator kosztu paliwa",
    description:
      "Sprawdź, ile paliwa potrzebujesz oraz ile będzie kosztować przejazd.",
    category: "Motoryzacja",
    keywords:
      "paliwo benzyna diesel ropa cena koszt trasa samochód",
    href: "/motoryzacja/koszt-paliwa",
    status: "active",
  },

  {
    icon: "🚘",
    name: "Kalkulator sprowadzenia auta",
    description:
      "Oszacuj orientacyjny koszt sprowadzenia samochodu z zagranicy.",
    category: "Motoryzacja",
    keywords:
      "samochód auto import sprowadzenie niemcy akcyza transport",
    href: "/motoryzacja/sprowadzenie-auta",
    status: "active",
  },

  {
    icon: "🛞",
    name: "Kalkulator opon – rozmiar i zamiennik",
    description:
      "Porównaj dwa rozmiary opon i sprawdź różnicę średnicy, obwodu, wysokości boku oraz wskazań prędkościomierza.",
    category: "Motoryzacja",
    keywords:
      "opony kalkulator opon rozmiar zamiennik 205 55 R16 225 45 R17 średnica obwód prędkościomierz",
    href: "/motoryzacja/opony",
    status: "active",
  },

  {
    icon: "⛽",
    name: "Kalkulator LPG vs benzyna",
    description:
      "Porównaj koszt jazdy samochodem na LPG i benzynie.",
    category: "Motoryzacja",
    keywords:
      "lpg benzyna gaz paliwo koszt jazdy oszczędność",
    href: "#",
    status: "coming-soon",
  },

  // =========================
  // BUDOWA I REMONT
  // =========================

  {
    icon: "🏗️",
    name: "Kalkulator betonu",
    description:
      "Oblicz objętość betonu potrzebnego do fundamentu, płyty lub posadzki.",
    category: "Budowa i remont",
    keywords:
      "beton budowa fundament płyta posadzka m3 cement",
    href: "/budowa-remont/beton",
    status: "active",
  },

  {
    icon: "🧱",
    name: "Kalkulator kostki brukowej",
    description:
      "Oblicz powierzchnię oraz orientacyjną liczbę kostek potrzebnych na podjazd lub chodnik.",
    category: "Budowa i remont",
    keywords:
      "kostka brukowa podjazd chodnik taras m2 bruk",
    href: "/budowa-remont/kostka-brukowa",
    status: "active",
  },

  {
    icon: "🎨",
    name: "Kalkulator farby",
    description:
      "Oblicz ilość farby potrzebnej do pomalowania ścian.",
    category: "Budowa i remont",
    keywords:
      "farba malowanie ściana sufit litry remont",
    href: "/budowa-remont/farba",
    status: "active",
  },

  {
    icon: "🧱",
    name: "Kalkulator płytek",
    description:
      "Oblicz liczbę płytek oraz zapas potrzebny do remontu.",
    category: "Budowa i remont",
    keywords:
      "płytki kafelki łazienka podłoga ściana m2 remont",
    href: "/budowa-remont/plytki",
    status: "active",
  },

  {
    icon: "🪨",
    name: "Kalkulator piasku i żwiru",
    description:
      "Oblicz orientacyjną objętość i masę potrzebnego kruszywa.",
    category: "Budowa i remont",
    keywords:
      "piasek żwir kruszywo budowa tona m3",
    href: "/budowa-remont/piasek-i-zwir",
    status: "active",
  },

  {
    icon: "🧱",
    name: "Kalkulator cementu",
    description:
      "Oszacuj ilość cementu oraz liczbę potrzebnych worków.",
    category: "Budowa i remont",
    keywords:
      "cement beton zaprawa budowa worki kg",
    href: "/budowa-remont/cement",
    status: "active",
  },

  // =========================
  // FINANSE
  // =========================

  {
    icon: "💵",
    name: "Kalkulator VAT",
    description:
      "Oblicz kwotę netto, VAT i brutto dla wybranej stawki.",
    category: "Finanse",
    keywords:
      "vat netto brutto podatek cena faktura 23 8 5",
    href: "/finanse/vat",
    status: "active",
  },

  {
    icon: "🚗",
    name: "Kalkulator leasingu samochodu",
    description:
      "Oszacuj ratę, wpłatę własną, wykup i całkowity koszt leasingu samochodu.",
    category: "Finanse",
    keywords:
      "leasing samochodu kalkulator raty rata leasingowa auto wykup wpłata własna finansowanie",
    href: "/finanse/leasing",
    status: "active",
  },

  {
    icon: "💼",
    name: "Kalkulator wynagrodzenia brutto netto",
    description:
      "Oblicz orientacyjne wynagrodzenie netto dla umowy o pracę.",
    category: "Finanse",
    keywords:
      "wynagrodzenie brutto netto pensja wypłata umowa o pracę zarobki 2026",
    href: "/finanse/wynagrodzenie",
    status: "active",
  },

  {
    icon: "📊",
    name: "Kalkulator marży",
    description:
      "Oblicz marżę, narzut, zysk i cenę sprzedaży.",
    category: "Finanse",
    keywords:
      "marża narzut zysk cena sprzedaży procent",
    href: "#",
    status: "coming-soon",
  },

  // =========================
  // DOM
  // =========================

  {
    icon: "⚡",
    name: "Kalkulator zużycia prądu",
    description:
      "Oblicz koszt zużycia energii elektrycznej.",
    category: "Dom",
    keywords:
      "prąd energia elektryczna kwh rachunek koszt",
    href: "#",
    status: "coming-soon",
  },

  {
    icon: "🔥",
    name: "Kalkulator ogrzewania",
    description:
      "Oszacuj koszt ogrzewania domu.",
    category: "Dom",
    keywords:
      "ogrzewanie dom gaz prąd ciepło koszt",
    href: "#",
    status: "coming-soon",
  },

  {
    icon: "📐",
    name: "Kalkulator powierzchni",
    description:
      "Oblicz powierzchnię pomieszczenia, ściany lub podłogi.",
    category: "Dom",
    keywords:
      "powierzchnia metry kwadratowe m2 pokój ściana podłoga",
    href: "#",
    status: "coming-soon",
  },
];