"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { parseNumber } from "@/lib/number";

export default function PlytkiPage() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [tileLength, setTileLength] = useState("");
  const [tileWidth, setTileWidth] = useState("");
  const [reserve, setReserve] = useState("10");

  const areaLength = parseNumber(length);
  const areaWidth = parseNumber(width);
  const tileL = parseNumber(tileLength);
  const tileW = parseNumber(tileWidth);
  const reservePercent = parseNumber(reserve);

  const area =
    areaLength > 0 && areaWidth > 0
      ? areaLength * areaWidth
      : 0;

  const tileArea =
    tileL > 0 && tileW > 0
      ? (tileL / 100) * (tileW / 100)
      : 0;

  const valid =
    area > 0 &&
    tileArea > 0 &&
    reservePercent >= 0;

  const tilesWithoutReserve = valid
    ? Math.ceil(area / tileArea)
    : 0;

  const tilesWithReserve = valid
    ? Math.ceil(
        tilesWithoutReserve * (1 + reservePercent / 100),
      )
    : 0;

  const areaWithReserve = valid
    ? area * (1 + reservePercent / 100)
    : 0;

  return (
    <CalculatorLayout
      icon="🧱"
      title="Kalkulator płytek"
      description="Oblicz powierzchnię, liczbę potrzebnych płytek oraz zapas na docinki i uszkodzenia."
      categoryName="Budowa i remont"
      categoryHref="/budowa-remont"
      related={[
        {
          icon: "🎨",
          title: "Kalkulator farby",
          href: "/budowa-remont/farba",
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
            Powierzchnia
          </h2>

          <div className="mt-7 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Długość powierzchni
              </label>

              <input
                type="text"
                inputMode="decimal"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="np. 4"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Szerokość powierzchni
              </label>

              <input
                type="text"
                inputMode="decimal"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="np. 3"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>


            <div className="border-t border-slate-200 pt-5">

              <div className="mb-4 font-semibold">
                Rozmiar jednej płytki
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Długość
                  </label>

                  <div className="relative">

                    <input
                      type="text"
                      inputMode="decimal"
                      value={tileLength}
                      onChange={(e) => setTileLength(e.target.value)}
                      placeholder="np. 60"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500"
                    />

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                      cm
                    </span>

                  </div>
                </div>


                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Szerokość
                  </label>

                  <div className="relative">

                    <input
                      type="text"
                      inputMode="decimal"
                      value={tileWidth}
                      onChange={(e) => setTileWidth(e.target.value)}
                      placeholder="np. 60"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500"
                    />

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                      cm
                    </span>

                  </div>
                </div>

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
                  placeholder="np. 10"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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

            <div className="flex min-h-[430px] items-center justify-center text-center">

              <div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  🧱
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź wymiary powierzchni
                  <br />
                  i płytki.
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Powierzchnia
                </div>

                <div className="mt-2 text-4xl font-extrabold">
                  {area.toFixed(2)} m²
                </div>

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Bez zapasu
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {tilesWithoutReserve} szt.
                  </div>

                </div>


                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Z zapasem
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {tilesWithReserve} szt.
                  </div>

                </div>

              </div>


              <div className="rounded-2xl bg-blue-500/10 p-5">

                <div className="text-sm text-blue-200">
                  Powierzchnia z zapasem
                </div>

                <div className="mt-1 text-xl font-bold text-blue-100">
                  {areaWithReserve.toFixed(2)} m²
                </div>

              </div>

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczyć liczbę płytek?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Najpierw oblicz powierzchnię do wykończenia, a następnie
          podziel ją przez powierzchnię jednej płytki. Warto doliczyć
          zapas na docinki, dopasowanie wzoru oraz ewentualne uszkodzenia.
        </p>

      </div>

    </CalculatorLayout>
  );
}