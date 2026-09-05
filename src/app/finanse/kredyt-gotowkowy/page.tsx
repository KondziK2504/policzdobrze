"use client";

import { useMemo, useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

function formatMoney(value: number) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatNumber(value: number) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export default function KredytGotowkowyPage() {
  const [amount, setAmount] = useState("20000");
  const [months, setMonths] = useState("48");
  const [interestRate, setInterestRate] = useState("7.69");
  const [commission, setCommission] = useState("0");

  const amountValue = parseNumber(amount);
  const monthsValue = parseNumber(months);
  const interestRateValue = parseNumber(interestRate);
  const commissionValue = parseNumber(commission);

  const valid =
    amountValue > 0 &&
    monthsValue > 0 &&
    interestRateValue >= 0 &&
    commissionValue >= 0;

  const result = useMemo(() => {
    if (!valid) {
      return null;
    }

    const monthlyRate =
      interestRateValue / 100 / 12;

    let installment = 0;

    if (monthlyRate === 0) {
      installment = amountValue / monthsValue;
    } else {
      installment =
        amountValue *
        (monthlyRate *
          Math.pow(
            1 + monthlyRate,
            monthsValue,
          )) /
        (Math.pow(
          1 + monthlyRate,
          monthsValue,
        ) - 1);
    }

    const installmentsTotal =
      installment * monthsValue;

    const commissionAmount =
      amountValue *
      (commissionValue / 100);

    const totalCost =
      installmentsTotal +
      commissionAmount;

    const totalInterest =
      Math.max(
        0,
        installmentsTotal - amountValue,
      );

    const totalAdditionalCost =
      totalCost - amountValue;

    return {
      installment,
      installmentsTotal,
      commissionAmount,
      totalCost,
      totalInterest,
      totalAdditionalCost,
    };
  }, [
    valid,
    amountValue,
    monthsValue,
    interestRateValue,
    commissionValue,
  ]);

  return (
    <CalculatorLayout
      icon="💳"
      title="Kalkulator kredytu gotówkowego"
      description="Oblicz orientacyjną ratę kredytu gotówkowego, całkowity koszt spłaty oraz wysokość odsetek."
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
          icon: "🏠",
          title: "Kalkulator kredytu hipotecznego",
          href: "/finanse/kredyt-hipoteczny",
        },
      ]}
    >
      <CalculatorTracker
        calculator="kredyt-gotowkowy"
        isCalculated={Boolean(result)}
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold">
            Dane kredytu
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Podaj kwotę, okres, oprocentowanie i ewentualną prowizję.
            Wynik aktualizuje się automatycznie.
          </p>

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
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                  placeholder="np. 20000"
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
                  value={months}
                  onChange={(e) =>
                    setMonths(e.target.value)
                  }
                  placeholder="np. 48"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-20 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  miesięcy
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
                  placeholder="np. 7,69"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  %
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Prowizja
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={commission}
                  onChange={(e) =>
                    setCommission(e.target.value)
                  }
                  placeholder="np. 0"
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
              💡 Pamiętaj o całkowitym koszcie
            </div>

            <p className="mt-2 text-sm leading-6 text-blue-800">
              Sama wysokość raty nie pokazuje, ile naprawdę kosztuje
              kredyt. Dlatego kalkulator pokazuje również odsetki,
              prowizję i łączną kwotę do spłaty.
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
            <div className="flex min-h-[440px] items-center justify-center text-center">
              <div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  💳
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź dane kredytu,
                  <br />
                  aby zobaczyć wynik.
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
                    {formatMoney(amountValue)} zł
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 p-5">
                  <div className="text-sm text-slate-300">
                    Okres
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {formatNumber(monthsValue)} mies.
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Odsetki
                  </span>

                  <strong className="text-lg">
                    {formatMoney(result.totalInterest)} zł
                  </strong>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Prowizja
                  </span>

                  <strong className="text-lg">
                    {formatMoney(
                      result.commissionAmount,
                    )} zł
                  </strong>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Łączny dodatkowy koszt
                  </span>

                  <strong className="text-lg">
                    {formatMoney(
                      result.totalAdditionalCost,
                    )} zł
                  </strong>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="font-semibold text-white">
                    Łącznie do spłaty
                  </span>

                  <strong className="text-xl">
                    {formatMoney(
                      result.totalCost,
                    )} zł
                  </strong>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="font-semibold">
                  Porównaj aktualne oferty
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Ta sama kwota kredytu może mieć różny koszt całkowity
                  w zależności od banku i warunków finansowania.
                </p>

                <div className="mt-4 rounded-xl border border-dashed border-white/20 px-4 py-3 text-center text-sm font-semibold text-slate-400">
                  Miejsce na przyszły link afiliacyjny
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-xs leading-6 text-slate-400">
                  Kalkulator ma charakter informacyjny. Nie uwzględnia
                  wszystkich możliwych opłat i nie stanowi oferty
                  kredytowej konkretnego banku.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-bold">
          Jak obliczyć koszt kredytu gotówkowego?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Kalkulator wylicza orientacyjną ratę równą na podstawie
          kwoty kredytu, okresu spłaty i oprocentowania nominalnego.
          Następnie do sumy rat dodawana jest podana prowizja.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5">
          <div className="font-semibold">
            W uproszczeniu:
          </div>

          <div className="mt-3 font-mono text-sm leading-7 text-slate-600">
            łączny koszt = suma rat + prowizja
            <br />
            odsetki = suma rat − kwota kredytu
          </div>
        </div>

        <h3 className="mt-8 text-xl font-bold">
          Przykład
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Dla kredytu 20 000 zł na 48 miesięcy z oprocentowaniem
          nominalnym 7,69% i prowizją 0% kalkulator wyliczy ratę
          miesięczną, sumę odsetek oraz całkowitą kwotę do spłaty.
        </p>

        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">
          <div>
            <h4 className="font-semibold">
              Czy rata pokazana przez kalkulator będzie taka sama jak w banku?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Niekoniecznie. Rzeczywista oferta może uwzględniać
              dodatkowe koszty, ubezpieczenia, prowizje oraz inne
              warunki konkretnego banku.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              Czy mogę wpisać przecinek zamiast kropki?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Kalkulator obsługuje zarówno zapis 7,69,
              jak i 7.69.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              Czy prowizja wpływa na koszt kredytu?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Prowizja zwiększa całkowity koszt finansowania.
              W kalkulatorze możesz podać ją jako procent kwoty
              kredytu.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              Co powinienem porównywać zamiast samej raty?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Warto patrzeć przede wszystkim na całkowitą kwotę
              do zapłaty oraz RRSO i wszystkie dodatkowe koszty
              przedstawione w konkretnej ofercie.
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}