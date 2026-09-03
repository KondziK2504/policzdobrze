"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { calculators } from "@/data/calculators";

const categories = [
  {
    icon: "🚗",
    name: "Motoryzacja",
    description:
      "Spalanie, paliwo, podróże i koszty samochodu.",
    href: "/motoryzacja",
  },
  {
    icon: "🏗️",
    name: "Budowa i remont",
    description:
      "Materiały, powierzchnie i ilości potrzebne podczas prac.",
    href: "/budowa-remont",
  },
  {
    icon: "💰",
    name: "Finanse",
    description:
      "VAT, marża, narzut, procenty i raty.",
    href: "/finanse",
  },
  {
    icon: "🏠",
    name: "Dom",
    description:
      "Prąd, ogrzewanie, powierzchnia i koszty domu.",
    href: "#kalkulatory",
  },
];

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

  const activePopular = calculators
    .filter((calculator) => calculator.status === "active")
    .slice(0, 8);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      <Header />

      <section className="relative overflow-hidden border-b border-slate-200 bg-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.14),_transparent_35%),radial-gradient(circle_at_top_left,_rgba(15,23,42,0.06),_transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-24">

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

              <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-200/60">

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
                    className="mr-2 rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100"
                  >
                    ✕
                  </button>
                )}

              </div>


              <div className="mt-4 flex flex-wrap justify-center gap-2">

                {[
                  ["Spalanie", "/motoryzacja/spalanie"],
                  ["Koszt przejazdu", "/motoryzacja/koszt-przejazdu"],
                  ["Beton", "/budowa-remont/beton"],
                  ["VAT", "/finanse/vat"],
                  ["Marża", "/finanse/marza"],
                ].map(([label, href]) => (

                  <Link
                    key={label}
                    href={href}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
                  >
                    {label}
                  </Link>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {search.trim() && (

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">

          <div className="mb-7">

            <div className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Wyszukiwanie
            </div>

            <h2 className="mt-2 text-3xl font-black text-slate-950">
              Wyniki dla „{search}”
            </h2>

          </div>


          {results.length > 0 ? (

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {results.map((calculator) => {

                const active =
                  calculator.status === "active";

                if (!active) {

                  return (
                    <div
                      key={calculator.name}
                      className="rounded-2xl border border-slate-200 bg-white p-6 opacity-70"
                    >

                      <div className="text-3xl">
                        {calculator.icon}
                      </div>

                      <h3 className="mt-4 font-bold">
                        {calculator.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {calculator.description}
                      </p>

                      <div className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Wkrótce
                      </div>

                    </div>
                  );
                }

                return (
                  <Link
                    key={calculator.name}
                    href={calculator.href}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                  >

                    <div className="text-3xl">
                      {calculator.icon}
                    </div>

                    <h3 className="mt-4 font-bold group-hover:text-blue-600">
                      {calculator.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {calculator.description}
                    </p>

                    <div className="mt-4 text-xs font-bold uppercase tracking-wider text-blue-600">
                      {calculator.category}
                    </div>

                  </Link>
                );
              })}

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
            Wszystkie narzędzia w jednym miejscu.
          </p>

        </div>


        <div className="mt-9 grid gap-5 md:grid-cols-2">

          {categories.map((category) => {

            const count = calculators.filter(
              (calculator) =>
                calculator.category === category.name,
            ).length;

            const activeCount = calculators.filter(
              (calculator) =>
                calculator.category === category.name &&
                calculator.status === "active",
            ).length;

            return (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >

                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-50 blur-3xl" />


                <div className="relative flex items-start gap-5">

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

                  <div className="hidden text-2xl text-slate-300 group-hover:text-blue-600 sm:block">
                    →
                  </div>

                </div>


                <div className="relative mt-7 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">

                  <span className="font-semibold text-slate-500">
                    {activeCount > 0
                      ? `${activeCount} aktywne`
                      : "W przygotowaniu"}
                  </span>

                  <span className="font-bold text-blue-600">
                    {count} narzędzi →
                  </span>

                </div>

              </Link>
            );

          })}

        </div>

      </section>


      <section className="border-y border-slate-200 bg-white py-16">

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div>

            <div className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Na start
            </div>

            <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
              Najważniejsze kalkulatory
            </h2>

          </div>


          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {activePopular.map((calculator) => (

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
                "Wyszukaj kalkulator albo wybierz kategorię.",
              ],
              [
                "02",
                "Wpisz dane",
                "Podaj kilka wartości potrzebnych do obliczenia.",
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