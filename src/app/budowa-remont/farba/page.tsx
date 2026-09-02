"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { parseNumber } from "@/lib/number";

export default function FarbaPage() {
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [doorsWindows, setDoorsWindows] = useState("");
  const [coverage, setCoverage] = useState("10");
  const [coats, setCoats] = useState("2");

  const l = parseNumber(length);
  const h = parseNumber(height);
  const openings = parseNumber(doorsWindows);
  const coverageValue = parseNumber(coverage);
  const coatsValue = parseNumber(coats);

  const wallArea = l > 0 && h > 0
    ? l * h
    : 0;

  const paintArea = Math.max(wallArea - Math.max(openings, 0), 0);

  const valid =
    paintArea > 0 &&
    coverageValue > 0 &&
    coatsValue > 0;

  const totalPaint = valid
    ? (paintArea * coatsValue) / coverageValue
    : 0;

  const recommendedLiters = valid
    ? Math.ceil(totalPaint)
    : 0;

  return (
    <CalculatorLayout
      icon="🎨"
      title="Kalkulator farby"
      description="Oblicz orientacyjną ilość farby potrzebnej do pomalowania ściany."
      categoryName="Budowa i remont"
      categoryHref="/budowa-remont"
      related={[
        {
          icon: "🧱",
          title: "Kalkulator płytek",
          href: "/budowa-remont/plytki",
        },
        {
          icon: "🧱",
          title: "Kalkulator kostki brukowej",
          href: "/budowa-remont/kostka-brukowa",
        },
        {
          icon: "🏗️",
          title: "Kalkulator betonu",
          href: "/budowa-remont/beton",
        },
      ]}
    >

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Dane powierzchni
          </h2>

          <div className="mt-7 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Długość ściany
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="np. 5"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  m
                </span>
              </div>
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Wysokość ściany
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="np. 2.7"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  m
                </span>
              </div>
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Drzwi i okna
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={doorsWindows}
                  onChange={(e) => setDoorsWindows(e.target.value)}
                  placeholder="np. 3.5"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-16 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  m²
                </span>
              </div>
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Wydajność farby
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={coverage}
                  onChange={(e) => setCoverage(e.target.value)}
                  placeholder="np. 10"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-20 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  m²/l
                </span>
              </div>
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Liczba warstw
              </label>

              <input
                type="text"
                inputMode="numeric"
                value={coats}
                onChange={(e) => setCoats(e.target.value)}
                placeholder="np. 2"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

          </div>

        </div>


        <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">

          <h2 className="text-xl font-bold">
            Wynik
          </h2>

          {!valid ? (

            <div className="flex min-h-[430px] items-center justify-center text-center">

              <div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  🎨
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź dane powierzchni,
                  <br />
                  aby obliczyć ilość farby.
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Powierzchnia do malowania
                </div>

                <div className="mt-2 text-4xl font-extrabold">
                  {paintArea.toFixed(2)} m²
                </div>

              </div>


              <div className="rounded-2xl bg-white/10 p-5">

                <div className="text-sm text-slate-300">
                  Potrzebna ilość farby
                </div>

                <div className="mt-1 text-3xl font-bold">
                  {totalPaint.toFixed(2)} l
                </div>

              </div>


              <div className="rounded-2xl bg-blue-500/10 p-5">

                <div className="text-sm text-blue-200">
                  Orientacyjna liczba pełnych litrów
                </div>

                <div className="mt-1 text-xl font-bold text-blue-100">
                  {recommendedLiters} l
                </div>

              </div>

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczyć ilość farby?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Powierzchnię ściany oblicza się, mnożąc jej długość
          przez wysokość. Następnie odejmuje się większe otwory,
          takie jak drzwi i okna. Wynik zależy również od
          wydajności farby oraz liczby warstw.
        </p>

      </div>

    </CalculatorLayout>
  );
}