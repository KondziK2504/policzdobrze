"use client";

import Link from "next/link";
import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

type CalculationMode = "net" | "gross";

function formatNumber(value: number, digits = 2) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function VatPage() {
  const [amount, setAmount] = useState("");
  const [mode, setMode] =
    useState<CalculationMode>("gross");
  const [vatRate, setVatRate] = useState("23");
  const [calculated, setCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  const inputAmount = parseNumber(amount);
  const rate = parseNumber(vatRate);

  const valid =
    inputAmount > 0 &&
    rate >= 0;

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
        net =
          gross /
          (1 + rate / 100);

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

  function handleExample() {
    setAmount("1230");
    setMode("gross");
    setVatRate("23");
    setCalculated(false);
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
    if (!calculated) {
      return;
    }

    const result = [
      `Kwota wejściowa: ${formatNumber(inputAmount)} zł`,
      `Podana kwota: ${
        mode === "net" ? "netto" : "brutto"
      }`,
      `VAT: ${formatNumber(vat)} zł (${formatNumber(rate, 1)}%)`,
      `Netto: ${formatNumber(net)} zł`,
      `Brutto: ${formatNumber(gross)} zł`,
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
      icon="💵"
      title="Kalkulator VAT – netto, brutto i podatek"
      description="Oblicz kwotę netto, VAT i brutto dla wybranej stawki. Przelicz brutto na netto albo netto na brutto."
      categoryName="Finanse"
      categoryHref="/finanse"
      related={[
        {
          icon: "🚗",
          title: "Kalkulator leasingu samochodu",
          href: "/finanse/leasing",
        },
        {
          icon: "💼",
          title: "Kalkulator wynagrodzenia brutto netto",
          href: "/finanse/wynagrodzenie",
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

      <div className="mx-auto max-w-5xl">

        {/* WPROWADZENIE */}

        <div className="mb-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-7">

          <h2 className="text-xl font-bold text-slate-950">
            Oblicz netto, VAT i brutto
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Wpisz kwotę, wybierz czy jest to wartość netto czy
            brutto, a następnie wskaż stawkę VAT. Kalkulator
            automatycznie wyliczy pozostałe wartości.
          </p>

        </div>


        {/* KALKULATOR */}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* FORMULARZ */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-xl font-bold">
              Dane do obliczenia
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Możesz używać przecinka lub kropki jako separatora
              dziesiętnego.
            </p>


            <div className="mt-7 space-y-6">

              {/* KWOTA */}

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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 1230"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 text-lg outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    zł
                  </span>

                </div>

              </div>


              {/* NETTO / BRUTTO */}

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
                        : "rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
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
                        : "rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                    }
                  >
                    Brutto
                  </button>

                </div>

              </div>


              {/* STAWKA VAT */}

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
                  <option value="23">
                    23% — podstawowa
                  </option>

                  <option value="8">
                    8% — obniżona
                  </option>

                  <option value="5">
                    5% — obniżona
                  </option>

                  <option value="0">
                    0%
                  </option>
                </select>

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
                Oblicz
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
              💡 Przykład: 1230 zł brutto przy stawce 23% to
              1000 zł netto i 230 zł VAT.
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
                    💵
                  </div>

                  <p className="mt-5 text-slate-300">
                    Wprowadź kwotę i kliknij „Oblicz”.
                  </p>

                </div>

              </div>

            ) : (

              <div className="mt-7 space-y-4">

                {/* NAJWAŻNIEJSZA WARTOŚĆ */}

                <div className="rounded-2xl bg-white/10 p-6">

                  <div className="text-sm text-slate-300">
                    {mode === "gross"
                      ? "Kwota netto"
                      : "Kwota brutto"}
                  </div>

                  <div className="mt-2 text-5xl font-extrabold tracking-tight">

                    {formatNumber(
                      mode === "gross"
                        ? net
                        : gross,
                    )}

                    <span className="ml-2 text-xl font-medium text-slate-300">
                      zł
                    </span>

                  </div>

                </div>


                {/* SZCZEGÓŁY */}

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="flex items-center justify-between py-2">

                    <span className="text-slate-300">
                      Netto
                    </span>

                    <strong>
                      {formatNumber(net)} zł
                    </strong>

                  </div>


                  <div className="flex items-center justify-between py-2">

                    <span className="text-slate-300">
                      VAT ({formatNumber(rate, 1)}%)
                    </span>

                    <strong>
                      {formatNumber(vat)} zł
                    </strong>

                  </div>


                  <div className="mt-2 border-t border-white/10 pt-3">

                    <div className="flex items-center justify-between">

                      <span className="font-semibold">
                        Brutto
                      </span>

                      <strong className="text-lg">
                        {formatNumber(gross)} zł
                      </strong>

                    </div>

                  </div>

                </div>


                {/* INFORMACJA */}

                <div className="rounded-2xl bg-blue-500/10 p-5">

                  <div className="text-sm text-blue-200">
                    Podana kwota
                  </div>

                  <div className="mt-1 text-xl font-bold text-blue-100">
                    {formatNumber(inputAmount)} zł{" "}
                    {mode === "net"
                      ? "netto"
                      : "brutto"}
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

              </div>

            )}

          </div>

        </div>


        {/* TREŚĆ SEO */}

        <article className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-2xl font-bold">
            Kalkulator VAT – netto, brutto i VAT
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Kalkulator VAT pozwala szybko przeliczyć wartość netto,
            wysokość podatku oraz wartość brutto. Możesz rozpocząć
            od kwoty netto i doliczyć VAT albo od kwoty brutto
            i wyliczyć zawartą w niej wartość netto oraz VAT.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Jak obliczyć VAT od kwoty netto?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Jeżeli znasz kwotę netto, pomnóż ją przez stawkę VAT
            wyrażoną jako liczba dziesiętna. Następnie dodaj
            otrzymany podatek do kwoty netto.
          </p>


          <div className="mt-5 rounded-2xl bg-slate-50 p-5 font-mono text-sm leading-7 text-slate-600">
            VAT = netto × stawka VAT
            <br />
            brutto = netto + VAT
          </div>


          <h3 className="mt-8 text-xl font-bold">
            Jak obliczyć cenę netto z brutto?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Jeżeli znasz cenę brutto, podziel ją przez
            1 + stawka VAT. Dla stawki 23% oznacza to podzielenie
            kwoty brutto przez 1,23.
          </p>


          <div className="mt-5 rounded-2xl bg-slate-50 p-5 font-mono text-sm leading-7 text-slate-600">
            netto = brutto ÷ 1,23
          </div>


          <h3 className="mt-8 text-xl font-bold">
            Przykład – 1230 zł brutto przy VAT 23%
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Przy kwocie 1230 zł brutto i stawce VAT 23%:
          </p>

          <div className="mt-4 rounded-2xl bg-slate-50 p-5 font-mono text-sm leading-7 text-slate-600">
            netto = 1230 ÷ 1,23 = 1000 zł
            <br />
            VAT = 230 zł
            <br />
            brutto = 1230 zł
          </div>


          <h3 className="mt-8 text-xl font-bold">
            Jakie stawki VAT można wybrać?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Kalkulator pozwala wybrać stawkę 23%, 8%, 5% albo 0%.
            Odpowiednia stawka zależy od rodzaju towaru lub usługi
            oraz obowiązujących przepisów.
          </p>


          {/* LINKI */}

          <div className="mt-7 flex flex-wrap gap-3">

            <Link
              href="/finanse/leasing"
              className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
            >
              Kalkulator leasingu →
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
            FAQ – kalkulator VAT
          </h3>


          <div className="mt-5 space-y-6">

            <div>

              <h4 className="font-semibold">
                Jak obliczyć VAT z kwoty netto?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Pomnóż kwotę netto przez stawkę VAT. Następnie
                dodaj obliczony podatek do kwoty netto, aby uzyskać
                wartość brutto.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Jak obliczyć netto z kwoty brutto?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Podziel kwotę brutto przez 1,23 dla stawki 23%,
                przez 1,08 dla 8% albo przez 1,05 dla 5%.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy kalkulator obsługuje VAT 0%?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Przy stawce 0% kwota netto i brutto są takie same,
                a wartość VAT wynosi 0 zł.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy kalkulator działa na telefonie?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Formularz został przygotowany również z myślą
                o urządzeniach mobilnych.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy mogę wpisać 1230,50?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Możesz używać zarówno przecinka, jak i kropki
                jako separatora dziesiętnego.
              </p>

            </div>

          </div>


          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">

            <div className="font-semibold text-amber-900">
              Ważne
            </div>

            <p className="mt-2 text-sm leading-7 text-amber-800">
              Wybór prawidłowej stawki VAT zależy od konkretnego
              towaru, usługi i sytuacji podatnika. Kalkulator służy
              do wykonywania obliczeń matematycznych i nie zastępuje
              indywidualnej porady podatkowej.
            </p>

          </div>

        </article>

      </div>
    </CalculatorLayout>
  );
}