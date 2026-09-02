"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

export default function KosztPaliwaPage() {
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [price, setPrice] = useState("");
  const [calculated, setCalculated] = useState(false);

  const km = parseNumber(distance);
  const lPer100 = parseNumber(consumption);
  const fuelPrice = parseNumber(price);

  const valid =
    km > 0 &&
    lPer100 > 0 &&
    fuelPrice > 0;

  const liters = valid
    ? (km * lPer100) / 100
    : 0;

  const totalCost = valid
    ? liters * fuelPrice
    : 0;

  const costPer100 = valid
    ? lPer100 * fuelPrice
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
      icon="💰"
      title="Kalkulator kosztu paliwa"
      description="Oblicz ilość potrzebnego paliwa, koszt 100 km oraz całkowity koszt przejazdu."
      categoryName="Motoryzacja"
      categoryHref="/motoryzacja"
      related={[
        {
          icon: "⛽",
          title: "Kalkulator spalania",
          href: "/motoryzacja/spalanie",
        },
        {
          icon: "🚗",
          title: "Kalkulator kosztu przejazdu",
          href: "/motoryzacja/koszt-przejazdu",
        },
        {
          icon: "🚘",
          title: "Kalkulator sprowadzenia auta",
          href: "/motoryzacja/sprowadzenie-auta",
        },
      ]}
    >
      <CalculatorTracker
        calculator="koszt-paliwa"
        isCalculated={calculated}
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        {/* FORMULARZ */}

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Dane przejazdu
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Podaj dystans, spalanie samochodu i cenę jednego
            litra paliwa.
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
                  placeholder="np. 500"
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
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="decimal"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
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
            Oblicz koszt paliwa
          </button>


          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-800">
            💡 Przecinek i kropka działają tak samo.
          </div>

        </div>


        {/* WYNIK */}

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
                  ⛽
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź dane i kliknij
                  <br />
                  „Oblicz koszt paliwa”.
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Całkowity koszt paliwa
                </div>

                <div className="mt-2 text-5xl font-extrabold">
                  {totalCost.toFixed(2)} zł
                </div>

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Potrzebne paliwo
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {liters.toFixed(2)} l
                  </div>

                </div>


                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Koszt 100 km
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {costPer100.toFixed(2)} zł
                  </div>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczyć koszt paliwa?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Aby obliczyć koszt paliwa, potrzebujesz znać dystans,
          średnie spalanie samochodu oraz cenę jednego litra paliwa.
        </p>


        <div className="mt-6 rounded-2xl bg-slate-50 p-5">

          <div className="font-semibold">
            Ilość potrzebnego paliwa:
          </div>

          <div className="mt-3 font-mono text-sm text-slate-600">
            paliwo = dystans × spalanie ÷ 100
          </div>


          <div className="mt-4 font-semibold">
            Koszt paliwa:
          </div>

          <div className="mt-3 font-mono text-sm text-slate-600">
            koszt = paliwo × cena za litr
          </div>

        </div>


        <h3 className="mt-8 text-xl font-bold">
          Przykład
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Dla dystansu 500 km, spalania 7,5 l/100 km oraz
          ceny 6,50 zł/l samochód potrzebuje 37,5 litra paliwa.
          Koszt wyniesie 243,75 zł.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">

          <div>

            <h4 className="font-semibold">
              Czy kalkulator działa dla benzyny, diesla i LPG?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. W każdym przypadku podajesz rzeczywiste spalanie
              oraz cenę paliwa za litr.
            </p>

          </div>


          <div>

            <h4 className="font-semibold">
              Czy mogę wpisać cenę 6,50?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Kalkulator obsługuje zarówno przecinek,
              jak i kropkę.
            </p>

          </div>

        </div>

      </div>

    </CalculatorLayout>
  );
}