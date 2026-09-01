"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";

export default function BetonPage() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const l = Number(length);
  const w = Number(width);
  const h = Number(height);

  const valid = l > 0 && w > 0 && h > 0;

  const volume = valid ? l * w * h : 0;
  const volumeWithReserve = valid ? volume * 1.1 : 0;

  return (
    <CalculatorLayout
      icon="🏗️"
      title="Kalkulator betonu"
      description="Oblicz, ile betonu potrzebujesz do fundamentu, posadzki, płyty lub innej konstrukcji."
    >

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Wymiary
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Podaj wymiary elementu w metrach.
          </p>


          <div className="mt-7 space-y-5">

            <div>

              <label className="mb-2 block text-sm font-medium">
                Długość
              </label>

              <div className="relative">

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="np. 10"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  m
                </span>

              </div>

            </div>


            <div>

              <label className="mb-2 block text-sm font-medium">
                Szerokość
              </label>

              <div className="relative">

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="np. 5"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  m
                </span>

              </div>

            </div>


            <div>

              <label className="mb-2 block text-sm font-medium">
                Wysokość / grubość
              </label>

              <div className="relative">

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="np. 0.15"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  m
                </span>

              </div>

            </div>

          </div>

        </div>


        <div className="rounded-3xl bg-slate-900 p-7 text-white">

          <h2 className="text-xl font-bold">
            Wynik
          </h2>


          {!valid ? (

            <div className="flex min-h-[300px] items-center justify-center text-center">

              <div>

                <div className="text-5xl">
                  🧱
                </div>

                <p className="mt-4 text-slate-300">
                  Wprowadź wymiary,
                  <br />
                  aby obliczyć ilość betonu.
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-7">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Potrzebna objętość
                </div>

                <div className="mt-2 text-5xl font-extrabold">
                  {volume.toFixed(2)} m³
                </div>

              </div>


              <div className="mt-4 rounded-2xl bg-white/10 p-5">

                <div className="text-sm text-slate-300">
                  Zalecana ilość z 10% zapasem
                </div>

                <div className="mt-1 text-2xl font-bold">
                  {volumeWithReserve.toFixed(2)} m³
                </div>

              </div>


              <div className="mt-6 border-t border-white/10 pt-5">

                <p className="text-sm leading-6 text-slate-300">
                  10% zapasu uwzględnia możliwe straty,
                  nierówności podłoża oraz niewielkie różnice
                  podczas wykonywania prac.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczyć ilość betonu?
        </h2>

        <p className="mt-4 leading-7 text-slate-600">
          Aby obliczyć objętość betonu, należy pomnożyć
          długość przez szerokość oraz wysokość lub grubość
          elementu.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5">

          <div className="font-semibold">
            Wzór:
          </div>

          <div className="mt-3 font-mono text-sm text-slate-600">
            długość × szerokość × wysokość = objętość betonu
          </div>

        </div>

      </div>

    </CalculatorLayout>
  );
}