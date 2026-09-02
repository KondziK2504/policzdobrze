"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

function formatMoney(value: number) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function calculateMonthlyPayment(
  financedAmount: number,
  monthlyRate: number,
  months: number,
  buyoutAmount: number,
) {
  if (months <= 0) {
    return 0;
  }

  if (monthlyRate === 0) {
    return (financedAmount - buyoutAmount) / months;
  }

  const factor = Math.pow(1 + monthlyRate, months);

  return (
    (financedAmount -
      buyoutAmount / factor) *
    (monthlyRate * factor) /
    (factor - 1)
  );
}

export default function LeasingPage() {
  const [carValue, setCarValue] = useState("");
  const [downPayment, setDownPayment] = useState("10");
  const [months, setMonths] = useState("36");
  const [buyout, setBuyout] = useState("20");
  const [interestRate, setInterestRate] = useState("8");
  const [calculated, setCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  const value = parseNumber(carValue);
  const downPaymentPercent = parseNumber(downPayment);
  const term = parseNumber(months);
  const buyoutPercent = parseNumber(buyout);
  const annualInterest = parseNumber(interestRate);

  const valid =
    value > 0 &&
    downPaymentPercent >= 0 &&
    downPaymentPercent < 100 &&
    term > 0 &&
    buyoutPercent >= 0 &&
    buyoutPercent < 100 &&
    annualInterest >= 0;

  const downPaymentAmount = valid
    ? value * (downPaymentPercent / 100)
    : 0;

  const buyoutAmount = valid
    ? value * (buyoutPercent / 100)
    : 0;

  const financedAmount = valid
    ? value - downPaymentAmount
    : 0;

  const monthlyInterestRate = valid
    ? annualInterest / 100 / 12
    : 0;

  const monthlyPayment = valid
    ? calculateMonthlyPayment(
        financedAmount,
        monthlyInterestRate,
        term,
        buyoutAmount,
      )
    : 0;

  const totalInstallments = valid
    ? monthlyPayment * term
    : 0;

  const totalCost = valid
    ? downPaymentAmount +
      totalInstallments +
      buyoutAmount
    : 0;

  const financingCost = valid
    ? totalCost - value
    : 0;

  function handleCalculate() {
    if (!valid) {
      setCalculated(false);
      return;
    }

    setCalculated(true);
    setCopied(false);
  }

  function handleExample() {
    setCarValue("100000");
    setDownPayment("10");
    setMonths("36");
    setBuyout("20");
    setInterestRate("8");
    setCalculated(false);
    setCopied(false);
  }

  function handleReset() {
    setCarValue("");
    setDownPayment("10");
    setMonths("36");
    setBuyout("20");
    setInterestRate("8");
    setCalculated(false);
    setCopied(false);
  }

  async function handleCopy() {
    if (!calculated) {
      return;
    }

    const result = [
      `Wartość samochodu: ${formatMoney(value)} zł`,
      `Wpłata własna: ${formatMoney(downPaymentAmount)} zł`,
      `Okres: ${term} miesięcy`,
      `Wykup: ${formatMoney(buyoutAmount)} zł`,
      `Oprocentowanie: ${annualInterest.toFixed(2)}%`,
      `Rata miesięczna: ${formatMoney(monthlyPayment)} zł`,
      `Suma rat: ${formatMoney(totalInstallments)} zł`,
      `Całkowity koszt: ${formatMoney(totalCost)} zł`,
      `Koszt finansowania: ${formatMoney(financingCost)} zł`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <CalculatorLayout
      icon="🚗"
      title="Kalkulator leasingu samochodu"
      description="Oblicz orientacyjną ratę leasingu samochodu, wpłatę własną, wykup oraz całkowity koszt finansowania."
      categoryName="Finanse"
      categoryHref="/finanse"
      related={[
        {
          icon: "💵",
          title: "Kalkulator VAT",
          href: "/finanse/vat",
        },
        {
          icon: "💼",
          title: "Kalkulator wynagrodzenia brutto netto",
          href: "#",
        },
        {
          icon: "🚘",
          title: "Kalkulator sprowadzenia auta",
          href: "/motoryzacja/sprowadzenie-auta",
        },
      ]}
    >
      <CalculatorTracker
        calculator="leasing"
        isCalculated={calculated}
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        {/* FORMULARZ */}

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Parametry leasingu
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Podaj podstawowe parametry, aby otrzymać orientacyjną
            symulację raty.
          </p>


          <div className="mt-7 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Wartość samochodu
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="decimal"
                  value={carValue}
                  onChange={(e) => {
                    setCarValue(e.target.value);
                    setCalculated(false);
                  }}
                  placeholder="np. 100000"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 text-lg outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł
                </span>

              </div>
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Wpłata własna
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="decimal"
                  value={downPayment}
                  onChange={(e) => {
                    setDownPayment(e.target.value);
                    setCalculated(false);
                  }}
                  placeholder="np. 10"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  %
                </span>

              </div>
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Okres leasingu
              </label>

              <select
                value={months}
                onChange={(e) => {
                  setMonths(e.target.value);
                  setCalculated(false);
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="24">24 miesiące</option>
                <option value="36">36 miesięcy</option>
                <option value="48">48 miesięcy</option>
                <option value="60">60 miesięcy</option>
              </select>
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Wykup
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="decimal"
                  value={buyout}
                  onChange={(e) => {
                    setBuyout(e.target.value);
                    setCalculated(false);
                  }}
                  placeholder="np. 20"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  %
                </span>

              </div>
            </div>


            <div>
              <label className="mb-2 block text-sm font-semibold">
                Oprocentowanie roczne
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="decimal"
                  value={interestRate}
                  onChange={(e) => {
                    setInterestRate(e.target.value);
                    setCalculated(false);
                  }}
                  placeholder="np. 8"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  %
                </span>

              </div>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                To uproszczony parametr kosztu finansowania,
                a nie gwarantowana oferta leasingowa.
              </p>
            </div>

          </div>


          <div className="mt-7 grid gap-3 sm:grid-cols-3">

            <button
              type="button"
              onClick={handleCalculate}
              disabled={!valid}
              className="rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Oblicz ratę
            </button>


            <button
              type="button"
              onClick={handleExample}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Przykład
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
            💡 Możesz wpisywać wartości zarówno z przecinkiem,
            jak i z kropką.
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

            <div className="flex min-h-[500px] items-center justify-center text-center">

              <div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  🚗
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź parametry leasingu
                  <br />
                  i kliknij „Oblicz ratę”.
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Orientacyjna rata miesięczna
                </div>

                <div className="mt-2 text-5xl font-extrabold tracking-tight">
                  {formatMoney(monthlyPayment)}
                  <span className="ml-2 text-xl font-medium text-slate-300">
                    zł
                  </span>
                </div>

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Wpłata własna
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {formatMoney(downPaymentAmount)} zł
                  </div>

                </div>


                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Wykup
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {formatMoney(buyoutAmount)} zł
                  </div>

                </div>

              </div>


              <div className="rounded-2xl bg-white/10 p-5">

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Wartość samochodu
                  </span>

                  <strong>
                    {formatMoney(value)} zł
                  </strong>
                </div>


                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Suma rat
                  </span>

                  <strong>
                    {formatMoney(totalInstallments)} zł
                  </strong>
                </div>


                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Wykup
                  </span>

                  <strong>
                    {formatMoney(buyoutAmount)} zł
                  </strong>
                </div>


                <div className="mt-2 border-t border-white/10 pt-3">

                  <div className="flex items-center justify-between">

                    <span className="font-semibold">
                      Całkowity koszt
                    </span>

                    <strong className="text-lg">
                      {formatMoney(totalCost)} zł
                    </strong>

                  </div>

                </div>

              </div>


              <div className="rounded-2xl bg-blue-500/10 p-5">

                <div className="text-sm text-blue-200">
                  Koszt finansowania
                </div>

                <div className="mt-1 text-2xl font-bold text-blue-100">
                  {formatMoney(financingCost)} zł
                </div>

              </div>


              <button
                type="button"
                onClick={handleCopy}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-bold transition hover:bg-white/10"
              >
                {copied
                  ? "✓ Skopiowano wynik"
                  : "Skopiuj wynik"}
              </button>


              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">

                <div className="font-semibold text-amber-200">
                  Ważne
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  To uproszczona symulacja finansowa. Rzeczywista
                  rata leasingu może uwzględniać prowizję, opłaty,
                  ubezpieczenie, wartość przedmiotu netto lub brutto,
                  podatki, zmianę stopy procentowej oraz warunki
                  konkretnego leasingodawcy.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>


      {/* SEO */}

      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczyć ratę leasingu samochodu?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Na wysokość raty leasingowej wpływają przede wszystkim
          wartość samochodu, wysokość wpłaty własnej, okres umowy,
          wartość wykupu oraz koszt finansowania.
        </p>


        <div className="mt-6 rounded-2xl bg-slate-50 p-5">

          <div className="font-semibold">
            Najważniejsze elementy symulacji:
          </div>

          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>• wartość samochodu</li>
            <li>• wpłata własna</li>
            <li>• liczba rat</li>
            <li>• wartość wykupu</li>
            <li>• koszt finansowania</li>
          </ul>

        </div>


        <h3 className="mt-8 text-xl font-bold">
          Dlaczego rata z kalkulatora może różnić się od oferty?
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Firmy leasingowe mogą stosować różne zasady wyliczania
          rat, prowizje, opłaty dodatkowe, ubezpieczenia oraz
          indywidualne warunki finansowania. Dlatego wynik kalkulatora
          należy traktować jako symulację, a nie ofertę finansową.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          Leasing samochodu a koszty podatkowe
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Rozliczenie leasingu przez firmę zależy między innymi od
          rodzaju samochodu, sposobu jego wykorzystywania i aktualnych
          przepisów podatkowych. Kalkulator nie wylicza indywidualnych
          korzyści podatkowych.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">

          <div>
            <h4 className="font-semibold">
              Czy kalkulator pokazuje prawdziwą ofertę leasingu?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Nie. Wynik jest orientacyjną symulacją na podstawie
              podanych parametrów.
            </p>
          </div>


          <div>
            <h4 className="font-semibold">
              Czy mogę wpisać przecinek zamiast kropki?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Kalkulator obsługuje oba sposoby zapisu liczb.
            </p>
          </div>


          <div>
            <h4 className="font-semibold">
              Czy kalkulator działa dla samochodu używanego?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Matematycznie tak, ale warunki finansowania samochodu
              używanego mogą różnić się od warunków dla nowego auta.
            </p>
          </div>

        </div>

      </div>

    </CalculatorLayout>
  );
}