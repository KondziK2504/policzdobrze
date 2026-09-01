"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";

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
    <CalculatorLayout
      icon="🚘"
      title="Kalkulator sprowadzenia auta"
      description="Oszacuj orientacyjny koszt sprowadzenia samochodu z zagranicy."
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
          icon: "⛽",
          title: "Kalkulator spalania",
          href: "/motoryzacja/spalanie",
        },
      ]}
    >

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Koszty samochodu
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Wprowadź podstawowe koszty, aby otrzymać orientacyjne
            podsumowanie importu.
          </p>


          <div className="mt-7 space-y-5">

            <div>

              <label className="mb-2 block text-sm font-semibold">
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
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł
                </span>

              </div>

            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold">
                Transport
              </label>

              <div className="relative">

                <input
                  type="number"
                  min="0"
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                  placeholder="np. 2500"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł
                </span>

              </div>

            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold">
                Stawka akcyzy
              </label>

              <select
                value={excise}
                onChange={(e) => setExcise(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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

              <label className="mb-2 block text-sm font-semibold">
                Pozostałe koszty
              </label>

              <div className="relative">

                <input
                  type="number"
                  min="0"
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                  placeholder="np. 1000"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł
                </span>

              </div>

            </div>

          </div>


          <div className="mt-7 rounded-2xl border border-amber-100 bg-amber-50 p-5">

            <div className="font-semibold text-amber-900">
              ⚠️ Wynik jest orientacyjny
            </div>

            <p className="mt-2 text-sm leading-6 text-amber-800">
              Rzeczywiste koszty importu zależą między innymi
              od rodzaju pojazdu, podstawy opodatkowania,
              transportu oraz aktualnych przepisów i opłat.
            </p>

          </div>

        </div>


        <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">

          <h2 className="text-xl font-bold">
            Szacunkowy koszt
          </h2>


          {!valid ? (

            <div className="flex min-h-[430px] items-center justify-center text-center">

              <div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  🚘
                </div>

                <p className="mt-5 text-slate-300">
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


              <div className="mt-6 space-y-4">

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


              <div className="mt-6 border-t border-white/10 pt-5">

                <p className="text-sm leading-6 text-slate-400">
                  Przed wykorzystaniem wyniku do rzeczywistego
                  zakupu samochodu sprawdź aktualne stawki
                  i zasady obowiązujące dla konkretnego pojazdu.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Ile kosztuje sprowadzenie samochodu?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Zakup samochodu za granicą wiąże się nie tylko
          z ceną pojazdu. Do całkowitego kosztu mogą dojść
          między innymi transport, akcyza, badanie techniczne,
          opłaty administracyjne oraz inne wydatki.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          Kalkulator ma charakter orientacyjny
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Rzeczywisty koszt może być inny w zależności od
          konkretnego samochodu, sposobu transportu oraz
          aktualnych przepisów.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">

          <div>

            <h4 className="font-semibold">
              Czy akcyza jest zawsze liczona od ceny samochodu?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Nie należy traktować tego uproszczonego kalkulatora
              jako ostatecznego wyliczenia należności. Rzeczywista
              podstawa obliczenia może zależeć od konkretnego przypadku.
            </p>

          </div>

        </div>

      </div>

    </CalculatorLayout>
  );
}