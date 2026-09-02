"use client";

import Link from "next/link";
import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { parseNumber } from "@/lib/number";

export default function SpalaniePage() {
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");

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

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        {/* FORMULARZ */}

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Dane przejazdu
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Możesz używać przecinka lub kropki jako separatora
            dziesiętnego.
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
                  onChange={(e) => setDistance(e.target.value)}
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
                  onChange={(e) => setConsumption(e.target.value)}
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
                  onChange={(e) => setFuelPrice(e.target.value)}
                  placeholder="np. 6,50"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł/l
                </span>

              </div>

            </div>

          </div>


          <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5">

            <div className="font-semibold text-blue-900">
              💡 Przecinek lub kropka
            </div>

            <p className="mt-2 text-sm leading-6 text-blue-800">
              Możesz wpisać na przykład 7,5 albo 7.5.
              Kalkulator rozpozna oba zapisy.
            </p>

          </div>


          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <div className="font-semibold text-slate-900">
              📌 Skąd wziąć średnie spalanie?
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Możesz użyć wskazania komputera pokładowego
              albo średniego spalania obliczonego na podstawie
              tankowania.
            </p>

          </div>

        </div>


        {/* WYNIK */}

        <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold">
              Wynik
            </h2>

            {valid && (

              <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Gotowe
              </div>

            )}

          </div>


          {!valid ? (

            <div className="flex min-h-[390px] items-center justify-center text-center">

              <div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  🧮
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź dystans oraz średnie spalanie.
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


      {/* TREŚĆ */}

      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczyć koszt paliwa?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Znając dystans, średnie spalanie samochodu oraz cenę
          paliwa, możesz łatwo oszacować ilość potrzebnego paliwa
          i koszt przejazdu.
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
          Przykład
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Samochód ze spalaniem 7,5 l/100 km na trasie 520 km
          zużyje około 39 litrów paliwa. Przy cenie 6,50 zł/l
          koszt paliwa wyniesie około 253,50 zł.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">

          <div>

            <h4 className="font-semibold">
              Czy mogę wpisać 7,5 zamiast 7.5?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Kalkulator obsługuje zarówno przecinek,
              jak i kropkę.
            </p>

          </div>


          <div>

            <h4 className="font-semibold">
              Czy kalkulator działa dla LPG?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Wystarczy wpisać spalanie samochodu w litrach
              na 100 kilometrów oraz cenę LPG za litr.
            </p>

          </div>


          <div>

            <h4 className="font-semibold">
              Jak dokładnie obliczyć spalanie samochodu?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Najlepiej na podstawie tankowania do pełna.
              To pozwala wyznaczyć rzeczywiste średnie zużycie
              paliwa na podstawie przejechanego dystansu.
            </p>

          </div>

        </div>

      </div>

    </CalculatorLayout>
  );
}