"use client";

import CalculatorLayout from "@/components/CalculatorLayout";
import { useState } from "react";

export default function KosztPaliwaPage() {
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [price, setPrice] = useState("");

  const km = Number(distance);
  const fuel = Number(consumption);
  const fuelPrice = Number(price);

  const valid = km > 0 && fuel > 0 && fuelPrice > 0;

  const liters = valid ? (km * fuel) / 100 : 0;
  const totalCost = valid ? liters * fuelPrice : 0;
  const costPer100 = valid ? fuel * fuelPrice : 0;

  return (
    <CalculatorLayout
      icon="💰"
      title="Kalkulator kosztu paliwa"
      description="Oblicz, ile paliwa potrzebujesz i ile będzie kosztować przejazd wybranej trasy."
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

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Dane przejazdu
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Podaj dystans, średnie spalanie oraz cenę jednego
            litra paliwa.
          </p>


          <div className="mt-7 space-y-5">

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Dystans
              </label>

              <div className="relative">

                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="np. 500"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  km
                </span>

              </div>

            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold">
                Spalanie
              </label>

              <div className="relative">

                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={consumption}
                  onChange={(e) => setConsumption(e.target.value)}
                  placeholder="np. 7.0"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-24 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="np. 6.50"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł/l
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

            <div className="flex min-h-[360px] items-center justify-center text-center">

              <div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  ⛽
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź dane przejazdu,
                  <br />
                  aby zobaczyć wynik.
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
          Do obliczenia kosztu paliwa potrzebujesz znać
          dystans przejazdu, średnie spalanie samochodu
          oraz aktualną cenę jednego litra paliwa.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5">

          <div className="font-semibold">
            Wzór:
          </div>

          <div className="mt-3 font-mono text-sm text-slate-600">
            ilość paliwa = dystans × spalanie ÷ 100
          </div>

          <div className="mt-2 font-mono text-sm text-slate-600">
            koszt = ilość paliwa × cena paliwa
          </div>

        </div>


        <h3 className="mt-8 text-xl font-bold">
          Przykład
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Przy dystansie 500 km, spalaniu 7 l/100 km
          i cenie paliwa 6,50 zł/l samochód potrzebuje
          około 35 litrów paliwa, a koszt przejazdu wyniesie
          227,50 zł.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">

          <div>

            <h4 className="font-semibold">
              Czy kalkulator uwzględnia podróż w obie strony?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              W tym kalkulatorze podajesz całkowity dystans,
              dlatego wystarczy wpisać od razu trasę tam i z powrotem.
            </p>

          </div>

        </div>

      </div>

    </CalculatorLayout>
  );
}