"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

function money(value: number) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function roundCurrency(value: number) {
  return Math.round(value * 100) / 100;
}

function roundTax(value: number) {
  return Math.round(value);
}

export default function WynagrodzeniePage() {
  const [grossInput, setGrossInput] = useState("");
  const [pit2, setPit2] = useState(true);
  const [under26, setUnder26] = useState(false);
  const [higherKUP, setHigherKUP] = useState(false);
  const [ppk, setPpk] = useState(false);

  const [calculated, setCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  const gross = parseNumber(grossInput);

  const result = useMemo(() => {
    if (gross <= 0) {
      return null;
    }

    /*
     * Uproszczona kalkulacja miesięczna.
     *
     * Założenia:
     * - umowa o pracę,
     * - jeden pracodawca,
     * - jedna regularna pensja miesięczna,
     * - brak innych dochodów wpływających na próg PIT,
     * - standardowe składki,
     * - podstawowe rozliczenie zaliczki PIT.
     *
     * Próg 120 000 zł i ulga dla młodych wymagają w rzeczywistości
     * rozliczenia narastającego w skali całego roku.
     */

    // Składki pracownika
    const pension = roundCurrency(gross * 0.0976);
    const disability = roundCurrency(gross * 0.015);
    const sickness = roundCurrency(gross * 0.0245);

    const social = roundCurrency(
      pension +
        disability +
        sickness,
    );

    // Składka zdrowotna
    const healthBase = roundCurrency(
      gross - social,
    );

    const health = roundCurrency(
      healthBase * 0.09,
    );

    // Koszty uzyskania przychodu
    const kup = higherKUP
      ? 300
      : 250;

    // Podstawa PIT
    const taxIncomeBase = Math.max(
      0,
      healthBase - kup,
    );

    /*
     * Standardowa miesięczna symulacja.
     *
     * Dla dochodu rocznego do 120 000 zł:
     * 12% - kwota zmniejszająca podatek.
     *
     * Powyżej progu pokazujemy wynik orientacyjny,
     * ponieważ rzeczywisty moment wejścia w 32% zależy
     * od dochodu narastająco w całym roku.
     */

    const annualTaxBase =
      taxIncomeBase * 12;

    const taxBeforeRelief =
      annualTaxBase <= 120000
        ? annualTaxBase * 0.12
        : 14400 +
          (annualTaxBase - 120000) * 0.32;

    const annualTaxReduction = pit2
      ? 3600
      : 0;

    const annualTaxAfterReduction =
      Math.max(
        0,
        taxBeforeRelief -
          annualTaxReduction,
      );

    let monthlyTax =
      annualTaxAfterReduction / 12;

    /*
     * Ulga dla młodych.
     *
     * Limit roczny: 85 528 zł.
     * Przy wysokiej pensji miesięcznej wynik staje się
     * zależny od przebiegu całego roku, dlatego pokazujemy
     * stosowne ostrzeżenie.
     */

    const youthLimit = 85528;

    if (under26) {
      const annualGross =
        gross * 12;

      if (annualGross <= youthLimit) {
        monthlyTax = 0;
      } else {
        const taxableAnnualGross =
          annualGross - youthLimit;

        const taxableMonthlyGross =
          taxableAnnualGross / 12;

        const taxableSocial =
          taxableMonthlyGross * 0.1371;

        const taxableHealthBase =
          Math.max(
            0,
            taxableMonthlyGross -
              taxableSocial,
          );

        const taxableBase =
          Math.max(
            0,
            taxableHealthBase - kup,
          );

        const taxBefore =
          taxableBase * 0.12;

        const reduction = pit2
          ? 300
          : 0;

        monthlyTax = Math.max(
          0,
          taxBefore - reduction,
        );
      }
    }

    monthlyTax =
      roundTax(monthlyTax);

    // PPK pracownika – standardowo 2%
    const ppkEmployee = ppk
      ? roundCurrency(gross * 0.02)
      : 0;

    const net = roundCurrency(
      gross -
        social -
        health -
        monthlyTax -
        ppkEmployee,
    );

    /*
     * Koszt pracodawcy.
     *
     * Uproszczenie:
     * - emerytalna 9,76%
     * - rentowa 6,50%
     * - wypadkowa 1,67%
     * - FP + FS 2,45%
     *
     * Rzeczywisty koszt może zależeć od
     * indywidualnej sytuacji pracodawcy.
     */

    const employerPension =
      roundCurrency(
        gross * 0.0976,
      );

    const employerDisability =
      roundCurrency(
        gross * 0.065,
      );

    const employerAccident =
      roundCurrency(
        gross * 0.0167,
      );

    const employerFpFs =
      roundCurrency(
        gross * 0.0245,
      );

    const employerContributions =
      roundCurrency(
        employerPension +
          employerDisability +
          employerAccident +
          employerFpFs,
      );

    const employerCost =
      roundCurrency(
        gross +
          employerContributions,
      );

    return {
      gross,
      pension,
      disability,
      sickness,
      social,
      healthBase,
      health,
      kup,
      monthlyTax,
      ppkEmployee,
      net,
      employerContributions,
      employerCost,

      annualTaxBase,

      hasThresholdWarning:
        annualTaxBase > 120000,

      hasYouthLimitWarning:
        under26 &&
        gross * 12 > youthLimit,
    };
  }, [
    gross,
    pit2,
    under26,
    higherKUP,
    ppk,
  ]);

  function handleCalculate() {
    if (!result) {
      setCalculated(false);
      return;
    }

    setCalculated(true);
    setCopied(false);
  }

  function handleExample() {
    setGrossInput("7000");
    setPit2(true);
    setUnder26(false);
    setHigherKUP(false);
    setPpk(false);
    setCalculated(false);
    setCopied(false);
  }

  function handleReset() {
    setGrossInput("");
    setPit2(true);
    setUnder26(false);
    setHigherKUP(false);
    setPpk(false);
    setCalculated(false);
    setCopied(false);
  }

  async function handleCopy() {
    if (!result || !calculated) {
      return;
    }

    const text = [
      `Wynagrodzenie brutto: ${money(result.gross)} zł`,
      `Wynagrodzenie netto: ${money(result.net)} zł`,
      `Składki społeczne: ${money(result.social)} zł`,
      `Składka zdrowotna: ${money(result.health)} zł`,
      `Zaliczka PIT: ${money(result.monthlyTax)} zł`,
      `Koszt pracodawcy: ${money(result.employerCost)} zł`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
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
      icon="💼"
      title="Kalkulator wynagrodzenia brutto netto 2026"
      description="Oblicz orientacyjne wynagrodzenie netto z kwoty brutto dla umowy o pracę oraz sprawdź składki, PIT i koszt pracodawcy."
      categoryName="Finanse"
      categoryHref="/finanse"
      related={[
        {
          icon: "💵",
          title: "Kalkulator VAT",
          href: "/finanse/vat",
        },
        {
          icon: "🚗",
          title: "Kalkulator leasingu samochodu",
          href: "/finanse/leasing",
        },
        {
          icon: "⛽",
          title: "Kalkulator spalania",
          href: "/motoryzacja/spalanie",
        },
      ]}
    >
      <CalculatorTracker
        calculator="wynagrodzenie"
        isCalculated={calculated}
      />

      <div className="mx-auto max-w-5xl">

        {/* WPROWADZENIE */}

        <div className="mb-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-7">

          <h2 className="text-xl font-bold text-slate-950">
            Sprawdź, ile dostaniesz na rękę
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Wpisz miesięczne wynagrodzenie brutto i wybierz
            podstawowe ustawienia podatkowe. Kalkulator oszacuje
            wynagrodzenie netto, składki, zaliczkę PIT oraz
            orientacyjny koszt pracodawcy.
          </p>

        </div>


        {/* KALKULATOR */}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* FORMULARZ */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-xl font-bold">
              Dane wynagrodzenia
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Kalkulator dotyczy umowy o pracę.
            </p>


            <div className="mt-7 space-y-6">

              {/* BRUTTO */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Wynagrodzenie brutto
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={grossInput}
                    onChange={(e) => {
                      setGrossInput(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 7000"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 text-lg outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    zł
                  </span>

                </div>

              </div>


              {/* OPCJE */}

              <div>

                <label className="mb-3 block text-sm font-semibold">
                  Ustawienia
                </label>

                <div className="space-y-3">

                  {/* PIT-2 */}

                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100">

                    <input
                      type="checkbox"
                      checked={pit2}
                      onChange={(e) => {
                        setPit2(e.target.checked);
                        setCalculated(false);
                      }}
                      className="h-5 w-5 accent-blue-600"
                    />

                    <div>

                      <div className="font-semibold">
                        PIT-2
                      </div>

                      <div className="text-xs text-slate-500">
                        Uwzględnij miesięczne pomniejszenie
                        zaliczki o 300 zł.
                      </div>

                    </div>

                  </label>


                  {/* ULGA DLA MŁODYCH */}

                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100">

                    <input
                      type="checkbox"
                      checked={under26}
                      onChange={(e) => {
                        setUnder26(e.target.checked);
                        setCalculated(false);
                      }}
                      className="h-5 w-5 accent-blue-600"
                    />

                    <div>

                      <div className="font-semibold">
                        Mam mniej niż 26 lat
                      </div>

                      <div className="text-xs text-slate-500">
                        Uwzględnij ulgę dla młodych.
                      </div>

                    </div>

                  </label>


                  {/* KUP */}

                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100">

                    <input
                      type="checkbox"
                      checked={higherKUP}
                      onChange={(e) => {
                        setHigherKUP(e.target.checked);
                        setCalculated(false);
                      }}
                      className="h-5 w-5 accent-blue-600"
                    />

                    <div>

                      <div className="font-semibold">
                        Podwyższone koszty uzyskania przychodu
                      </div>

                      <div className="text-xs text-slate-500">
                        300 zł miesięcznie zamiast 250 zł.
                      </div>

                    </div>

                  </label>


                  {/* PPK */}

                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100">

                    <input
                      type="checkbox"
                      checked={ppk}
                      onChange={(e) => {
                        setPpk(e.target.checked);
                        setCalculated(false);
                      }}
                      className="h-5 w-5 accent-blue-600"
                    />

                    <div>

                      <div className="font-semibold">
                        Uczestniczę w PPK
                      </div>

                      <div className="text-xs text-slate-500">
                        Przyjmujemy wpłatę pracownika 2%.
                      </div>

                    </div>

                  </label>

                </div>

              </div>

            </div>


            {/* PRZYCISKI */}

            <div className="mt-7 grid gap-3 sm:grid-cols-3">

              <button
                type="button"
                onClick={handleCalculate}
                disabled={!result}
                className="rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Oblicz netto
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
              💡 Możesz wpisać np. <strong>7000</strong>,
              <strong> 7000,50</strong> albo{" "}
              <strong>7000.50</strong>.
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


            {!calculated || !result ? (

              <div className="flex min-h-[570px] items-center justify-center text-center">

                <div>

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                    💼
                  </div>

                  <p className="mt-5 text-slate-300">
                    Wprowadź wynagrodzenie brutto
                    <br />
                    i kliknij „Oblicz netto”.
                  </p>

                </div>

              </div>

            ) : (

              <div className="mt-7 space-y-4">

                {/* NETTO */}

                <div className="rounded-2xl bg-white/10 p-6">

                  <div className="text-sm text-slate-300">
                    Wynagrodzenie netto
                  </div>

                  <div className="mt-2 text-5xl font-extrabold tracking-tight">

                    {money(result.net)}

                    <span className="ml-2 text-xl font-medium text-slate-300">
                      zł
                    </span>

                  </div>

                </div>


                {/* BRUTTO */}

                <div className="rounded-2xl bg-blue-500/10 p-5">

                  <div className="text-sm text-blue-200">
                    Wynagrodzenie brutto
                  </div>

                  <div className="mt-1 text-2xl font-bold text-blue-100">
                    {money(result.gross)} zł
                  </div>

                </div>


                {/* SKŁADKI */}

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Potrącenia
                  </div>

                  <div className="mt-3 space-y-2 text-sm">

                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Emerytalna
                      </span>

                      <strong>
                        {money(result.pension)} zł
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Rentowa
                      </span>

                      <strong>
                        {money(result.disability)} zł
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Chorobowa
                      </span>

                      <strong>
                        {money(result.sickness)} zł
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4 border-t border-white/10 pt-3">

                      <span className="font-semibold">
                        Składki społeczne
                      </span>

                      <strong>
                        {money(result.social)} zł
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Zdrowotna
                      </span>

                      <strong>
                        {money(result.health)} zł
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Zaliczka PIT
                      </span>

                      <strong>
                        {money(result.monthlyTax)} zł
                      </strong>

                    </div>


                    {result.ppkEmployee > 0 && (

                      <div className="flex justify-between gap-4">

                        <span className="text-slate-400">
                          PPK pracownika
                        </span>

                        <strong>
                          {money(result.ppkEmployee)} zł
                        </strong>

                      </div>

                    )}

                  </div>

                </div>


                {/* KOSZT PRACODAWCY */}

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Szacunkowy koszt pracodawcy
                  </div>

                  <div className="mt-1 text-2xl font-bold">
                    {money(result.employerCost)} zł
                  </div>

                  <div className="mt-2 text-sm text-slate-400">
                    Składki pracodawcy:
                    {" "}
                    <strong className="text-slate-200">
                      {money(result.employerContributions)} zł
                    </strong>
                  </div>

                </div>


                {/* OSTRZEŻENIE */}

                {(result.hasThresholdWarning ||
                  result.hasYouthLimitWarning) && (

                  <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">

                    <div className="font-semibold text-amber-200">
                      Ważne
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Przy takim poziomie wynagrodzenia miesięczny
                      wynik może różnić się od rzeczywistej wypłaty
                      w zależności od dochodu narastająco w ciągu roku.
                      Szczególnie dotyczy to przekroczenia progu PIT
                      lub limitu ulgi dla młodych.
                    </p>

                  </div>

                )}


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
            Kalkulator wynagrodzenia brutto netto 2026
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Kalkulator pozwala oszacować, ile wynosi wynagrodzenie
            netto przy określonej pensji brutto z umowy o pracę.
            Pokazuje również składki społeczne, składkę zdrowotną,
            zaliczkę PIT oraz orientacyjny koszt zatrudnienia
            pracownika.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Brutto a netto – jaka jest różnica?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Wynagrodzenie brutto to kwota określona w umowie przed
            potrąceniem składek i zaliczki na podatek. Wynagrodzenie
            netto to kwota, która pozostaje pracownikowi po dokonaniu
            tych potrąceń.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Co jest odliczane od wynagrodzenia brutto?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Przy umowie o pracę z wynagrodzenia pracownika potrącane
            są między innymi składki na ubezpieczenia społeczne,
            składka zdrowotna oraz zaliczka na PIT. Na ostateczną
            wypłatę wpływają również koszty uzyskania przychodu
            i zastosowane ulgi.
          </p>


          <div className="mt-6 rounded-2xl bg-slate-50 p-5 font-mono text-sm leading-7 text-slate-600">
            netto = brutto − składki społeczne − składka zdrowotna − PIT − ewentualne PPK
          </div>


          <h3 className="mt-8 text-xl font-bold">
            PIT-2 a wynagrodzenie netto
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Przy złożonym PIT-2 płatnik może pomniejszać miesięczną
            zaliczkę na podatek o 1/12 kwoty zmniejszającej podatek,
            czyli 300 zł. 
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Koszty uzyskania przychodu
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            W 2026 roku standardowe koszty uzyskania przychodu
            z jednego stosunku pracy wynoszą 250 zł miesięcznie.
            W określonych sytuacjach, między innymi przy dojeżdżaniu
            z innej miejscowości, stosuje się 300 zł miesięcznie.
            
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Ulga dla młodych
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Osoby, które nie ukończyły 26 lat, mogą korzystać
            z ulgi dla młodych, jeżeli spełniają ustawowe warunki.
            Zwolnienie obejmuje określone przychody do limitu
            85 528 zł. 
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Próg podatkowy
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            W 2026 roku dochód do 120 000 zł jest objęty stawką
            12%, natomiast od nadwyżki ponad 120 000 zł stosuje się
            32%. Kwota zmniejszająca podatek wynosi 3600 zł.
            
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
              href="/finanse/leasing"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Kalkulator leasingu →
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
            FAQ – wynagrodzenie brutto netto
          </h3>


          <div className="mt-5 space-y-6">

            <div>

              <h4 className="font-semibold">
                Ile wynosi netto z brutto?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Zależy to między innymi od rodzaju umowy, składek,
                kosztów uzyskania przychodu, PIT-2, ulg oraz wysokości
                wynagrodzenia.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy kalkulator działa dla umowy zlecenia?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Nie. Ta wersja dotyczy umowy o pracę. Umowa zlecenia
                powinna być liczona osobnym wariantem.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Co daje PIT-2?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                PIT-2 pozwala płatnikowi uwzględniać miesięczne
                pomniejszenie zaliczki na PIT o 300 zł.
                
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy osoby przed 26. rokiem życia płacą PIT?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Mogą korzystać z ulgi dla młodych, jeśli spełniają
                ustawowe warunki i mieszczą się w limicie zwolnienia.
                
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy wynik jest dokładny?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                To symulacja. Przy zmianie dochodu w trakcie roku,
                przekroczeniu progu podatkowego, zmianie sytuacji
                podatkowej lub innych składnikach wynagrodzenia
                rzeczywista wypłata może być inna.
              </p>

            </div>

          </div>


          {/* OSTRZEŻENIE */}

          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">

            <div className="font-semibold text-amber-900">
              Ważne
            </div>

            <p className="mt-2 text-sm leading-7 text-amber-800">
              Kalkulator ma charakter orientacyjny i dotyczy
              standardowego przypadku umowy o pracę. Nie uwzględnia
              wszystkich możliwych sytuacji podatkowych i kadrowych.
              W przypadku nietypowej sytuacji warto zweryfikować
              wynik z kadrami lub księgowością.
            </p>

          </div>

        </article>

      </div>
    </CalculatorLayout>
  );
}