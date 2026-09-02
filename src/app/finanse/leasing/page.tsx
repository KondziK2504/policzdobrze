"use client";

import Link from "next/link";
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
    return Math.max(
      0,
      (financedAmount - buyoutAmount) / months,
    );
  }

  const factor = Math.pow(
    1 + monthlyRate,
    months,
  );

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
  const downPaymentPercent =
    parseNumber(downPayment);
  const term = Math.floor(parseNumber(months));
  const buyoutPercent =
    parseNumber(buyout);
  const annualInterest =
    parseNumber(interestRate);

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

  const monthlyPaymentAverage = valid
    ? totalCost / term
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
      title="Kalkulator leasingu samochodu – rata i koszt"
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
          href: "/finanse/wynagrodzenie",
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

      <div className="mx-auto max-w-5xl">

        {/* WPROWADZENIE */}

        <div className="mb-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-7">

          <h2 className="text-xl font-bold text-slate-950">
            Sprawdź orientacyjną ratę leasingu
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Podaj wartość samochodu, wysokość wpłaty własnej,
            okres leasingu, wykup oraz uproszczony koszt finansowania.
            Kalkulator pokaże orientacyjną ratę miesięczną
            i całkowity koszt finansowania.
          </p>

        </div>


        {/* KALKULATOR */}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* FORMULARZ */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-xl font-bold">
              Parametry leasingu
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Możesz wpisywać wartości zarówno z przecinkiem,
              jak i z kropką.
            </p>


            <div className="mt-7 space-y-5">

              {/* WARTOŚĆ AUTA */}

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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 100000"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 text-lg outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    zł
                  </span>

                </div>

              </div>


              {/* WPŁATA */}

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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 10"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    %
                  </span>

                </div>

              </div>


              {/* OKRES */}

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
                  <option value="24">
                    24 miesiące
                  </option>

                  <option value="36">
                    36 miesięcy
                  </option>

                  <option value="48">
                    48 miesięcy
                  </option>

                  <option value="60">
                    60 miesięcy
                  </option>
                </select>

              </div>


              {/* WYKUP */}

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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 20"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    %
                  </span>

                </div>

              </div>


              {/* OPROCENTOWANIE */}

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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 8"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    %
                  </span>

                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Uproszczony parametr kosztu finansowania,
                  używany do symulacji matematycznej.
                </p>

              </div>

            </div>


            {/* PRZYCISKI */}

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
              💡 Zmień wpłatę własną, okres lub wykup i porównaj
              wpływ tych parametrów na ratę oraz całkowity koszt.
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

              <div className="flex min-h-[520px] items-center justify-center text-center">

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

                {/* RATA */}

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


                {/* WPŁATA / WYKUP */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl bg-white/10 p-5">

                    <div className="text-sm text-slate-300">
                      Wpłata własna
                    </div>

                    <div className="mt-1 text-xl font-bold">
                      {formatMoney(
                        downPaymentAmount,
                      )}{" "}
                      zł
                    </div>

                  </div>


                  <div className="rounded-2xl bg-white/10 p-5">

                    <div className="text-sm text-slate-300">
                      Wykup
                    </div>

                    <div className="mt-1 text-xl font-bold">
                      {formatMoney(
                        buyoutAmount,
                      )}{" "}
                      zł
                    </div>

                  </div>

                </div>


                {/* PODSUMOWANIE */}

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Podsumowanie finansowania
                  </div>

                  <div className="mt-3 space-y-3 text-sm">

                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">
                        Wartość samochodu
                      </span>

                      <strong>
                        {formatMoney(value)} zł
                      </strong>
                    </div>


                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">
                        Okres
                      </span>

                      <strong>
                        {term} miesięcy
                      </strong>
                    </div>


                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">
                        Suma rat
                      </span>

                      <strong>
                        {formatMoney(
                          totalInstallments,
                        )}{" "}
                        zł
                      </strong>
                    </div>


                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">
                        Wykup
                      </span>

                      <strong>
                        {formatMoney(
                          buyoutAmount,
                        )}{" "}
                        zł
                      </strong>
                    </div>


                    <div className="mt-2 border-t border-white/10 pt-3">

                      <div className="flex justify-between gap-4">

                        <span className="font-semibold">
                          Całkowity koszt
                        </span>

                        <strong className="text-lg">
                          {formatMoney(
                            totalCost,
                          )}{" "}
                          zł
                        </strong>

                      </div>

                    </div>

                  </div>

                </div>


                {/* KOSZT FINANSOWANIA */}

                <div className="rounded-2xl bg-blue-500/10 p-5">

                  <div className="text-sm text-blue-200">
                    Koszt finansowania
                  </div>

                  <div className="mt-1 text-2xl font-bold text-blue-100">
                    {formatMoney(
                      financingCost,
                    )}{" "}
                    zł
                  </div>

                  <div className="mt-2 text-sm text-slate-400">
                    Średni koszt całkowity na miesiąc:
                    {" "}
                    <strong className="text-slate-200">
                      {formatMoney(
                        monthlyPaymentAverage,
                      )}{" "}
                      zł
                    </strong>
                  </div>

                </div>


                {/* KOPIOWANIE */}

                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-bold transition hover:bg-white/10"
                >
                  {copied
                    ? "✓ Skopiowano wynik"
                    : "Skopiuj wynik"}
                </button>


                {/* UWAGA */}

                <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">

                  <div className="font-semibold text-amber-200">
                    Ważne
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    To uproszczona symulacja matematyczna.
                    Rzeczywista oferta leasingowa może uwzględniać
                    dodatkowe opłaty, prowizje, ubezpieczenie,
                    podatki, sposób rozliczenia wartości samochodu
                    oraz indywidualne warunki finansowania.
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>


        {/* TREŚĆ SEO */}

        <article className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-2xl font-bold">
            Kalkulator leasingu samochodu – jak obliczyć ratę?
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Wysokość raty leasingowej zależy od kilku podstawowych
            parametrów. Najważniejsze z nich to wartość samochodu,
            wpłata własna, okres finansowania, wartość wykupu
            oraz koszt finansowania.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Co wpływa na wysokość raty?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Wyższa wpłata własna oznacza mniejszą kwotę finansowaną,
            natomiast dłuższy okres może rozłożyć koszt na większą
            liczbę rat. Wysokość wykupu również wpływa na poziom rat,
            ponieważ część wartości samochodu pozostaje do rozliczenia
            na końcu umowy.
          </p>


          <div className="mt-6 rounded-2xl bg-slate-50 p-5">

            <div className="font-semibold">
              W kalkulatorze uwzględniamy:
            </div>

            <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-600 sm:grid-cols-2">

              <div>
                • wartość samochodu
              </div>

              <div>
                • wpłatę własną
              </div>

              <div>
                • okres leasingu
              </div>

              <div>
                • wartość wykupu
              </div>

              <div>
                • uproszczony koszt finansowania
              </div>

            </div>

          </div>


          <h3 className="mt-8 text-xl font-bold">
            Przykład – samochód za 100 000 zł
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Przy wartości auta 100 000 zł, wpłacie własnej 10%,
            okresie 36 miesięcy, wykupie 20% i oprocentowaniu
            8% otrzymasz orientacyjną ratę wynikającą z parametrów
            symulacji.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Dlaczego rata może różnić się od oferty leasingowej?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Firmy leasingowe mogą stosować własne metody wyliczania
            kosztu finansowania oraz dodatkowe opłaty. Znaczenie mogą
            mieć również ubezpieczenie, prowizje, podatki, sposób
            rozliczenia samochodu i indywidualna ocena klienta.
            Dlatego wynik kalkulatora należy traktować jako orientacyjną
            symulację, a nie ofertę finansową.
          </p>


          {/* LINKI */}

          <div className="mt-7 flex flex-wrap gap-3">

            <Link
              href="/finanse/vat"
              className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
            >
              Kalkulator VAT →
            </Link>


            <Link
              href="/finanse/wynagrodzenie"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Kalkulator wynagrodzenia →
            </Link>


            <Link
              href="/finanse"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Wszystkie kalkulatory finansowe →
            </Link>

          </div>


          {/* FAQ */}

          <h3 className="mt-10 text-xl font-bold">
            FAQ – kalkulator leasingu
          </h3>


          <div className="mt-5 space-y-6">

            <div>

              <h4 className="font-semibold">
                Od czego zależy rata leasingu samochodu?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Na ratę wpływają przede wszystkim wartość samochodu,
                wpłata własna, okres finansowania, wykup oraz koszt
                finansowania.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy większa wpłata własna zmniejsza ratę?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Przy pozostałych parametrach bez zmian większa
                wpłata własna oznacza mniejszą kwotę pozostającą
                do finansowania.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy dłuższy leasing zawsze oznacza niższy koszt?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Nie. Dłuższy okres może obniżyć wysokość pojedynczej
                raty, ale całkowity koszt finansowania zależy również
                od kosztu finansowania i pozostałych warunków umowy.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy kalkulator uwzględnia wszystkie opłaty leasingowe?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Nie. To uproszczona symulacja. Dodatkowe koszty
                konkretnej oferty mogą nie być uwzględnione.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy kalkulator działa dla samochodu używanego?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Matematycznie tak, ale rzeczywiste warunki leasingu
                samochodu używanego mogą różnić się od warunków
                finansowania nowego pojazdu.
              </p>

            </div>

          </div>


          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">

            <div className="font-semibold text-amber-900">
              Ważne
            </div>

            <p className="mt-2 text-sm leading-7 text-amber-800">
              Wynik kalkulatora jest orientacyjny i nie stanowi
              oferty leasingu ani indywidualnej porady finansowej.
              Przed podpisaniem umowy porównaj rzeczywiste warunki
              finansowania przedstawione przez leasingodawcę.
            </p>

          </div>

        </article>

      </div>
    </CalculatorLayout>
  );
}