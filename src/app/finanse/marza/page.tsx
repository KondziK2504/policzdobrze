"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

export default function MarzaPage() {
  const [purchase, setPurchase] = useState("");
  const [sale, setSale] = useState("");

  const purchaseValue = parseNumber(purchase);
  const saleValue = parseNumber(sale);

  const valid = purchaseValue > 0 && saleValue > 0;

  const profit = valid
    ? saleValue - purchaseValue
    : 0;

  const margin = valid
    ? (profit / saleValue) * 100
    : 0;

  const markup = valid
    ? (profit / purchaseValue) * 100
    : 0;


  return (
    <CalculatorLayout
      icon="📊"
      title="Kalkulator marży"
      description="Oblicz marżę, zysk oraz narzut na podstawie ceny zakupu i sprzedaży."
      categoryName="Finanse"
      categoryHref="/finanse"
      related={[
        {
          icon: "📈",
          title: "Kalkulator narzutu",
          href: "/finanse/narzut",
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
            Cena zakupu i sprzedaży
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
                Cena sprzedaży
              </label>

              <input
                type="text"
                inputMode="decimal"
                value={sale}
                onChange={(e) => setSale(e.target.value)}
                placeholder="np. 150"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

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
                Wprowadź cenę zakupu i sprzedaży.
              </p>
            </div>

          ) : (

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Zysk
                </div>

                <div className="mt-2 text-4xl font-extrabold">
                  {profit.toFixed(2)} zł
                </div>

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Marża
                  </div>

                  <div className="mt-1 text-2xl font-bold">
                    {margin.toFixed(2)}%
                  </div>

                </div>


                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Narzut
                  </div>

                  <div className="mt-1 text-2xl font-bold">
                    {markup.toFixed(2)}%
                  </div>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Marża a narzut
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Marża jest liczona w odniesieniu do ceny sprzedaży,
          natomiast narzut jest liczony w odniesieniu do ceny zakupu.
          Obie wartości procentowe mogą więc być różne, nawet jeśli
          zysk kwotowy jest taki sam.
        </p>

      </div>


      <CalculatorTracker
        calculator="marza"
        isCalculated={valid}
      />
    </CalculatorLayout>
  );
}