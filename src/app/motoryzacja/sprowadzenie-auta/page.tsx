"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

export default function SprowadzenieAutaPage() {
  const [carPrice, setCarPrice] = useState("");
  const [transport, setTransport] = useState("");
  const [exciseRate, setExciseRate] = useState("3.1");
  const [otherCosts, setOtherCosts] = useState("");
  const [calculated, setCalculated] = useState(false);

  const price = parseNumber(carPrice);
  const transportCost = parseNumber(transport);
  const excise = parseNumber(exciseRate);
  const additionalCosts = parseNumber(otherCosts);

  const valid = price > 0;

  const exciseCost = valid
    ? price * (excise / 100)
    : 0;

  const total = valid
    ? price +
      transportCost +
      exciseCost +
      additionalCosts
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
      <CalculatorTracker
        calculator="sprowadzenie-auta"
        isCalculated={calculated}
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        {/* FORMULARZ */}

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Koszty importu
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Wprowadź cenę samochodu oraz najważniejsze koszty
            związane z jego sprowadzeniem.
          </p>


          <div className="mt-7 space-y-5">

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Cena samochodu
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="decimal"
                  value={carPrice}
                  onChange={(e) => {
                    setCarPrice(e.target.value);
                    setCalculated(false);
                  }}
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
                  type="text"
                  inputMode="decimal"
                  value={transport}
                  onChange={(e) => {
                    setTransport(e.target.value);
                    setCalculated(false);
                  }}
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
                value={exciseRate}
                onChange={(e) => {
                  setExciseRate(e.target.value);
                  setCalculated(false);
                }}
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
                  type="text"
                  inputMode="decimal"
                  value={otherCosts}
                  onChange={(e) => {
                    setOtherCosts(e.target.value);
                    setCalculated(false);
                  }}
                  placeholder="np. 1000"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł
                </span>

              </div>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Możesz uwzględnić np. badanie techniczne,
                tłumaczenia lub inne wydatki.
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={handleCalculate}
            disabled={!valid}
            className="mt-7 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Oblicz koszt sprowadzenia
          </button>


          <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm leading-6 text-amber-800">

            <strong>⚠️ Ważne:</strong> wynik ma charakter orientacyjny.
            Rzeczywiste należności i koszty zależą od konkretnego
            pojazdu oraz aktualnych przepisów.

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
                  🚘
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź cenę samochodu
                  <br />
                  i kliknij „Oblicz”.
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Łączny koszt
                </div>

                <div className="mt-2 text-4xl font-extrabold">
                  {total.toFixed(2)} zł
                </div>

              </div>


              <div className="rounded-2xl bg-white/10 p-5">

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Samochód
                  </span>

                  <strong>
                    {price.toFixed(2)} zł
                  </strong>
                </div>


                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Akcyza ({excise.toFixed(1)}%)
                  </span>

                  <strong>
                    {exciseCost.toFixed(2)} zł
                  </strong>
                </div>


                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Transport
                  </span>

                  <strong>
                    {transportCost.toFixed(2)} zł
                  </strong>
                </div>


                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Pozostałe koszty
                  </span>

                  <strong>
                    {additionalCosts.toFixed(2)} zł
                  </strong>
                </div>

              </div>


              <div className="rounded-2xl bg-blue-500/10 p-5">

                <div className="text-sm text-blue-200">
                  Samochód + wszystkie podane koszty
                </div>

                <div className="mt-1 text-xl font-bold text-blue-100">
                  {total.toFixed(2)} zł
                </div>

              </div>

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Ile kosztuje sprowadzenie auta?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Przy zakupie samochodu za granicą warto uwzględnić
          nie tylko cenę pojazdu, ale również transport, akcyzę
          oraz inne koszty związane z jego sprowadzeniem
          i przygotowaniem do użytkowania.
        </p>


        <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5">

          <div className="font-semibold text-amber-900">
            Kalkulator jest orientacyjny
          </div>

          <p className="mt-2 text-sm leading-7 text-amber-800">
            Nie należy traktować wyniku jako ostatecznego wyliczenia
            należności podatkowych. Przed zakupem należy sprawdzić
            aktualne zasady dla konkretnego pojazdu.
          </p>

        </div>


        <h3 className="mt-8 text-xl font-bold">
          Przykład
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Samochód kosztujący 35 000 zł, przy założeniu transportu
          2 500 zł, akcyzy 3,1% oraz 1 000 zł dodatkowych kosztów,
          daje w kalkulatorze wynik orientacyjny 39 585 zł.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">

          <div>

            <h4 className="font-semibold">
              Czy kalkulator uwzględnia wszystkie koszty importu?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Nie. Kalkulator stanowi uproszczone narzędzie do
              wstępnego oszacowania kosztu. Rzeczywiste koszty mogą
              zależeć od wielu dodatkowych czynników.
            </p>

          </div>


          <div>

            <h4 className="font-semibold">
              Czy mogę wpisać wartości z przecinkiem?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Możesz wpisywać zarówno np. 35000,50,
              jak i 35000.50.
            </p>

          </div>

        </div>

      </div>

    </CalculatorLayout>
  );
}