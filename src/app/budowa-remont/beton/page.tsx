"use client";

import Link from "next/link";
import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";

function parseValue(value: string) {
  return Number(value.replace(",", "."));
}

export default function BetonPage() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [calculated, setCalculated] = useState(false);

  const l = parseValue(length);
  const w = parseValue(width);
  const h = parseValue(height);

  const valid = l > 0 && w > 0 && h > 0;

  const volume = valid ? l * w * h : 0;
  const volumeWithReserve = valid ? volume * 1.1 : 0;

  function handleCalculate() {
    if (!valid) {
      setCalculated(false);
      return;
    }

    setCalculated(true);
  }

  function handleReset() {
    setLength("");
    setWidth("");
    setHeight("");
    setCalculated(false);
  }

  return (
    <CalculatorLayout
      icon="🏗️"
      title="Kalkulator betonu"
      description="Oblicz, ile betonu potrzebujesz do fundamentu, posadzki, płyty lub innej konstrukcji."
      categoryName="Budowa i remont"
      categoryHref="/budowa-remont"
      related={[
        {
          icon: "🧱",
          title: "Kalkulator kostki brukowej",
          href: "/budowa-remont/kostka-brukowa",
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
      <CalculatorTracker
        calculator="beton"
        isCalculated={calculated}
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Wymiary konstrukcji
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Podaj długość, szerokość oraz grubość elementu w metrach.
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
                  onChange={(e) => {
                    setLength(e.target.value);
                    setCalculated(false);
                  }}
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
                  onChange={(e) => {
                    setWidth(e.target.value);
                    setCalculated(false);
                  }}
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
                Grubość / wysokość
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="decimal"
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                    setCalculated(false);
                  }}
                  placeholder="np. 0,15"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  m
                </span>

              </div>
            </div>

          </div>


          <div className="mt-7 grid gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={handleCalculate}
              disabled={!valid}
              className="rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Oblicz ilość betonu
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Wyczyść
            </button>

          </div>


          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-800">
            💡 Możesz używać przecinka lub kropki jako separatora
            dziesiętnego.
          </div>

        </div>


        <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">

          <h2 className="text-xl font-bold">
            Wynik
          </h2>

          {!calculated ? (

            <div className="flex min-h-[420px] items-center justify-center text-center">

              <div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  🏗️
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź wymiary i kliknij
                  <br />
                  „Oblicz ilość betonu”.
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Potrzebna objętość
                </div>

                <div className="mt-2 text-5xl font-extrabold">
                  {volume.toFixed(2)} m³
                </div>

              </div>


              <div className="rounded-2xl bg-white/10 p-5">

                <div className="text-sm text-slate-300">
                  Zalecana ilość z 10% zapasem
                </div>

                <div className="mt-1 text-2xl font-bold">
                  {volumeWithReserve.toFixed(2)} m³
                </div>

              </div>


              <div className="rounded-2xl bg-blue-500/10 p-5">

                <div className="text-sm text-blue-200">
                  Wymiary
                </div>

                <div className="mt-1 text-lg font-bold">
                  {l} × {w} × {h} m
                </div>

              </div>


              <p className="text-sm leading-6 text-slate-400">
                Zapas jest orientacyjny i może być różny w zależności
                od dokładności wymiarów, podłoża oraz sposobu wykonania.
              </p>

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczyć ilość betonu?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Ilość betonu oblicza się na podstawie objętości konstrukcji.
          Wystarczy pomnożyć długość, szerokość oraz wysokość lub
          grubość elementu.
        </p>


        <div className="mt-6 rounded-2xl bg-slate-50 p-5">

          <div className="font-semibold">
            Wzór:
          </div>

          <div className="mt-3 font-mono text-sm text-slate-600">
            długość × szerokość × wysokość = objętość betonu
          </div>

        </div>


        <h3 className="mt-8 text-xl font-bold">
          Przykład
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Dla elementu o wymiarach 10 × 5 × 0,15 m potrzebujesz
          7,50 m³ betonu. Przy założeniu 10% zapasu będzie to około
          8,25 m³.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          Ile betonu zamówić?
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          W praktyce warto uwzględnić pewien zapas ze względu na
          nierówności podłoża, dokładność pomiarów i straty podczas
          wykonywania prac. Wielkość zapasu należy dopasować
          do konkretnej konstrukcji.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          Powiązane kalkulatory
        </h3>

        <p className="mt-3 leading-7 text-slate-600">
          Przy planowaniu budowy lub remontu mogą przydać się również
          kalkulatory materiałów wykończeniowych i nawierzchni.
        </p>


        <div className="mt-5 flex flex-wrap gap-3">

          <Link
            href="/budowa-remont/kostka-brukowa"
            className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Kostka brukowa
          </Link>

          <Link
            href="/budowa-remont/farba"
            className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Farba
          </Link>

          <Link
            href="/budowa-remont/plytki"
            className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Płytki
          </Link>

        </div>


        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">

          <div>
            <h4 className="font-semibold">
              Czy kalkulator działa dla posadzki?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Wystarczy podać długość, szerokość oraz grubość
              posadzki w metrach.
            </p>
          </div>


          <div>
            <h4 className="font-semibold">
              Czy wynik uwzględnia zapas?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Kalkulator pokazuje zarówno objętość wynikającą
              z wymiarów, jak i wariant z dodatkowym 10% zapasem.
            </p>
          </div>


          <div>
            <h4 className="font-semibold">
              Czy mogę wpisać grubość 15 cm?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Wpisz 0,15 m albo 0.15 m.
            </p>
          </div>

        </div>

      </div>
    </CalculatorLayout>
  );
}