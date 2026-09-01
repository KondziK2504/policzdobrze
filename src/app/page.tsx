"use client";

import { useState } from "react";

const calculators = [
  {
    icon: "🚗",
    name: "Kalkulator kosztu przejazdu",
    description: "Oblicz koszt paliwa podczas podróży.",
    category: "Motoryzacja",
    keywords: "przejazd paliwo podróż samochód auto trasa km",
    href: "/motoryzacja/koszt-przejazdu",
  },
  {
    icon: "⛽",
    name: "Kalkulator spalania",
    description: "Oblicz średnie spalanie samochodu.",
    category: "Motoryzacja",
    keywords: "spalanie samochód auto paliwo l/100 benzyna diesel",
    href: "/motoryzacja/spalanie",
  },
  {
    icon: "💰",
    name: "Kalkulator kosztu paliwa",
    description: "Sprawdź, ile zapłacisz za paliwo.",
    category: "Motoryzacja",
    keywords: "paliwo benzyna diesel ropa cena koszt trasa",
    href: "/motoryzacja/koszt-paliwa",
  },
  {
    icon: "🚘",
    name: "Kalkulator sprowadzenia auta",
    description: "Oblicz orientacyjny koszt importu samochodu.",
    category: "Motoryzacja",
    keywords: "samochód auto import sprowadzenie niemcy akcyza",
    href: "/motoryzacja/sprowadzenie-auta",
  },

  {
    icon: "🏗️",
    name: "Kalkulator betonu",
    description: "Oblicz ilość potrzebnego betonu.",
    category: "Budowa i remont",
    keywords: "beton budowa fundament posadzka m3",
    href: "#",
  },
  {
    icon: "🧱",
    name: "Kalkulator kostki brukowej",
    description: "Oblicz ilość kostki potrzebnej na powierzchnię.",
    category: "Budowa i remont",
    keywords: "kostka brukowa podjazd taras plac m2",
    href: "#",
  },
  {
    icon: "🎨",
    name: "Kalkulator farby",
    description: "Oblicz, ile farby potrzebujesz.",
    category: "Budowa i remont",
    keywords: "farba malowanie ściana sufit litry",
    href: "#",
  },
  {
    icon: "🧱",
    name: "Kalkulator płytek",
    description: "Oblicz liczbę potrzebnych płytek.",
    category: "Budowa i remont",
    keywords: "płytki kafelki łazienka podłoga m2",
    href: "#",
  },

  {
    icon: "💵",
    name: "Kalkulator VAT",
    description: "Oblicz kwotę netto, brutto i VAT.",
    category: "Finanse",
    keywords: "vat brutto netto podatek faktura",
    href: "#",
  },
  {
    icon: "📊",
    name: "Kalkulator marży",
    description: "Oblicz marżę i cenę sprzedaży.",
    category: "Finanse",
    keywords: "marża sprzedaż zysk cena procent",
    href: "#",
  },
  {
    icon: "🏦",
    name: "Kalkulator raty",
    description: "Oblicz orientacyjną wysokość raty.",
    category: "Finanse",
    keywords: "rata kredyt pożyczka oprocentowanie",
    href: "#",
  },

  {
    icon: "⚡",
    name: "Kalkulator zużycia prądu",
    description: "Oblicz koszt zużycia energii elektrycznej.",
    category: "Dom",
    keywords: "prąd energia elektryczna kwh rachunek",
    href: "#",
  },
  {
    icon: "🔥",
    name: "Kalkulator ogrzewania",
    description: "Oszacuj koszt ogrzewania domu.",
    category: "Dom",
    keywords: "ogrzewanie dom gaz prąd ciepło",
    href: "#",
  },
  {
    icon: "📐",
    name: "Kalkulator powierzchni",
    description: "Oblicz powierzchnię pomieszczenia.",
    category: "Dom",
    keywords: "powierzchnia metry kwadratowe m2 pokój",
    href: "#",
  },
];

