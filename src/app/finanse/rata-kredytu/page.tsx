"use client";

import { useEffect, useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { parseNumber } from "@/lib/number";
import { trackCalculatorUsed } from "@/lib/analytics";

export default function RataKredytuPage() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");

  const principal = parseNumber(amount);
  const annualRate = parseNumber(rate);
  const numberOfMonths = parseNumber(months);

  const valid =
    principal > 0 &&
    annualRate >= 0 &&
    numberOfMonths > 0;

  const monthlyRate = annualRate / 100 / 12;

  let monthlyPayment = 0;

  if (valid) {

    if (monthlyRate === 0) {
      monthlyPayment =
        principal / numberOfMonths;
    } else {
      monthlyPayment =
        principal *
        (
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfMonths)
        ) /
        (
          Math.pow(1 + monthlyRate, numberOfMonths) - 1
        );
    }
  }

  const totalPayment = valid
    ? monthlyPayment * numberOfMonths
    : 0;

  const interest = valid
    ? totalPayment - principal
    : 0;

  useEffect(() => {
    if (!valid) return;

    const timeout = setTimeout(() => {
      trackCalculatorUsed("rata_kredytu");
    }, 500);

    return () => clearTimeout(timeout);
  }, [valid]);

  return (
    <CalculatorLayout
      icon="🏦"
      title="Kalkulator raty kredytu"
      description="Oblicz orientacyjną miesięczną ratę, sumę spłat oraz odsetki."
      categoryName="Finanse"
      categoryHref="/finanse"
      related={[
        {
          icon: "💵",
          title: "Kalkulator VAT",
          href: "/finanse/vat",
        },
        {
          icon: "📊",
          title: "Kalkulator marży",
          href: "/finanse/marza",
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
            Parametry kredytu
          </h2>

          <div className="mt-7 space-y-5">

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Kwota kredytu
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="np. 300000"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł
                </span>

              </div>

            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold">
                Oprocentowanie nominalne
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="decimal"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="np. 7,5"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  %
                </span>

              </div>

            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold">
                Okres kredytu
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="numeric"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  placeholder="np. 360"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-20 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  miesięcy
                </span>

              </div>

            </div>

          </div>


          <div className="mt-7 rounded-2xl border border-amber-100 bg-amber-50 p-5">

            <div className="font-semibold text-amber-900">
              ⚠️ Kalkulacja orientacyjna
            </div>

            <p className="mt-2 text-sm leading-6 text-amber-800">
              Kalkulator zakłada stałe oprocentowanie nominalne
              i raty równe. Nie uwzględnia prowizji, ubezpieczeń,
              opłat dodatkowych ani zmian oprocentowania.
            </p>

          </div>

        </div>


        <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">

          <h2 className="text-xl font-bold">
            Wynik
          </h2>

          {!valid ? (

            <div className="flex min-h-[430px] items-center justify-center text-center">

              <p className="text-slate-300">
                Wprowadź parametry kredytu,
                <br />
                aby obliczyć ratę.
              </p>

            </div>

          ) : (

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Miesięczna rata
                </div>

                <div className="mt-2 text-5xl font-extrabold">
                  {monthlyPayment.toFixed(2)} zł
                </div>

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Suma spłat
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {totalPayment.toFixed(2)} zł
                  </div>

                </div>


                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Odsetki
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {interest.toFixed(2)} zł
                  </div>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczana jest rata?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Przy ratach równych wysokość miesięcznej raty zależy
          od kwoty kredytu, miesięcznej stopy procentowej oraz
          liczby rat. Kalkulator pozwala szybko oszacować wartość
          raty przed porównaniem rzeczywistych ofert banków.
        </p>

      </div>

    </CalculatorLayout>
  );
}