"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const calculators = [
  {
    icon: "🚗",
    name: "Kalkulator kosztu przejazdu",
    description: "Sprawdź koszt paliwa, dystans i koszt podróży na osobę.",
    category: "Motoryzacja",
    keywords: "przejazd paliwo podróż samochód auto trasa km",
    href: "/motoryzacja/koszt-przejazdu",
  },
  {
    icon: "⛽",
    name: "Kalkulator spalania",
    description: "Oblicz rzeczywiste spalanie samochodu w l/100 km.",
    category: "Motoryzacja",
    keywords: "spalanie samochód auto paliwo benzyna diesel l/100",
    href: "/motoryzacja/spalanie",
  },
  {
    icon: "💰",
    name: "Kalkulator kosztu paliwa",
    description: "Policz, ile zapłacisz za paliwo na wybranej trasie.",
    category: "Motoryzacja",
    keywords: "paliwo benzyna diesel ropa cena koszt trasa",
    href: "/motoryzacja/koszt-paliwa",
  },
  {
    icon: "🚘",
    name: "Kalkulator sprowadzenia auta",
    description: "Oszacuj orientacyjny koszt importu samochodu.",
    category: "Motoryzacja",
    keywords: "samochód auto import sprowadzenie niemcy akcyza",
    href: "/motoryzacja/sprowadzenie-auta",
  },
  {
    icon: "🏗️",
    name: "Kalkulator betonu",
    description: "Oblicz objętość betonu potrzebnego do konstrukcji.",
    category: "Budowa i remont",
    keywords: "beton budowa fundament płyta posadzka m3",
    href: "/budowa-remont/beton",
  },
  {
    icon: "🧱",
    name: "Kalkulator kostki brukowej",
    description: "Sprawdź potrzebną ilość kostki na podjazd lub chodnik.",
    category: "Budowa i remont",
    keywords: "kostka brukowa podjazd taras chodnik m2",
    href: "#",
  },
  {
    icon: "🎨",
    name: "Kalkulator farby",
    description: "Policz ilość farby potrzebnej do malowania.",
    category: "Budowa i remont",
    keywords: "farba malowanie ściana sufit litry",
    href: "#",
  },
  {
    icon: "🧱",
    name: "Kalkulator płytek",
    description: "Oblicz liczbę płytek i zapas potrzebny do remontu.",
    category: "Budowa i remont",
    keywords: "płytki kafelki łazienka podłoga ściana m2",
    href: "#",
  },
  {
    icon: "💵",
    name: "Kalkulator VAT",
    description: "Oblicz kwoty netto, VAT i brutto.",
    category: "Finanse",
    keywords: "vat netto brutto podatek faktura",
    href: "#",
  },
  {
    icon: "📊",
    name: "Kalkulator marży",
    description: "Oblicz marżę, narzut i cenę sprzedaży.",
    category: "Finanse",
    keywords: "marża narzut zysk cena sprzedaż procent",
    href: "#",
  },
  {
    icon: "🏦",
    name: "Kalkulator raty",
    description: "Oszacuj wysokość raty na podstawie parametrów kredytu.",
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
    description: "Policz powierzchnię pomieszczenia lub ściany.",
    category: "Dom",
    keywords: "powierzchnia metry kwadratowe m2 pokój ściana",
    href: "#",
  },
];

const categories = [
  {
    icon: "🚗",
    name: "Motoryzacja",
    description: "Spalanie, paliwo, podróże i koszty samochodu.",
    href: "/motoryzacja",
    count: 4,
  },
  {
    icon: "🏗️",
    name: "Budowa i remont",
    description: "Materiały, powierzchnie i ilości potrzebne na budowie.",
    href: "/budowa-remont",
    count: 5,
  },
  {
    icon: "💰",
    name: "Finanse",
    description: "VAT, marża, raty, procenty i codzienne finanse.",
    href: "#kalkulatory",
    count: 3,
  },
  {
    icon: "🏠",
    name: "Dom",
    description: "Prąd, ogrzewanie, powierzchnia i inne obliczenia.",
    href: "#kalkulatory",
    count: 3,
  },
];

const popular = calculators.slice(0, 5);

