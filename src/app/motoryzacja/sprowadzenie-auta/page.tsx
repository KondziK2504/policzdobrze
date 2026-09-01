"use client";

import { useState } from "react";

export default function SprowadzenieAutaPage() {
  const [carPrice, setCarPrice] = useState("");
  const [transport, setTransport] = useState("");
  const [excise, setExcise] = useState("3.1");
  const [other, setOther] = useState("");

  const price = Number(carPrice);
  const transportCost = Number(transport);
  const exciseRate = Number(excise);
  const otherCost = Number(other);

  const valid = price > 0;

  const exciseCost = valid
    ? price * (exciseRate / 100)
    : 0;

  const total = valid
    ? price + transportCost + exciseCost + otherCost
    : 0;

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

          <div className="text-5xl">🚘</div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Kalkulator sprowadzenia auta
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Oszacuj orientacyjny koszt sprowadzenia samochodu
            z zagranicy.
          </p>

        </div>

      </section>


      <section className="px-6 py-12">

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-xl font-bold">
              Koszty samochodu
            </h2>

            <div className="mt-7 space-y-5">

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Cena samochodu
                </label>

                <div className="relative">

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={carPrice}
                    onChange={(e) => setCarPrice(e.target.value)}
                    placeholder="np. 35000"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    zł
                  </span>

                </div>

              </div>


              <div>

                <label className="mb-2 block text-sm font-medium">
                  Transport
                </label>

                <div className="relative">

                  <input
                    type="number"
                    min="0"
                    value={transport}
                    onChange={(e) => setTransport(e.target.value)}
                    placeholder="np. 2500"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    zł
                  </span>

                </div>

              </div>


              <div>

                <label className="mb-2 block text-sm font-medium">
                  Akcyza
                </label>

                <select
                  value={excise}
                  onChange={(e) => setExcise(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="3.1">
                    3,1% — silnik do 2000 cm³
                  </option>

                  <option value="18.6">
                    18,6% — silnik powyżej 2000 cm³
                  </option>
                </select>

              </div>


              <div>

                <label className="mb-2 block text-sm font-medium">
                  Pozostałe koszty
                </label>

                <div className="relative">

                  <input
                    type="number"
                    min="0"
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                    placeholder="np. 1000"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    zł
                  </span>

                </div>

              </div>

            </div>

          </div>


          <div className="rounded-3xl bg-slate-900 p-7 text-white">

            <h2 className="text-xl font-bold">
              Szacunkowy koszt
            </h2>

            {!valid ? (

              <div className="flex min-h-[390px] items-center justify-center text-center">

                <div>

                  <div className="text-5xl">🚘</div>

                  <p className="mt-4 text-slate-300">
                    Podaj cenę samochodu,
                    <br />
                    aby rozpocząć obliczenia.
                  </p>

                </div>

              </div>

            ) : (

              <div className="mt-7">

                <div className="rounded-2xl bg-white/10 p-6">

                  <div className="text-sm text-slate-300">
                    Łączny koszt
                  </div>

                  <div className="mt-2 text-4xl font-extrabold">
                    {total.toFixed(2)} zł
                  </div>

                </div>


                <div className="mt-5 space-y-3 border-t border-white/10 pt-5">

                  <div className="flex justify-between">
                    <span className="text-slate-300">
                      Samochód
                    </span>

                    <strong>
                      {price.toFixed(2)} zł
                    </strong>
                  </div>


                  <div className="flex justify-between">
                    <span className="text-slate-300">
                      Akcyza ({exciseRate}%)
                    </span>

                    <strong>
                      {exciseCost.toFixed(2)} zł
                    </strong>
                  </div>


                  <div className="flex justify-between">
                    <span className="text-slate-300">
                      Transport
                    </span>

                    <strong>
                      {transportCost.toFixed(2)} zł
                    </strong>
                  </div>


                  <div className="flex justify-between">
                    <span className="text-slate-300">
                      Pozostałe
                    </span>

                    <strong>
                      {otherCost.toFixed(2)} zł
                    </strong>
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
            Ile kosztuje sprowadzenie samochodu?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Cena samochodu to nie jedyny koszt zakupu auta
            za granicą. Przy imporcie trzeba uwzględnić między
            innymi transport, akcyzę oraz pozostałe opłaty.
          </p>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Kalkulator przedstawia wartość orientacyjną.
            Rzeczywiste koszty mogą zależeć od kraju pochodzenia,
            rodzaju pojazdu, sposobu transportu oraz aktualnych
            przepisów.
          </p>

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