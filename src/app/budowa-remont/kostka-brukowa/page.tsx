"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { parseNumber } from "@/lib/number";

export default function KostkaBrukowaPage() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [piecesPerM2, setPiecesPerM2] = useState("36");
  const [reserve, setReserve] = useState("7");

  const l = parseNumber(length);
  const w = parseNumber(width);
  const pieces = parseNumber(piecesPerM2);
  const reservePercent = parseNumber(reserve);

  const valid = l > 0 && w > 0 && pieces > 0;

  const area = valid ? l * w : 0;
  const areaWithReserve = valid
    ? area * (1 + reservePercent / 100)
    : 0;

  const estimatedPieces = valid
    ? Math.ceil(areaWithReserve * pieces)
    : 0;

  return (
    <CalculatorLayout
      icon="🧱"
      title="Kalkulator kostki brukowej"
      description="Oblicz powierzchnię, ilość kostki brukowej oraz orientacyjny zapas potrzebny na podjazd, chodnik lub taras."
      categoryName="Budowa i remont"
      categoryHref="/budowa-remont"
      related={[
        {
          icon: "🏗️",
          title: "Kalkulator betonu",
          href: "/budowa-remont/beton",
        },
        {
          icon: "🎨",
          title: "Kalkulator farby",
          href: "/budowa-remont/farba",
        },
        {
          icon: "🧱",
          title: "Kalkulator płytek",
          href: "/budowa-remont/plytki",
        },
      ]}
    >
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Wymiary powierzchni
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Podaj wymiary obszaru oraz orientacyjną liczbę sztuk
            kostki przypadającą na 1 m².
          </p>

          <div className="mt-7 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Długość
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="np. 12"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  m
                </span>
              </div>
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Szerokość
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="np. 4"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  m
                </span>
              </div>
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Liczba sztuk kostki na 1 m²
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={piecesPerM2}
                  onChange={(e) => setPiecesPerM2(e.target.value)}
                  placeholder="np. 36"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-16 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  szt.
                </span>
              </div>
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Zapas
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={reserve}
                  onChange={(e) => setReserve(e.target.value)}
                  placeholder="np. 7"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  %
                </span>
              </div>
            </div>

          </div>

        </div>


        <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">

          <h2 className="text-xl font-bold">
            Wynik
          </h2>

          {!valid ? (
            <div className="flex min-h-[390px] items-center justify-center text-center">
              <div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  🧱
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź wymiary powierzchni,
                  <br />
                  aby rozpocząć obliczenia.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-7 space-y-4">

              <div className="rounded-2xl bg-white/10 p-6">
                <div className="text-sm text-slate-300">
                  Powierzchnia
                </div>

                <div className="mt-2 text-5xl font-extrabold">
                  {area.toFixed(2)} m²
                </div>
              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-white/10 p-5">
                  <div className="text-sm text-slate-300">
                    Powierzchnia z zapasem
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {areaWithReserve.toFixed(2)} m²
                  </div>
                </div>


                <div className="rounded-2xl bg-white/10 p-5">
                  <div className="text-sm text-slate-300">
                    Orientacyjna liczba sztuk
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {estimatedPieces.toLocaleString("pl-PL")} szt.
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczyć ilość kostki brukowej?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Najpierw oblicz powierzchnię podjazdu, chodnika
          lub tarasu. Następnie pomnóż ją przez liczbę sztuk
          kostki przypadającą na 1 m². W praktyce warto doliczyć
          zapas na docinki i ewentualne uszkodzenia.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5">
          <div className="font-semibold">
            Wzór:
          </div>

          <div className="mt-3 font-mono text-sm text-slate-600">
            powierzchnia = długość × szerokość
          </div>

          <div className="mt-2 font-mono text-sm text-slate-600">
            sztuki = powierzchnia × sztuki na m²
          </div>
        </div>

      </div>
    </CalculatorLayout>
  );
}