const categories = [
  {
    icon: "🚗",
    name: "Motoryzacja",
    description: "Samochody, paliwo, spalanie i podróże",
    href: "/motoryzacja",
  },
  {
    icon: "🏗️",
    name: "Budowa i remont",
    description: "Materiały, powierzchnie i ilości",
    href: "#",
  },
  {
    icon: "💰",
    name: "Finanse",
    description: "Pieniądze, podatki i obliczenia",
    href: "#",
  },
  {
    icon: "🏠",
    name: "Dom",
    description: "Koszty i obliczenia związane z domem",
    href: "#",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredCalculators = calculators.filter((calculator) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    const text = `
      ${calculator.name}
      ${calculator.description}
      ${calculator.category}
      ${calculator.keywords}
    `.toLowerCase();

    return text.includes(query);
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <a
            href="/"
            className="text-xl font-extrabold tracking-tight"
          >
            POLICZ<span className="text-blue-600">DOBRZE</span>
          </a>

          <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            <a
              href="#kalkulatory"
              className="hover:text-blue-600"
            >
              Kalkulatory
            </a>

            <a
              href="#jak-dziala"
              className="hover:text-blue-600"
            >
              Jak to działa?
            </a>
          </nav>

        </div>
      </header>


      <section className="bg-white">

        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 text-center">

          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Darmowe narzędzia online
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Policz to dobrze.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Proste kalkulatory, które pomagają szybko obliczyć
            koszty, ilości i wartości potrzebne w codziennym życiu.
          </p>


          <div className="mx-auto mt-9 flex max-w-2xl items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">

            <span className="px-4 text-xl">
              🔎
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Czego chcesz poszukać? np. beton, paliwo, VAT..."
              className="w-full bg-transparent px-2 py-3 text-sm outline-none sm:text-base"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="mr-2 rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            )}

          </div>

        </div>

      </section>


      {search.trim() && (

        <section className="mx-auto max-w-6xl px-6 pb-10 pt-10">

          <div className="mb-6">

            <h2 className="text-2xl font-bold">
              Wyniki wyszukiwania
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Wyniki dla: <strong>{search}</strong>
            </p>

          </div>


          {filteredCalculators.length > 0 ? (

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {filteredCalculators.map((calculator) => (

                <a
                  key={calculator.name}
                  href={calculator.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >

                  <div className="mb-4 text-3xl">
                    {calculator.icon}
                  </div>

                  <div className="font-semibold group-hover:text-blue-600">
                    {calculator.name}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {calculator.description}
                  </p>

                  <div className="mt-4 text-xs font-medium text-blue-600">
                    {calculator.category}
                  </div>

                </a>

              ))}

            </div>

          ) : (

            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">

              <div className="text-4xl">
                🔎
              </div>

              <h3 className="mt-4 text-xl font-bold">
                Nie znaleźliśmy kalkulatora
              </h3>

              <p className="mt-2 text-slate-500">
                Spróbuj wyszukać coś innego.
              </p>

            </div>

          )}

        </section>

      )}


      <section
        id="kalkulatory"
        className="mx-auto max-w-6xl px-6 py-14"
      >

        <div className="mb-8">

          <h2 className="text-2xl font-bold">
            Kategorie
          </h2>

          <p className="mt-1 text-slate-500">
            Wybierz temat, który Cię interesuje.
          </p>

        </div>


        <div className="grid gap-6 md:grid-cols-2">

          {categories.map((category) => {

            const categoryCalculators = calculators.filter(
              (calculator) =>
                calculator.category === category.name
            );

            return (

              <a
                key={category.name}
                href={category.href}
                className="block rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >

                <div className="flex items-start gap-4">

                  <div className="text-4xl">
                    {category.icon}
                  </div>

                  <div>

                    <h3 className="text-xl font-bold">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {category.description}
                    </p>

                  </div>

                </div>


                <div className="mt-6 space-y-2">

                  {categoryCalculators.map((calculator) => (

                    <div
                      key={calculator.name}
                      className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium"
                    >

                      <span>
                        {calculator.icon} {calculator.name}
                      </span>

                      <span>
                        →
                      </span>

                    </div>

                  ))}

                </div>

              </a>

            );

          })}

        </div>

      </section>


      <section
        id="jak-dziala"
        className="bg-white py-16"
      >

        <div className="mx-auto max-w-6xl px-6">

          <div className="mx-auto max-w-2xl text-center">

            <h2 className="text-3xl font-bold">
              Jak to działa?
            </h2>

            <p className="mt-3 text-slate-500">
              Bez rejestracji. Bez zbędnego komplikowania.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl bg-slate-50 p-7 text-center">

              <div className="text-4xl">
                🔎
              </div>

              <h3 className="mt-4 font-bold">
                1. Znajdź narzędzie
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Wyszukaj kalkulator lub wybierz kategorię.
              </p>

            </div>


            <div className="rounded-3xl bg-slate-50 p-7 text-center">

              <div className="text-4xl">
                ✏️
              </div>

              <h3 className="mt-4 font-bold">
                2. Wpisz dane
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Podaj wartości potrzebne do obliczenia.
              </p>

            </div>


            <div className="rounded-3xl bg-slate-50 p-7 text-center">

              <div className="text-4xl">
                ✅
              </div>

              <h3 className="mt-4 font-bold">
                3. Otrzymaj wynik
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Wynik otrzymasz natychmiast.
              </p>

            </div>

          </div>

        </div>

      </section>


      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <div>
            © {new Date().getFullYear()} PoliczDobrze.pl
          </div>

          <div>
            Darmowe kalkulatory online
          </div>

        </div>

      </footer>

    </main>
  );
}