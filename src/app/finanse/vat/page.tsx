"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

type CalculationMode = "net" | "gross";

export default function VatPage() {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<CalculationMode>("gross");
  const [vatRate, setVatRate] = useState("23");
  const [calculated, setCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  const inputAmount = parseNumber(amount);
  const rate = parseNumber(vatRate);

  const valid = inputAmount > 0 && rate >= 0;

  let net = 0;
  let vat = 0;
  let gross = 0;

  if (valid) {
    if (mode === "net") {
      net = inputAmount;
      vat = net * (rate / 100);
      gross = net + vat;
    } else {
      gross = inputAmount;

      if (rate === 0) {
        net = gross;
        vat = 0;
      } else {
        net = gross / (1 + rate / 100);
        vat = gross - net;
      }
    }
  }

  function handleCalculate() {
    if (!valid) {
      setCalculated(false);
      return;
    }

    setCalculated(true);
    setCopied(false);
  }

  function handleReset() {
    setAmount("");
    setMode("gross");
    setVatRate("23");
    setCalculated(false);
    setCopied(false);
  }

  async function handleCopy() {
    if (!calculated) return;

    const result = [
      `Netto: ${net.toFixed(2)} zł`,
      `VAT (${rate}%): ${vat.toFixed(2)} zł`,
      `Brutto: ${gross.toFixed(2)} zł`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <CalculatorLayout
      icon="💵"
      title="Kalkulator VAT"
      description="Oblicz wartość netto, VAT i brutto dla wybranej stawki podatku."
      categoryName="Finanse"
      categoryHref="/finanse"
      related={[
        {
          icon: "🚗",
          title: "Kalkulator leasingu samochodu",
          href: "#",
        },
        {
          icon: "💼",
          title: "Kalkulator wynagrodzenia brutto netto",
          href: "#",
        },
        {
          icon: "🛞",
          title: "Kalkulator opon",
          href: "/motoryzacja/opony",
        },
      ]}
    >
      <CalculatorTracker
        calculator="vat"
        isCalculated={calculated}
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Dane
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Możesz używać przecinka lub kropki jako separatora dziesiętnego.
          </p>

          <div className="mt-7 space-y-6">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Kwota
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setCalculated(false);
                  }}
                  placeholder="np. 1230"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 text-lg outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł
                </span>
              </div>
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Podana kwota to
              </label>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => {
                    setMode("net");
                    setCalculated(false);
                  }}
                  className={
                    mode === "net"
                      ? "rounded-xl border-2 border-blue-600 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700"
                      : "rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  }
                >
                  Netto
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode("gross");
                    setCalculated(false);
                  }}
                  className={
                    mode === "gross"
                      ? "rounded-xl border-2 border-blue-600 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700"
                      : "rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  }
                >
                  Brutto
                </button>

              </div>
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Stawka VAT
              </label>

              <select
                value={vatRate}
                onChange={(e) => {
                  setVatRate(e.target.value);
                  setCalculated(false);
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="23">23% — podstawowa</option>
                <option value="8">8% — obniżona</option>
                <option value="5">5% — obniżona</option>
                <option value="0">0%</option>
              </select>
            </div>

          </div>


          <div className="mt-7 grid gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={handleCalculate}
              disabled={!valid}
              className="rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Oblicz VAT
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Wyczyść
            </button>

          </div>


          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-800">
            💡 Możesz wpisać np. <strong>1230,50</strong> albo{" "}
            <strong>1230.50</strong>.
          </div>

        </div>


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

            <div className="flex min-h-[430px] items-center justify-center text-center">

              <div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  💵
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź kwotę i kliknij
                  <br />
                  „Oblicz VAT”.
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  {mode === "gross"
                    ? "Kwota netto"
                    : "Kwota brutto"}
                </div>

                <div className="mt-2 text-5xl font-extrabold tracking-tight">
                  {mode === "gross"
                    ? net.toFixed(2)
                    : gross.toFixed(2)}

                  <span className="ml-2 text-xl font-medium text-slate-300">
                    zł
                  </span>
                </div>

              </div>


              <div className="rounded-2xl bg-white/10 p-5">

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Netto
                  </span>

                  <strong>
                    {net.toFixed(2)} zł
                  </strong>
                </div>


                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    VAT ({rate}%)
                  </span>

                  <strong>
                    {vat.toFixed(2)} zł
                  </strong>
                </div>


                <div className="mt-2 border-t border-white/10 pt-3">

                  <div className="flex items-center justify-between">

                    <span className="font-semibold">
                      Brutto
                    </span>

                    <strong className="text-lg">
                      {gross.toFixed(2)} zł
                    </strong>

                  </div>

                </div>

              </div>


              <button
                type="button"
                onClick={handleCopy}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white/10"
              >
                {copied
                  ? "✓ Skopiowano wynik"
                  : "Skopiuj wynik"}
              </button>

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Kalkulator VAT – netto, brutto i podatek VAT
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Kalkulator pozwala szybko przeliczyć kwotę netto,
          wysokość podatku VAT oraz kwotę brutto. Wystarczy podać
          kwotę, wskazać czy jest to wartość netto czy brutto
          oraz wybrać odpowiednią stawkę VAT.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          Jak obliczyć VAT?
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Dla kwoty netto podatek obliczamy, mnożąc kwotę netto
          przez stawkę VAT. Następnie VAT dodajemy do kwoty netto.
        </p>


        <div className="mt-5 rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-600">
          VAT = netto × stawka VAT
          <br />
          brutto = netto + VAT
        </div>


        <h3 className="mt-8 text-xl font-bold">
          Jak obliczyć netto z brutto?
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Jeżeli znasz kwotę brutto, aby wyliczyć netto,
          dzielisz ją przez 1 + stawka VAT.
        </p>


        <div className="mt-5 rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-600">
          netto = brutto ÷ 1,23
        </div>


        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">

          <div>
            <h4 className="font-semibold">
              Czy mogę używać przecinka?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Kalkulator rozpoznaje zarówno przecinek,
              jak i kropkę jako separator dziesiętny.
            </p>
          </div>


          <div>
            <h4 className="font-semibold">
              Jakie stawki VAT obsługuje kalkulator?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Możesz wybrać 23%, 8%, 5% albo 0%.
              Zastosowanie konkretnej stawki zależy od rodzaju
              towaru lub usługi i obowiązujących przepisów.
            </p>
          </div>

        </div>

      </div>

    </CalculatorLayout>
  );
}