export default function Home() {
  const [search, setSearch] = useState("");

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return calculators.filter((calculator) =>
      `${calculator.name} ${calculator.description} ${calculator.category} ${calculator.keywords}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.12),_transparent_35%),radial-gradient(circle_at_top_left,_rgba(15,23,42,0.06),_transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24">

          <div className="mx-auto max-w-4xl text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              ⚡ Darmowe narzędzia online
            </div>


            <h1 className="mt-7 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Policz to.
              <span className="block text-blue-600">
                Dobrze.
              </span>
            </h1>


            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Kalkulatory, które pomagają szybko obliczyć koszty,
              ilości i wartości potrzebne w codziennym życiu.
            </p>


            <div className="mx-auto mt-9 max-w-3xl">

              <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-200/60 ring-1 ring-slate-100">

                <span className="px-4 text-xl">
                  🔎
                </span>


                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Co chcesz policzyć? np. paliwo, beton, VAT..."
                  className="w-full bg-transparent px-2 py-4 text-base outline-none placeholder:text-slate-400 sm:text-lg"
                />


                {search && (

                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mr-2 rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Wyczyść wyszukiwanie"
                  >
                    ✕
                  </button>

                )}


                <button
                  type="button"
                  onClick={() => {
                    document
                      .getElementById("kalkulatory")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hidden rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 sm:block"
                >
                  Szukaj
                </button>

              </div>


              <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">

                {[
                  ["Spalanie", "/motoryzacja/spalanie"],
                  ["Koszt przejazdu", "/motoryzacja/koszt-przejazdu"],
                  ["Beton", "/budowa-remont/beton"],
                ].map(([label, href]) => (

                  <Link
                    key={label}
                    href={href}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
                  >
                    {label}
                  </Link>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* SEARCH RESULTS */}
      {search.trim() && (

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">

          <div className="mb-6">

            <div className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Wyszukiwanie
            </div>

            <h2 className="mt-2 text-3xl font-black text-slate-950">
              Wyniki dla „{search}”
            </h2>

          </div>


          {results.length > 0 ? (

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {results.map((calculator) => (

                <Link
                  key={calculator.name}
                  href={calculator.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >

                  <div className="text-3xl">
                    {calculator.icon}
                  </div>

                  <h3 className="mt-4 font-bold text-slate-950 group-hover:text-blue-600">
                    {calculator.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {calculator.description}
                  </p>

                  <div className="mt-4 text-xs font-bold uppercase tracking-wider text-blue-600">
                    {calculator.category}
                  </div>

                </Link>

              ))}

            </div>

          ) : (

            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">

              <div className="text-4xl">
                🔎
              </div>

              <h3 className="mt-4 text-xl font-bold">
                Nie znaleźliśmy takiego kalkulatora
              </h3>

              <p className="mt-2 text-slate-500">
                Spróbuj innego hasła.
              </p>

            </div>

          )}

        </section>

      )}


      {/* CATEGORIES */}
      <section
        id="kalkulatory"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8"
      >

        <div className="max-w-2xl">

          <div className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Kategorie
          </div>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Wybierz, co chcesz policzyć
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Wszystkie narzędzia w jednym miejscu. Z czasem będziemy
            dodawać kolejne.
          </p>

        </div>


        <div className="mt-9 grid gap-5 md:grid-cols-2">

          {categories.map((category) => (

            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >

              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-50 blur-2xl transition group-hover:bg-blue-100" />


              <div className="relative flex items-start justify-between gap-5">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-3xl text-white">
                  {category.icon}
                </div>


                <div className="flex-1">

                  <h3 className="text-2xl font-black text-slate-950 group-hover:text-blue-600">
                    {category.name}
                  </h3>

                  <p className="mt-2 max-w-md leading-7 text-slate-500">
                    {category.description}
                  </p>

                </div>


                <div className="hidden text-2xl text-slate-300 transition group-hover:text-blue-600 sm:block">
                  →
                </div>

              </div>


              <div className="relative mt-7 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">

                <span className="font-semibold text-slate-500">
                  {category.count} narzędzia
                </span>

                <span className="font-bold text-blue-600">
                  Zobacz kategorię →
                </span>

              </div>

            </Link>

          ))}

        </div>

      </section>


      {/* POPULAR */}
      <section className="border-y border-slate-200 bg-white py-16">

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <div className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Na start
              </div>

              <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
                Najważniejsze kalkulatory
              </h2>

            </div>


            <Link
              href="#kalkulatory"
              className="font-bold text-blue-600 hover:text-blue-700"
            >
              Zobacz wszystkie →
            </Link>

          </div>


          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {popular.map((calculator) => (

              <Link
                key={calculator.name}
                href={calculator.href}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg"
              >

                <div className="text-3xl">
                  {calculator.icon}
                </div>

                <h3 className="mt-4 text-sm font-bold leading-5 text-slate-950 group-hover:text-blue-600">
                  {calculator.name}
                </h3>

                <div className="mt-4 text-xs font-bold text-blue-600">
                  Otwórz →
                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section
        id="jak-dziala"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8"
      >

        <div className="rounded-[2rem] bg-slate-950 px-7 py-10 text-white sm:px-10 sm:py-12">

          <div className="max-w-2xl">

            <div className="text-sm font-bold uppercase tracking-wider text-blue-300">
              Jak to działa?
            </div>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Bez konta. Bez kombinowania.
            </h2>

          </div>


          <div className="mt-10 grid gap-8 md:grid-cols-3">

            {[
              [
                "01",
                "Znajdź narzędzie",
                "Wyszukaj kalkulator lub wybierz kategorię.",
              ],
              [
                "02",
                "Wpisz dane",
                "Podaj kilka prostych wartości potrzebnych do obliczenia.",
              ],
              [
                "03",
                "Dostajesz wynik",
                "Wynik otrzymujesz od razu, bez rejestracji.",
              ],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="border-t border-white/10 pt-5"
              >

                <div className="text-sm font-black text-blue-300">
                  {number}
                </div>

                <h3 className="mt-3 text-xl font-bold">
                  {title}
                </h3>

                <p className="mt-2 leading-7 text-slate-400">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      <Footer />

    </main>
  );
}