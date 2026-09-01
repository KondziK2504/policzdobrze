"use client";

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
    <main className="min-h-screen bg-slate-50 text-slate-900">

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <a href="/" className="text-xl font-extrabold tracking-tight">
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


      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 pb-14 pt-14 text-center">

          <div className="text-5xl">💰</div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Kalkulator kosztu paliwa
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Sprawdź, ile paliwa potrzebujesz oraz ile będzie
            kosztować przejazd wybranej trasy.
          </p>

        </div>
      </section>


      <section className="px-6 py-12">

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-xl font-bold">
              Dane przejazdu
            </h2>

            <div className="mt-7 space-y-5">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Dystans
                </label>

                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="np. 450"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none focus:border-blue-500"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    km
                  </span>
                </div>
              </div>


              <div>
                <label className="mb-2 block text-sm font-medium">
                  Spalanie
                </label>

                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={consumption}
                    onChange={(e) => setConsumption(e.target.value)}
                    placeholder="np. 7.5"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-24 outline-none focus:border-blue-500"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    l/100 km
                  </span>
                </div>
              </div>


              <div>
                <label className="mb-2 block text-sm font-medium">
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
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none focus:border-blue-500"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    zł/l
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
                  <div className="text-5xl">⛽</div>

                  <p className="mt-4 text-slate-300">
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
                    Koszt przejazdu
                  </div>

                  <div className="mt-2 text-5xl font-extrabold">
                    {totalCost.toFixed(2)} zł
                  </div>

                </div>


                <div className="grid grid-cols-2 gap-4">

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

      </section>


      <section className="px-6 pb-16">

        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-7 shadow-sm">

          <h2 className="text-2xl font-bold">
            Jak obliczamy koszt paliwa?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Kalkulator wykorzystuje dystans, średnie spalanie
            samochodu oraz cenę jednego litra paliwa.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5">

            <div className="font-semibold">
              Wzór:
            </div>

            <div className="mt-3 font-mono text-sm text-slate-600">
              paliwo = dystans × spalanie ÷ 100
            </div>

            <div className="mt-2 font-mono text-sm text-slate-600">
              koszt = paliwo × cena paliwa
            </div>

          </div>

        </div>

      </section>


      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} PoliczDobrze.pl
        </div>

      </footer>

    </main>
  );
}