"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

function formatMoney(value: number) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function formatPercent(value: number) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export default function ZdolnoscKredytowaPage() {
  const [income, setIncome] = useState("");
  const [livingCosts, setLivingCosts] = useState("");
  const [existingInstallments, setExistingInstallments] = useState("");
  const [loanYears, setLoanYears] = useState("25");
  const [interestRate, setInterestRate] = useState("7");
  const [installmentShare, setInstallmentShare] = useState("40");

  const incomeValue = parseNumber(income);
  const livingCostsValue = parseNumber(livingCosts);
  const existingInstallmentsValue = parseNumber(existingInstallments);
  const years = parseNumber(loanYears);
  const annualRate = parseNumber(interestRate);
  const share = parseNumber(installmentShare);

  const valid =
    incomeValue > 0 &&
    livingCostsValue >= 0 &&
    existingInstallmentsValue >= 0 &&
    years > 0 &&
    annualRate >= 0 &&
    share > 0 &&
    share <= 100;

  const maxTotalInstallment = valid
    ? incomeValue * (share / 100)
    : 0;

  const availableInstallment = valid
    ? Math.max(
        0,
        maxTotalInstallment -
          livingCostsValue -
          existingInstallmentsValue,
      )
    : 0;

  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  let estimatedLoan = 0;

  if (availableInstallment > 0 && months > 0) {
    if (monthlyRate === 0) {
      estimatedLoan = availableInstallment * months;
    } else {
      estimatedLoan =
        availableInstallment *
        ((1 - Math.pow(1 + monthlyRate, -months)) /
          monthlyRate);
    }
  }

  const totalRepayment =
    availableInstallment > 0
      ? availableInstallment * months
      : 0;

  const totalInterest = Math.max(
    0,
    totalRepayment - estimatedLoan,
  );

  const hasData =
    incomeValue > 0 ||
    livingCostsValue > 0 ||
    existingInstallmentsValue > 0;

  return (
    <CalculatorLayout
      icon="🏦"
      title="Kalkulator zdolności kredytowej"
      description="Oszacuj orientacyjną zdolność kredytową na podstawie dochodu, kosztów utrzymania i obecnych zobowiązań."
      categoryName="Finanse"
      categoryHref="/finanse"
      related={[
        {
          icon: "🏦",
          title: "Kalkulator raty kredytu",
          href: "/finanse/rata-kredytu",
        },
        {
          icon: "💵",
          title: "Kalkulator VAT",
          href: "/finanse/vat",
        },
        {
          icon: "📊",
          title: "Kalkulator procentów",
          href: "/finanse/procenty",
        },
      ]}
    >
      <CalculatorTracker
        calculator="zdolnosc-kredytowa"
        isCalculated={valid}
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold">
            Wprowadź dane
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Podaj orientacyjne wartości. Wynik aktualizuje się
            automatycznie.
          </p>

          <div className="mt-7 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Miesięczny dochód netto
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="np. 8500"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Miesięczne koszty utrzymania
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={livingCosts}
                  onChange={(e) => setLivingCosts(e.target.value)}
                  placeholder="np. 3000"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Obecne raty kredytów i pożyczek
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={existingInstallments}
                  onChange={(e) =>
                    setExistingInstallments(e.target.value)
                  }
                  placeholder="np. 800"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł
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
                  inputMode="decimal"
                  value={loanYears}
                  onChange={(e) => setLoanYears(e.target.value)}
                  placeholder="np. 25"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-16 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  lat
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Oprocentowanie kredytu
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="np. 7"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  %
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Udział dochodu przeznaczany na wszystkie raty
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={installmentShare}
                  onChange={(e) =>
                    setInstallmentShare(e.target.value)
                  }
                  placeholder="np. 40"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div className="font-semibold text-blue-900">
              💡 Jak czytać wynik?
            </div>

            <p className="mt-2 text-sm leading-6 text-blue-800">
              To kalkulator orientacyjny oparty na podanych przez
              Ciebie parametrach. Nie odwzorowuje indywidualnego
              modelu oceny zdolności stosowanego przez konkretny bank.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              Wynik
            </h2>

            {valid && (
              <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Gotowe
              </div>
            )}
          </div>

          {!hasData ? (
            <div className="flex min-h-[460px] items-center justify-center text-center">
              <div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  🧮
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź dochód i podstawowe koszty,
                  <br />
                  aby zobaczyć orientacyjny wynik.
                </p>
              </div>
            </div>
          ) : !valid ? (
            <div className="flex min-h-[460px] items-center justify-center text-center">
              <div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  ⚠️
                </div>

                <p className="mt-5 text-slate-300">
                  Sprawdź wprowadzone wartości.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-7">
              <div className="rounded-2xl bg-white/10 p-6">
                <div className="text-sm text-slate-300">
                  Orientacyjna zdolność kredytowa
                </div>

                <div className="mt-2 text-5xl font-extrabold tracking-tight">
                  {formatMoney(estimatedLoan)}
                  <span className="ml-2 text-xl font-medium text-slate-300">
                    zł
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-5">
                  <div className="text-sm text-slate-300">
                    Dostępna rata
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {formatMoney(availableInstallment)} zł
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 p-5">
                  <div className="text-sm text-slate-300">
                    Okres kredytu
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {formatNumberYears(years)}
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Całkowita spłata
                  </span>

                  <strong className="text-lg">
                    {formatMoney(totalRepayment)} zł
                  </strong>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Szacowane odsetki
                  </span>

                  <strong className="text-lg">
                    {formatMoney(totalInterest)} zł
                  </strong>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Udział dochodu na raty
                  </span>

                  <strong className="text-lg">
                    {formatPercent(share)}%
                  </strong>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="font-semibold">
                  Ważne
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Wynik ma charakter orientacyjny. Bank może wyliczyć
                  inną zdolność kredytową na podstawie m.in. źródła
                  dochodu, historii kredytowej, rodzaju zobowiązania
                  i własnych zasad oceny klienta.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-bold">
          Jak obliczana jest orientacyjna zdolność kredytowa?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Kalkulator najpierw określa maksymalną kwotę, jaką możesz
          przeznaczyć na wszystkie raty na podstawie podanego udziału
          dochodu. Następnie odejmuje koszty utrzymania oraz istniejące
          raty. Pozostała kwota jest traktowana jako orientacyjna rata
          nowego zobowiązania.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5">
          <div className="font-semibold">
            W uproszczeniu:
          </div>

          <div className="mt-3 font-mono text-sm leading-7 text-slate-600">
            dostępna rata = dochód × udział rat − koszty utrzymania − obecne raty
            <br />
            zdolność = wartość kredytu wynikająca z dostępnej raty, okresu i oprocentowania
          </div>
        </div>

        <h3 className="mt-8 text-xl font-bold">
          Przykład
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Załóżmy dochód 8500 zł, koszty utrzymania 3000 zł,
          istniejące raty 800 zł, okres 25 lat i oprocentowanie 7%.
          Kalkulator pokaże wynik zależny również od przyjętego
          udziału dochodu przeznaczanego na raty.
        </p>

        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">
          <div>
            <h4 className="font-semibold">
              Czy wynik jest taki sam jak zdolność wyliczona przez bank?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Nie. To orientacyjne wyliczenie. Banki stosują własne
              modele oceny klienta i mogą uwzględniać dodatkowe dane.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              Czy mogę używać przecinka zamiast kropki?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Kalkulator obsługuje zarówno zapis 7,5,
              jak i 7.5.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              Co oznacza udział dochodu na raty?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              To parametr, który pozwala użytkownikowi samodzielnie
              przyjąć, jaka część dochodu może zostać przeznaczona
              na wszystkie miesięczne raty.
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}

function formatNumberYears(years: number) {
  if (years === 1) return "1 rok";
  if (years >= 2 && years <= 4) return `${years} lata`;
  return `${years} lat`;
}