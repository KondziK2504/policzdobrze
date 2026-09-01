"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";

export default function KosztPrzejazduPage() {
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [roundTrip, setRoundTrip] = useState(false);
  const [people, setPeople] = useState("1");

  const km = Number(distance);
  const fuel = Number(consumption);
  const price = Number(fuelPrice);
  const persons = Number(people);

  const valid =
    km > 0 &&
    fuel > 0 &&
    price > 0 &&
    persons > 0;

  const totalDistance = roundTrip ? km * 2 : km;
  const liters = valid ? (totalDistance * fuel) / 100 : 0;
  const totalCost = valid ? liters * price : 0;
  const costPer100 = valid ? fuel * price : 0;
  const costPerPerson = valid ? totalCost / persons : 0;

  return (
    <CalculatorLayout
      icon="🚗"
      title="Kalkulator kosztu przejazdu"
      description="Oblicz koszt paliwa, ilość potrzebnego paliwa i koszt podróży na osobę."
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

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Dane przejazdu
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Podaj informacje potrzebne do obliczenia kosztu całej podróży.
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
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(e.target.value)}
                  placeholder="np. 6.50"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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
                type="number"
                min="1"
                step="1"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

            </div>


            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">

              <input
                type="checkbox"
                checked={roundTrip}
                onChange={(e) => setRoundTrip(e.target.checked)}
                className="h-5 w-5"
              />

              <span className="text-sm font-semibold">
                Podróż w obie strony
              </span>

            </label>

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
                  🧮
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź wszystkie dane,
                  <br />
                  aby obliczyć koszt przejazdu.
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-7">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Całkowity koszt paliwa
                </div>

                <div className="mt-2 text-5xl font-extrabold tracking-tight">
                  {totalCost.toFixed(2)} zł
                </div>

              </div>


              <div className="mt-4 grid gap-4 sm:grid-cols-2">

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
                    {liters.toFixed(1)} l
                  </div>

                </div>

              </div>


              <div className="mt-5 border-t border-white/10 pt-5">

                <div className="flex justify-between py-2">

                  <span className="text-slate-300">
                    Koszt 100 km
                  </span>

                  <strong>
                    {costPer100.toFixed(2)} zł
                  </strong>

                </div>


                <div className="flex justify-between py-2">

                  <span className="text-slate-300">
                    Koszt na osobę
                  </span>

                  <strong>
                    {costPerPerson.toFixed(2)} zł
                  </strong>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczyć koszt przejazdu samochodem?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Koszt przejazdu zależy przede wszystkim od dystansu,
          średniego spalania samochodu oraz ceny paliwa.
          W przypadku wspólnej podróży możesz również podzielić
          koszt między pasażerów.
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
          Przy dystansie 500 km, spalaniu 7 l/100 km
          i cenie paliwa 6,50 zł/l koszt przejazdu wynosi
          227,50 zł.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">

          <div>

            <h4 className="font-semibold">
              Czy mogę obliczyć koszt przejazdu w obie strony?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Zaznacz opcję „Podróż w obie strony”,
              a kalkulator podwoi podany dystans.
            </p>

          </div>


          <div>

            <h4 className="font-semibold">
              Czy mogę podzielić koszt paliwa między pasażerów?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Podaj liczbę osób, a kalkulator pokaże
              orientacyjny koszt przypadający na jedną osobę.
            </p>

          </div>

        </div>

      </div>

    </CalculatorLayout>
  );
}