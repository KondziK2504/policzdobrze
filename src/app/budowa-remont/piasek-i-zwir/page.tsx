"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { parseNumber } from "@/lib/number";

export default function PiasekZwirPage() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [density, setDensity] = useState("1.6");
  const [reserve, setReserve] = useState("10");

  const l = parseNumber(length);
  const w = parseNumber(width);
  const h = parseNumber(height);
  const densityValue = parseNumber(density);
  const reservePercent = parseNumber(reserve);

  const volume =
    l > 0 && w > 0 && h > 0
      ? l * w * h
      : 0;

  const valid =
    volume > 0 &&
    densityValue > 0 &&
    reservePercent >= 0;

  const volumeWithReserve = valid
    ? volume * (1 + reservePercent / 100)
    : 0;

  const estimatedWeight = valid
    ? volumeWithReserve * densityValue
    : 0;

  return (
    <CalculatorLayout
      icon="🪨"
      title="Kalkulator piasku i żwiru"
      description="Oblicz orientacyjną objętość i masę piasku, żwiru lub innego kruszywa."
      categoryName="Budowa i remont"
      categoryHref="/budowa-remont"
      related={[
        {
          icon: "🏗️",
          title: "Kalkulator betonu",
          href: "/budowa-remont/beton",
        },
        {
          icon: "🧱",
          title: "Kalkulator kostki brukowej",
          href: "/budowa-remont/kostka-brukowa",
        },
        {
          icon: "🧱",
          title: "Kalkulator cementu",
          href: "/budowa-remont/cement",
        },
      ]}
    >
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Wymiary
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Możesz wpisywać wartości z przecinkiem lub kropką.
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
                  placeholder="np. 10"
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
                  placeholder="np. 5"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  m
                </span>
              </div>
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Grubość warstwy
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="np. 0.15"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  m
                </span>
              </div>
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Gęstość materiału
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={density}
                  onChange={(e) => setDensity(e.target.value)}
                  placeholder="np. 1.6"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-20 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  t/m³
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Gęstość zależy od rodzaju i wilgotności materiału.
              </p>
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

            <div className="flex min-h-[420px] items-center justify-center text-center">

              <div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  🪨
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź wymiary,
                  <br />
                  aby rozpocząć obliczenia.
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Objętość z zapasem
                </div>

                <div className="mt-2 text-4xl font-extrabold">
                  {volumeWithReserve.toFixed(2)} m³
                </div>

              </div>


              <div className="rounded-2xl bg-white/10 p-5">

                <div className="text-sm text-slate-300">
                  Orientacyjna masa
                </div>

                <div className="mt-1 text-3xl font-bold">
                  {estimatedWeight.toFixed(2)} t
                </div>

              </div>


              <div className="rounded-2xl bg-blue-500/10 p-5">

                <div className="text-sm text-blue-200">
                  Objętość bez zapasu
                </div>

                <div className="mt-1 text-xl font-bold text-blue-100">
                  {volume.toFixed(2)} m³
                </div>

              </div>


              <p className="text-sm leading-6 text-slate-400">
                Wynik jest orientacyjny. Rzeczywista masa może się
                różnić w zależności od rodzaju kruszywa, wilgotności
                i sposobu zagęszczenia.
              </p>

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczyć ilość piasku lub żwiru?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Najpierw oblicz objętość, mnożąc długość, szerokość
          i grubość warstwy. Następnie można uwzględnić zapas
          oraz przyjąć orientacyjną gęstość materiału, aby
          oszacować jego masę.
        </p>


        <div className="mt-6 rounded-2xl bg-slate-50 p-5">

          <div className="font-semibold">
            Wzór:
          </div>

          <div className="mt-3 font-mono text-sm text-slate-600">
            objętość = długość × szerokość × grubość
          </div>

          <div className="mt-2 font-mono text-sm text-slate-600">
            masa = objętość × gęstość
          </div>

        </div>


        <h3 className="mt-8 text-xl font-bold">
          Przecinek czy kropka?
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Kalkulator obsługuje oba sposoby zapisu liczb.
          Możesz wpisać na przykład <strong>0,15</strong> albo{" "}
          <strong>0.15</strong>.
        </p>

      </div>

    </CalculatorLayout>
  );
}