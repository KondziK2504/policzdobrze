"use client";

import { useMemo, useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

function formatMoney(value: number) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function formatNumber(value: number, digits = 2) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function KredytHipotecznyPage() {
  const [propertyPrice, setPropertyPrice] = useState("500000");
  const [downPayment, setDownPayment] = useState("100000");
  const [years, setYears] = useState("25");
  const [interestRate, setInterestRate] = useState("6.5");

  const propertyPriceValue = parseNumber(propertyPrice);
  const downPaymentValue = parseNumber(downPayment);
  const yearsValue = parseNumber(years);
  const interestRateValue = parseNumber(interestRate);

  const loanAmount = Math.max(
    0,
    propertyPriceValue - downPaymentValue,
  );

  const valid =
    propertyPriceValue > 0 &&
    downPaymentValue >= 0 &&
    downPaymentValue < propertyPriceValue &&
    yearsValue > 0 &&
    interestRateValue >= 0;

  const result = useMemo(() => {
    if (!valid) {
      return null;
    }

    const months = Math.round(yearsValue * 12);
    const monthlyRate = interestRateValue / 100 / 12;

    let installment = 0;

    if (monthlyRate === 0) {
      installment = loanAmount / months;
    } else {
      installment =
        loanAmount *
        (monthlyRate *
          Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalRepayment = installment * months;
    const totalInterest = Math.max(
      0,
      totalRepayment - loanAmount,
    );

    const downPaymentPercent =
      propertyPriceValue > 0
        ? (downPaymentValue / propertyPriceValue) * 100
        : 0;

    const loanToValue =
      propertyPriceValue > 0
        ? (loanAmount / propertyPriceValue) * 100
        : 0;

    return {
      installment,
      totalRepayment,
      totalInterest,
      downPaymentPercent,
      loanToValue,
      months,
    };
  }, [
    valid,
    propertyPriceValue,
    downPaymentValue,
    yearsValue,
    interestRateValue,
    loanAmount,
  ]);

  return (
    <CalculatorLayout
      icon="🏠"
      title="Kalkulator kredytu hipotecznego"
      description="Oblicz orientacyjną ratę kredytu hipotecznego, całkowity koszt spłaty i wysokość odsetek."
      categoryName="Finanse"
      categoryHref="/finanse"
      related={[
        {
          icon: "🏦",
          title: "Kalkulator raty kredytu",
          href: "/finanse/rata-kredytu",
        },
        {
          icon: "🏦",
          title: "Kalkulator zdolności kredytowej",
          href: "/finanse/zdolnosc-kredytowa",
        },
        {
          icon: "📊",
          title: "Kalkulator procentów",
          href: "/finanse/procenty",
        },
      ]}
    >
      <CalculatorTracker
        calculator="kredyt-hipoteczny"
        isCalculated={Boolean(result)}
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold">
            Wprowadź dane kredytu
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Wpisz cenę nieruchomości, wkład własny, okres kredytu
            i orientacyjne oprocentowanie.
          </p>

          <div className="mt-7 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Cena nieruchomości
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={propertyPrice}
                  onChange={(e) =>
                    setPropertyPrice(e.target.value)
                  }
                  placeholder="np. 500000"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Wkład własny
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={downPayment}
                  onChange={(e) =>
                    setDownPayment(e.target.value)
                  }
                  placeholder="np. 100000"
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
                  value={years}
                  onChange={(e) =>
                    setYears(e.target.value)
                  }
                  placeholder="np. 25"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  lat
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
                  value={interestRate}
                  onChange={(e) =>
                    setInterestRate(e.target.value)
                  }
                  placeholder="np. 6,5"
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
              💡 Wynik jest orientacyjny
            </div>

            <p className="mt-2 text-sm leading-6 text-blue-800">
              Kalkulator wykorzystuje podaną stopę oprocentowania
              i model rat równych. Nie uwzględnia wszystkich kosztów
              kredytu ani indywidualnych warunków konkretnego banku.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              Wynik
            </h2>

            {result && (
              <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Gotowe
              </div>
            )}
          </div>

          {!result ? (
            <div className="flex min-h-[430px] items-center justify-center text-center">
              <div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  🏠
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź dane nieruchomości
                  <br />
                  i kredytu.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-7">
              <div className="rounded-2xl bg-white/10 p-6">
                <div className="text-sm text-slate-300">
                  Orientacyjna rata miesięczna
                </div>

                <div className="mt-2 text-5xl font-extrabold tracking-tight">
                  {formatMoney(result.installment)}
                  <span className="ml-2 text-xl font-medium text-slate-300">
                    zł
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-5">
                  <div className="text-sm text-slate-300">
                    Kwota kredytu
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {formatMoney(loanAmount)} zł
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 p-5">
                  <div className="text-sm text-slate-300">
                    Wkład własny
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {formatMoney(downPaymentValue)} zł
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Łączna spłata
                  </span>

                  <strong className="text-lg">
                    {formatMoney(result.totalRepayment)} zł
                  </strong>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Suma odsetek
                  </span>

                  <strong className="text-lg">
                    {formatMoney(result.totalInterest)} zł
                  </strong>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Wkład własny
                  </span>

                  <strong className="text-lg">
                    {formatNumber(
                      result.downPaymentPercent,
                      1,
                    )}
                    %
                  </strong>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Finansowanie nieruchomości
                  </span>

                  <strong className="text-lg">
                    {formatNumber(
                      result.loanToValue,
                      1,
                    )}
                    %
                  </strong>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="font-semibold">
                  Porównaj dostępne oferty
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Warunki kredytów hipotecznych mogą różnić się między
                  bankami. Przed złożeniem wniosku warto porównać
                  dostępne oferty.
                </p>

                <div className="mt-4 rounded-xl border border-dashed border-white/20 px-4 py-3 text-center text-sm font-semibold text-slate-400">
                  Miejsce na przyszły link afiliacyjny
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-xs leading-6 text-slate-400">
                  Kalkulator ma charakter informacyjny. Nie stanowi
                  oferty kredytowej ani indywidualnej oceny zdolności
                  kredytowej.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-bold">
          Jak obliczyć ratę kredytu hipotecznego?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Najpierw od ceny nieruchomości odejmowany jest wkład własny.
          Otrzymana kwota jest orientacyjną kwotą kredytu. Następnie
          kalkulator wylicza ratę równą na podstawie kwoty kredytu,
          okresu spłaty i podanego oprocentowania.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5">
          <div className="font-semibold">
            Podstawowe zależności:
          </div>

          <div className="mt-3 font-mono text-sm leading-7 text-slate-600">
            kredyt = cena nieruchomości − wkład własny
            <br />
            rata = rata kapitałowo-odsetkowa wynikająca z kwoty,
            oprocentowania i okresu
          </div>
        </div>

        <h3 className="mt-8 text-xl font-bold">
          Przykład
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Dla nieruchomości wartej 500 000 zł i wkładu własnego
          100 000 zł kwota kredytu wynosi 400 000 zł. Przy okresie
          25 lat i oprocentowaniu 6,5% kalkulator obliczy orientacyjną
          ratę oraz całkowitą kwotę spłaty.
        </p>

        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">
          <div>
            <h4 className="font-semibold">
              Czy kalkulator pokazuje rzeczywistą ofertę banku?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Nie. To wyliczenie orientacyjne na podstawie danych
              wpisanych przez użytkownika. Bank może zastosować inne
              oprocentowanie, koszty i warunki.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              Czy mogę wpisać przecinek zamiast kropki?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Kalkulator obsługuje zarówno zapis 6,5,
              jak i 6.5.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              Czy większy wkład własny zmniejsza ratę?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Przy tej samej cenie nieruchomości większy wkład
              własny oznacza mniejszą kwotę finansowania.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              Czy całkowity koszt kredytu będzie taki sam jak w kalkulatorze?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Nie musi. Rzeczywisty koszt może obejmować między innymi
              prowizje, ubezpieczenia i inne opłaty oraz może zmieniać
              się wraz z oprocentowaniem.
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}