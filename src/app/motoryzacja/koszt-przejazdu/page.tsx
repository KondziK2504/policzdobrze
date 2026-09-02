"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

export default function KosztPrzejazduPage() {
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [people, setPeople] = useState("1");
  const [roundTrip, setRoundTrip] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const km = parseNumber(distance);
  const lPer100 = parseNumber(consumption);
  const price = parseNumber(fuelPrice);
  const persons = parseNumber(people);

  const valid =
    km > 0 &&
    lPer100 > 0 &&
    price > 0 &&
    persons >= 1;

  const totalDistance = roundTrip ? km * 2 : km;

  const litersNeeded = valid
    ? (totalDistance * lPer100) / 100
    : 0;

  const totalCost = valid
    ? litersNeeded * price
    : 0;

  const costPer100 = valid
    ? lPer100 * price
    : 0;

  const costPerPerson = valid
    ? totalCost / persons
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
      icon="🚗"
      title="Kalkulator kosztu przejazdu"
      description="Oblicz koszt paliwa, ilość potrzebnego paliwa oraz koszt podróży na jedną osobę."
      categoryName="Motoryzacja"
      categoryHref="/motoryzacja"
      related={[
        {
          icon: "⛽",
          title: "Kalkulator spalania",
          href: "/motoryzacja/spalanie",
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
        calculator="koszt-przejazdu"
        isCalculated={calculated}
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        {/* FORMULARZ */}

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Dane przejazdu
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Podaj dystans, spalanie oraz cenę paliwa.
            Możesz używać przecinka albo kropki.
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


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Liczba osób
              </label>

              <input
                type="text"
                inputMode="numeric"
                value={people}
                onChange={(e) => {
                  setPeople(e.target.value);
                  setCalculated(false);
                }}
                placeholder="np. 2"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>


            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100">

              <input
                type="checkbox"
                checked={roundTrip}
                onChange={(e) => {
                  setRoundTrip(e.target.checked);
                  setCalculated(false);
                }}
                className="h-5 w-5 accent-blue-600"
              />

              <div>
                <div className="font-semibold">
                  Podróż w obie strony
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  Podany dystans zostanie podwojony.
                </div>
              </div>

            </label>

          </div>


          <button
            type="button"
            onClick={handleCalculate}
            disabled={!valid}
            className="mt-7 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Oblicz koszt przejazdu
          </button>


          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-800">
            💡 Możesz wpisać np. <strong>7,5</strong> albo{" "}
            <strong>7.5</strong>.
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

            <div className="flex min-h-[440px] items-center justify-center text-center">

              <div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  🧮
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź dane i kliknij
                  <br />
                  „Oblicz koszt przejazdu”.
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
                    Dystans
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {totalDistance.toFixed(0)} km
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


              <div className="border-t border-white/10 pt-5">

                <div className="flex items-center justify-between py-2">

                  <span className="text-slate-300">
                    Koszt 100 km
                  </span>

                  <strong>
                    {costPer100.toFixed(2)} zł
                  </strong>

                </div>


                <div className="flex items-center justify-between py-2">

                  <span className="text-slate-300">
                    Koszt na osobę
                  </span>

                  <strong className="text-lg">
                    {costPerPerson.toFixed(2)} zł
                  </strong>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>


      {/* TREŚĆ SEO */}

      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczyć koszt przejazdu samochodem?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Koszt przejazdu zależy przede wszystkim od dystansu,
          średniego spalania samochodu oraz aktualnej ceny paliwa.
          Przy wspólnej podróży koszt paliwa można dodatkowo
          podzielić pomiędzy pasażerów.
        </p>


        <div className="mt-6 rounded-2xl bg-slate-50 p-5">

          <div className="font-semibold">
            Wzór:
          </div>

          <div className="mt-3 font-mono text-sm text-slate-600">
            koszt = dystans × spalanie ÷ 100 × cena paliwa
          </div>

        </div>


        <h3 className="mt-8 text-xl font-bold">
          Przykład
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Dla trasy 500 km, spalania 7,5 l/100 km i ceny
          6,50 zł/l samochód zużyje 37,5 litra paliwa,
          a koszt przejazdu wyniesie 243,75 zł.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">

          <div>
            <h4 className="font-semibold">
              Czy mogę obliczyć trasę w obie strony?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Zaznacz „Podróż w obie strony”, a kalkulator
              automatycznie podwoi dystans.
            </p>
          </div>


          <div>
            <h4 className="font-semibold">
              Czy koszt można podzielić między pasażerów?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Podaj liczbę osób, a kalkulator pokaże koszt
              przypadający na jedną osobę.
            </p>
          </div>

        </div>

      </div>

    </CalculatorLayout>
  );
}