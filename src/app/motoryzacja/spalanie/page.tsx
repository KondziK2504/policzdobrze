"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

export default function SpalaniePage() {
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [calculated, setCalculated] = useState(false);

  const km = parseNumber(distance);
  const lPer100 = parseNumber(consumption);
  const price = parseNumber(fuelPrice);

  const valid = km > 0 && lPer100 > 0;

  const litersNeeded = valid
    ? (km * lPer100) / 100
    : 0;

  const costPer100 =
    valid && price > 0
      ? lPer100 * price
      : 0;

  const totalCost =
    valid && price > 0
      ? litersNeeded * price
      : 0;

  function handleCalculate() {
    if (!valid) {
      setCalculated(false);
      return;
    }

    setCalculated(true);
  }

  return (
    <CalculatorLayout
      icon="⛽"
      title="Kalkulator spalania samochodu"
      description="Sprawdź koszt paliwa na podstawie dystansu, średniego spalania i ceny paliwa."
      categoryName="Motoryzacja"
      categoryHref="/motoryzacja"
      related={[
        {
          icon: "🚗",
          title: "Kalkulator kosztu przejazdu",
          href: "/motoryzacja/koszt-przejazdu",
        },
        {
          icon: "💰",
          title: "Kalkulator kosztu paliwa",
          href: "/motoryzacja/koszt-paliwa",
        },
        {
          icon: "🚘",
          title: "Kalkulator sprowadzenia auta",
          href: "/motoryzacja/sprowadzenie-auta",
        },
      ]}
    >
      <CalculatorTracker
        calculator="spalanie"
        isCalculated={calculated}
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Dane przejazdu
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Możesz używać przecinka lub kropki jako separatora dziesiętnego.
          </p>

          <div className="mt-7 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Dystans
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={distance}
                  onChange={(e) => {
                    setDistance(e.target.value);
                    setCalculated(false);
                  }}
                  placeholder="np. 520"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  km
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Średnie spalanie
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={consumption}
                  onChange={(e) => {
                    setConsumption(e.target.value);
                    setCalculated(false);
                  }}
                  placeholder="np. 7,5"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-24 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  l/100 km
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Cena paliwa
                <span className="ml-2 font-normal text-slate-400">
                  opcjonalnie
                </span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={fuelPrice}
                  onChange={(e) => {
                    setFuelPrice(e.target.value);
                    setCalculated(false);
                  }}
                  placeholder="np. 6,50"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł/l
                </span>
              </div>
            </div>

          </div>

          <button
            type="button"
            onClick={handleCalculate}
            disabled={!valid}
            className="mt-7 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Oblicz
          </button>

        </div>

        <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              Wynik
            </h2>

            {calculated && (
              <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Gotowe
              </div>
            )}
          </div>

          {!calculated ? (

            <div className="flex min-h-[390px] items-center justify-center text-center">

              <div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  🧮
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź dane i kliknij „Oblicz”.
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-7">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Średnie spalanie
                </div>

                <div className="mt-2 text-5xl font-extrabold tracking-tight">
                  {lPer100.toFixed(2)}

                  <span className="ml-2 text-xl font-medium text-slate-300">
                    l/100 km
                  </span>
                </div>

              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Dystans
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {km.toFixed(1)} km
                  </div>

                </div>

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Potrzebne paliwo
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {litersNeeded.toFixed(2)} l
                  </div>

                </div>

              </div>

              {price > 0 && (

                <div className="mt-5 border-t border-white/10 pt-5">

                  <div className="flex items-center justify-between py-2">

                    <span className="text-slate-300">
                      Koszt 100 km
                    </span>

                    <strong className="text-lg">
                      {costPer100.toFixed(2)} zł
                    </strong>

                  </div>

                  <div className="flex items-center justify-between py-2">

                    <span className="text-slate-300">
                      Koszt całego przejazdu
                    </span>

                    <strong className="text-lg">
                      {totalCost.toFixed(2)} zł
                    </strong>

                  </div>

                </div>

              )}

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczyć koszt paliwa?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Znając dystans, średnie spalanie samochodu oraz cenę paliwa,
          możesz oszacować ilość potrzebnego paliwa i koszt całego przejazdu.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5">

          <div className="font-semibold">
            Wzór na ilość paliwa:
          </div>

          <div className="mt-3 font-mono text-sm text-slate-600">
            paliwo = dystans × spalanie ÷ 100
          </div>

          <div className="mt-4 font-semibold">
            Wzór na koszt:
          </div>

          <div className="mt-3 font-mono text-sm text-slate-600">
            koszt = ilość paliwa × cena paliwa
          </div>

        </div>

        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">

          <div>

            <h4 className="font-semibold">
              Czy mogę wpisać 7,5 zamiast 7.5?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Kalkulator obsługuje oba sposoby zapisu liczb.
            </p>

          </div>

          <div>

            <h4 className="font-semibold">
              Czy kalkulator działa dla LPG?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Podaj spalanie LPG oraz cenę gazu za litr.
            </p>

          </div>

        </div>

      </div>

    </CalculatorLayout>
  );
}