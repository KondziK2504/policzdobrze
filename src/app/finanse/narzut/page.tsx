"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

export default function NarzutPage() {
  const [purchase, setPurchase] = useState("");
  const [markupInput, setMarkupInput] = useState("");

  const purchaseValue = parseNumber(purchase);
  const markup = parseNumber(markupInput);

  const valid = purchaseValue > 0 && markup >= 0;

  const profit = valid
    ? purchaseValue * (markup / 100)
    : 0;

  const sale = valid
    ? purchaseValue + profit
    : 0;

  const margin = valid && sale > 0
    ? (profit / sale) * 100
    : 0;


  return (
    <CalculatorLayout
      icon="📈"
      title="Kalkulator narzutu"
      description="Oblicz cenę sprzedaży na podstawie ceny zakupu i procentowego narzutu."
      categoryName="Finanse"
      categoryHref="/finanse"
      related={[
        {
          icon: "📊",
          title: "Kalkulator marży",
          href: "/finanse/marza",
        },
        {
          icon: "💵",
          title: "Kalkulator VAT",
          href: "/finanse/vat",
        },
        {
          icon: "%",
          title: "Kalkulator procentów",
          href: "/finanse/procenty",
        },
      ]}
    >

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Ustal cenę sprzedaży
          </h2>

          <div className="mt-7 space-y-5">

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Cena zakupu
              </label>

              <input
                type="text"
                inputMode="decimal"
                value={purchase}
                onChange={(e) => setPurchase(e.target.value)}
                placeholder="np. 100"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold">
                Narzut
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="decimal"
                  value={markupInput}
                  onChange={(e) => setMarkupInput(e.target.value)}
                  placeholder="np. 30"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  %
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

            <div className="flex min-h-[350px] items-center justify-center text-center">
              <p className="text-slate-300">
                Wprowadź cenę zakupu oraz narzut.
              </p>
            </div>

          ) : (

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Cena sprzedaży
                </div>

                <div className="mt-2 text-4xl font-extrabold">
                  {sale.toFixed(2)} zł
                </div>

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Zysk
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {profit.toFixed(2)} zł
                  </div>

                </div>


                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Marża
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {margin.toFixed(2)}%
                  </div>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczyć narzut?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Narzut określa, o ile procent cena sprzedaży jest wyższa
          od ceny zakupu. Najpierw oblicza się wartość zysku,
          a następnie dodaje ją do ceny zakupu.
        </p>

      </div>


      <CalculatorTracker
        calculator="narzut"
        isCalculated={valid}
      />
    </CalculatorLayout>
  );
}