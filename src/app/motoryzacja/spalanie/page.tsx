"use client";

import { useState } from "react";

export default function SpalaniePage() {
  const [distance, setDistance] = useState("");
  const [fuel, setFuel] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");

  const km = Number(distance);
  const liters = Number(fuel);
  const price = Number(fuelPrice);

  const hasBasicData = km > 0 && liters > 0;

  const consumption = hasBasicData
    ? (liters / km) * 100
    : 0;

  const costPer100 = hasBasicData && price > 0
    ? consumption * price
    : 0;

  const totalCost = hasBasicData && price > 0
    ? liters * price
    : 0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <a
            href="/"
            className="text-xl font-extrabold tracking-tight"
          >
            POLICZ<span className="text-blue-600">DOBRZE</span>
          </a>

          <a
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            ← Wszystkie kalkulatory
          </a>

        </div>
      </header>


      {/* HERO */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 pb-14 pt-14 text-center">

          <div className="text-5xl">
            ⛽
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Kalkulator spalania
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Sprawdź rzeczywiste spalanie samochodu,
            koszt przejechania 100 km oraz koszt całej trasy.
          </p>

        </div>
      </section>


      {/* CALCULATOR */}
      <section className="px-6 py-12">

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">

          {/* INPUTS */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-xl font-bold">
              Wprowadź dane
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Najlepiej użyć danych z rzeczywistego tankowania.
            </p>


            <div className="mt-7 space-y-5">

              {/* DISTANCE */}
              <div>

                <label className="mb-2 block text-sm font-medium">
                  Przejechany dystans
                </label>

                <div className="relative">

                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="np. 520"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-16 outline-none focus:border-blue-500"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    km
                  </span>

                </div>

              </div>


              {/* FUEL */}
              <div>

                <label className="mb-2 block text-sm font-medium">
                  Zużyte paliwo
                </label>

                <div className="relative">

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                    placeholder="np. 42"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-16 outline-none focus:border-blue-500"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    litrów
                  </span>

                </div>

              </div>


              {/* PRICE */}
              <div>

                <label className="mb-2 block text-sm font-medium">
                  Cena paliwa
                  <span className="ml-2 font-normal text-slate-400">
                    (opcjonalnie)
                  </span>
                </label>

                <div className="relative">

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(e.target.value)}
                    placeholder="np. 6.50"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none focus:border-blue-500"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    zł/l
                  </span>

                </div>

              </div>

            </div>


            <div className="mt-7 rounded-2xl bg-blue-50 p-4">

              <div className="text-sm font-semibold text-blue-900">
                💡 Jak uzyskać dokładny wynik?
              </div>

              <p className="mt-2 text-sm leading-6 text-blue-800">
                Zatankuj samochód do pełna, wyzeruj licznik
                kilometrów i podczas kolejnego tankowania
                ponownie zatankuj do pełna. Podaj przejechany
                dystans oraz ilość zatankowanego paliwa.
              </p>

            </div>

          </div>


          {/* RESULTS */}
          <div className="rounded-3xl bg-slate-900 p-7 text-white">

            <h2 className="text-xl font-bold">
              Wynik
            </h2>


            {!hasBasicData ? (

              <div className="flex min-h-[390px] items-center justify-center text-center">

                <div>

                  <div className="text-5xl">
                    🧮
                  </div>

                  <p className="mt-4 text-slate-300">
                    Wprowadź dystans oraz ilość
                    <br />
                    zużytego paliwa.
                  </p>

                </div>

              </div>

            ) : (

              <div className="mt-7">

                {/* MAIN RESULT */}
                <div className="rounded-2xl bg-white/10 p-6">

                  <div className="text-sm text-slate-300">
                    Średnie spalanie
                  </div>

                  <div className="mt-2 text-5xl font-extrabold">
                    {consumption.toFixed(2)}
                    <span className="ml-2 text-xl font-medium text-slate-300">
                      l/100 km
                    </span>
                  </div>

                </div>


                {/* DETAILS */}
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
                      Paliwo
                    </div>

                    <div className="mt-1 text-xl font-bold">
                      {liters.toFixed(2)} l
                    </div>

                  </div>

                </div>


                {/* COST */}
                {price > 0 && (

                  <div className="mt-4 border-t border-white/10 pt-5">

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
                        Koszt zatankowanego paliwa
                      </span>

                      <strong>
                        {totalCost.toFixed(2)} zł
                      </strong>

                    </div>

                  </div>

                )}

              </div>

            )}

          </div>

        </div>

      </section>


      {/* EXPLANATION */}
      <section className="px-6 pb-16">

        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-7 shadow-sm">

          <h2 className="text-2xl font-bold">
            Jak obliczyć spalanie samochodu?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Spalanie samochodu określa, ile litrów paliwa
            samochód zużywa na przejechanie 100 kilometrów.
            Do obliczenia potrzebujesz znać przejechany dystans
            oraz ilość zużytego paliwa.
          </p>


          <div className="mt-6 rounded-2xl bg-slate-50 p-5">

            <div className="font-semibold">
              Wzór na spalanie:
            </div>

            <div className="mt-3 font-mono text-sm text-slate-600">
              spalanie = ilość paliwa ÷ dystans × 100
            </div>

          </div>


          <p className="mt-6 leading-7 text-slate-600">
            Przykład: jeżeli samochód przejechał 520 km
            i zużył 42 litry paliwa, jego średnie spalanie wynosi
            około 8,08 l/100 km.
          </p>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-500">

          © {new Date().getFullYear()} PoliczDobrze.pl

        </div>

      </footer>

    </main>
  );
}