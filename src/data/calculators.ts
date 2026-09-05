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
      "Oblicz średnie spalanie samochodu w l/100 km oraz koszt przejechania 100 km.",
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
    icon: "🛡️",
    name: "Kalkulator OC/AC",
    description:
      "Oszacuj orientacyjny koszt ubezpieczenia OC lub OC i AC samochodu.",
    category: "Motoryzacja",
    keywords:
      "oc ac ubezpieczenie samochodu kalkulator składki polisa ubezpieczenie auta",
    href: "/motoryzacja/oc-ac",
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

  {
    icon: "🛣️",
    name: "Kalkulator kosztu podróży",
    description:
      "Oszacuj całkowity koszt samochodowej podróży.",
    category: "Motoryzacja",
    keywords:
      "podróż samochodem wakacje trasa paliwo koszt",
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
      "Oblicz kwotę netto, brutto oraz VAT dla wybranej stawki.",
    category: "Finanse",
    keywords:
      "vat netto brutto podatek cena faktura 23 8 5",
    href: "/finanse/vat",
    status: "active",
  },

  {
    icon: "🧾",
    name: "Kalkulator brutto netto",
    description:
      "Przelicz cenę netto na brutto lub brutto na netto.",
    category: "Finanse",
    keywords:
      "brutto netto cena faktura pensja wynagrodzenie vat",
    href: "/finanse/brutto-netto",
    status: "active",
  },

  {
    icon: "📊",
    name: "Kalkulator marży",
    description:
      "Oblicz marżę, zysk i narzut na podstawie ceny zakupu oraz sprzedaży.",
    category: "Finanse",
    keywords:
      "marża marza zysk sprzedaż cena zakupu narzut procent",
    href: "/finanse/marza",
    status: "active",
  },

  {
    icon: "📈",
    name: "Kalkulator narzutu",
    description:
      "Oblicz cenę sprzedaży na podstawie ceny zakupu i narzutu.",
    category: "Finanse",
    keywords:
      "narzut cena zakupu cena sprzedaży zysk marża procent",
    href: "/finanse/narzut",
    status: "active",
  },

  {
    icon: "%",
    name: "Kalkulator procentów",
    description:
      "Oblicz procent z liczby, zmianę procentową oraz ile procent stanowi jedna liczba z drugiej.",
    category: "Finanse",
    keywords:
      "procent procenty procentowa zmiana podwyżka obniżka",
    href: "/finanse/procenty",
    status: "active",
  },

  {
    icon: "🏦",
    name: "Kalkulator raty kredytu",
    description:
      "Oblicz orientacyjną ratę kredytu oraz całkowitą kwotę spłat.",
    category: "Finanse",
    keywords:
      "rata kredytu kredyt pożyczka oprocentowanie rata miesięczna",
    href: "/finanse/rata-kredytu",
    status: "active",
  },

  {
    icon: "🏦",
    name: "Kalkulator zdolności kredytowej",
    description:
      "Oszacuj orientacyjną zdolność kredytową na podstawie dochodu, kosztów i obecnych zobowiązań.",
    category: "Finanse",
    keywords:
      "zdolność kredytowa kredyt hipoteczny kredyt rata dochód zarobki bank finansowanie",
    href: "/finanse/zdolnosc-kredytowa",
    status: "active",
  },

  {
    icon: "🏠",
    name: "Kalkulator kredytu hipotecznego",
    description:
      "Oblicz orientacyjną ratę kredytu hipotecznego, całkowity koszt spłaty i wysokość odsetek.",
    category: "Finanse",
    keywords:
      "kredyt hipoteczny kalkulator rata kredytu mieszkanie dom nieruchomość wkład własny oprocentowanie",
    href: "/finanse/kredyt-hipoteczny",
    status: "active",
  },

  {
    icon: "💳",
    name: "Kalkulator kredytu gotówkowego",
    description:
      "Oblicz orientacyjną ratę, całkowity koszt kredytu oraz kwotę odsetek.",
    category: "Finanse",
    keywords:
      "kredyt gotówkowy kalkulator rata pożyczka bank kredyt konsumencki odsetki koszt kredytu",
    href: "/finanse/kredyt-gotowkowy",
    status: "active",
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