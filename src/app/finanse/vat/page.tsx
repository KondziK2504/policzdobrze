"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

export default function VATPage() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"net" | "gross">("net");
  const [rate, setRate] = useState("23");

  const value = parseNumber(amount);
  const vatRate = parseNumber(rate);

  const valid = value > 0 && vatRate >= 0;

  const net =
    valid && type === "net"
      ? value
      : valid
        ? value / (1 + vatRate / 100)
        : 0;

  const gross =
    valid && type === "net"
      ? value * (1 + vatRate / 100)
      : valid
        ? value
        : 0;

  const vat = valid ? gross - net : 0;


  return (
    <CalculatorLayout
      icon="💵"
      title="Kalkulator VAT"
      description="Oblicz kwotę netto, brutto oraz wartość podatku VAT."
      categoryName="Finanse"
      categoryHref="/finanse"
      related={[
        {
          icon: "🧾",
          title: "Kalkulator brutto netto",
          href: "/finanse/brutto-netto",
        },
        {
          icon: "📊",
          title: "Kalkulator marży",
          href: "/finanse/marza",
        },
        {
          icon: "📈",
          title: "Kalkulator narzutu",
          href: "/finanse/narzut",
        },
      ]}
    >

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Wprowadź dane
          </h2>

          <div className="mt-7 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Kwota
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="np. 1000"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł
                </span>
              </div>
            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold">
                Wprowadzona kwota jest
              </label>

              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "net" | "gross")
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >

                <option value="net">
                  Netto
                </option>

                <option value="gross">
                  Brutto
                </option>

              </select>

            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold">
                Stawka VAT
              </label>

              <select
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >

                <option value="23">23%</option>
                <option value="8">8%</option>
                <option value="5">5%</option>
                <option value="0">0%</option>

              </select>

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
                Wprowadź kwotę, aby zobaczyć wynik.
              </p>
            </div>

          ) : (

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Netto
                </div>

                <div className="mt-2 text-4xl font-extrabold">
                  {net.toFixed(2)} zł
                </div>

              </div>


              <div className="rounded-2xl bg-white/10 p-5">

                <div className="text-sm text-slate-300">
                  VAT ({vatRate}%)
                </div>

                <div className="mt-1 text-2xl font-bold">
                  {vat.toFixed(2)} zł
                </div>

              </div>


              <div className="rounded-2xl bg-blue-500/10 p-5">

                <div className="text-sm text-blue-200">
                  Brutto
                </div>

                <div className="mt-1 text-3xl font-bold text-blue-100">
                  {gross.toFixed(2)} zł
                </div>

              </div>

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczyć VAT?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Kwota VAT zależy od wartości sprzedaży oraz właściwej
          dla danego towaru lub usługi stawki podatku.
          Kalkulator pozwala szybko przeliczyć kwoty netto,
          brutto i sam VAT.
        </p>

        <p className="mt-5 text-sm leading-7 text-slate-500">
          Zastosowanie konkretnej stawki VAT zależy od przedmiotu
          sprzedaży i obowiązujących przepisów.
        </p>

      </div>


      <CalculatorTracker
        calculator="vat"
        isCalculated={valid}
      />
    </CalculatorLayout>
  );
}