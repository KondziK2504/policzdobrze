"use client";

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
     * Kalkulator zakłada:
     * - umowę o pracę,
     * - jednego pracodawcę,
     * - regularne miesięczne wynagrodzenie,
     * - brak innych dochodów wpływających na próg podatkowy,
     * - standardowe miesięczne naliczanie zaliczki.
     *
     * Dla wynagrodzeń powyżej 120 000 zł rocznie wynik zależy
     * od momentu przekroczenia progu w roku podatkowym, dlatego
     * pokazujemy wynik jako orientacyjny.
     */

    const pension = roundCurrency(gross * 0.0976);
    const disability = roundCurrency(gross * 0.015);
    const sickness = roundCurrency(gross * 0.0245);

    const social = roundCurrency(
      pension + disability + sickness,
    );

    const healthBase = roundCurrency(gross - social);
    const health = roundCurrency(healthBase * 0.09);

    const kup = higherKUP ? 300 : 250;

    const taxIncomeBase = Math.max(
      0,
      healthBase - kup,
    );

    /*
     * Dla kalkulatora miesięcznego przyjmujemy pierwsze
     * 120 000 zł podstawy opodatkowania jako próg 12%.
     * Dla typowej miesięcznej pensji daje to prawidłową
     * symulację standardowej zaliczki.
     */
    const annualizedTaxBase =
      taxIncomeBase * 12;

    const taxBeforeRelief =
      annualizedTaxBase <= 120000
        ? annualizedTaxBase * 0.12
        : 14400 +
          (annualizedTaxBase - 120000) * 0.32;

    const annualTaxReduction = pit2 ? 3600 : 0;

    const annualTaxAfterReduction = Math.max(
      0,
      taxBeforeRelief - annualTaxReduction,
    );

    let monthlyTax =
      annualTaxAfterReduction / 12;

    /*
     * Ulga dla młodych:
     * dla typowej wypłaty miesięcznej poniżej limitu
     * podatku nie pobieramy.
     *
     * Przy wyższych dochodach kalkulator ogranicza
     * zwolnienie do ustawowego limitu i sygnalizuje,
     * że wynik wymaga rozliczenia rocznego.
     */
    if (under26) {
      const annualGross = gross * 12;
      const youthLimit = 85528;

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
            taxableMonthlyGross - taxableSocial,
          );

        const taxableBase = Math.max(
          0,
          taxableHealthBase - kup,
        );

        const taxBefore =
          taxableBase * 0.12;

        const reduction = pit2 ? 300 : 0;

        monthlyTax = Math.max(
          0,
          taxBefore - reduction,
        );
      }
    }

    monthlyTax = roundTax(monthlyTax);

    let ppkEmployee = 0;

    if (ppk) {
      ppkEmployee = roundCurrency(gross * 0.02);
    }

    const net = roundCurrency(
      gross -
        social -
        health -
        monthlyTax -
        ppkEmployee,
    );

    /*
     * Koszt pracodawcy:
     * bazujemy na standardowej składce wypadkowej 1,67%.
     * Rzeczywista składka pracodawcy może być inna.
     */
    const employerPension = roundCurrency(
      gross * 0.0976,
    );

    const employerDisability = roundCurrency(
      gross * 0.065,
    );

    const employerAccident = roundCurrency(
      gross * 0.0167,
    );

    const employerFpFs = roundCurrency(
      gross * 0.0245,
    );

    const employerFund = roundCurrency(
      gross * 0.0245,
    );

    const employerContributions = roundCurrency(
      employerPension +
        employerDisability +
        employerAccident +
        employerFpFs +
        employerFund,
    );

    const employerCost = roundCurrency(
      gross + employerContributions,
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
      annualTaxBase: annualizedTaxBase,
      hasThresholdWarning:
        annualizedTaxBase > 120000,
      hasYouthLimitWarning:
        under26 && gross * 12 > 85528,
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
      description="Oblicz orientacyjne wynagrodzenie netto z kwoty brutto dla umowy o pracę."
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
          icon: "🚘",
          title: "Kalkulator sprowadzenia auta",
          href: "/motoryzacja/sprowadzenie-auta",
        },
      ]}
    >
      <CalculatorTracker
        calculator="wynagrodzenie"
        isCalculated={calculated}
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        {/* FORMULARZ */}

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Dane wynagrodzenia
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Kalkulator dotyczy umowy o pracę i pokazuje
            orientacyjną miesięczną wypłatę netto.
          </p>


          <div className="mt-7 space-y-6">

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
                  placeholder="np. 7000"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 text-lg outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł
                </span>

              </div>

            </div>


            <div>

              <label className="mb-3 block text-sm font-semibold">
                Ustawienia podatkowe
              </label>

              <div className="space-y-3">

                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100">

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
                      Uwzględnienie miesięcznego pomniejszenia zaliczki.
                    </div>
                  </div>

                </label>


                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100">

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


                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100">

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


                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100">

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
                      Przyjmujemy standardową wpłatę pracownika 2%.
                    </div>
                  </div>

                </label>

              </div>

            </div>

          </div>


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


              <div className="rounded-2xl bg-white/10 p-5">

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Brutto
                  </span>

                  <strong>
                    {money(result.gross)} zł
                  </strong>
                </div>


                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Emerytalna
                  </span>

                  <strong>
                    {money(result.pension)} zł
                  </strong>
                </div>


                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Rentowa
                  </span>

                  <strong>
                    {money(result.disability)} zł
                  </strong>
                </div>


                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Chorobowa
                  </span>

                  <strong>
                    {money(result.sickness)} zł
                  </strong>
                </div>


                <div className="flex items-center justify-between border-t border-white/10 py-3">
                  <span className="font-semibold">
                    Składki społeczne
                  </span>

                  <strong>
                    {money(result.social)} zł
                  </strong>
                </div>


                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Składka zdrowotna
                  </span>

                  <strong>
                    {money(result.health)} zł
                  </strong>
                </div>


                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">
                    Zaliczka PIT
                  </span>

                  <strong>
                    {money(result.monthlyTax)} zł
                  </strong>
                </div>


                {result.ppkEmployee > 0 && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-300">
                      PPK pracownika
                    </span>

                    <strong>
                      {money(result.ppkEmployee)} zł
                    </strong>
                  </div>
                )}

              </div>


              <div className="rounded-2xl bg-blue-500/10 p-5">

                <div className="text-sm text-blue-200">
                  Szacunkowy koszt pracodawcy
                </div>

                <div className="mt-1 text-2xl font-bold text-blue-100">
                  {money(result.employerCost)} zł
                </div>

              </div>


              {(result.hasThresholdWarning ||
                result.hasYouthLimitWarning) && (

                <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">

                  <div className="font-semibold text-amber-200">
                    Ważne przy wyższym dochodzie
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Wynik może wymagać rozliczenia narastająco
                    w trakcie roku podatkowego. Po przekroczeniu
                    określonych limitów sposób naliczania podatku
                    może się zmienić.
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

      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Kalkulator wynagrodzenia brutto netto 2026
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Kalkulator pozwala oszacować miesięczne wynagrodzenie
          netto na podstawie kwoty brutto dla umowy o pracę.
          Uwzględnia składki społeczne, składkę zdrowotną,
          zaliczkę na PIT oraz wybrane ustawienia podatkowe.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          Co wpływa na wynagrodzenie netto?
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Na wysokość wypłaty wpływają między innymi składki
          na ubezpieczenia społeczne, składka zdrowotna, koszty
          uzyskania przychodu oraz sposób uwzględniania kwoty
          zmniejszającej podatek.
        </p>


        <div className="mt-6 rounded-2xl bg-slate-50 p-5">

          <div className="font-semibold">
            W uproszczeniu:
          </div>

          <div className="mt-3 font-mono text-sm leading-7 text-slate-600">
            netto = brutto − składki społeczne − zdrowotna − PIT − ewentualne PPK
          </div>

        </div>


        <h3 className="mt-8 text-xl font-bold">
          Umowa o pracę
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Wynagrodzenie z umowy o pracę podlega składkom na
          ubezpieczenia społeczne i zdrowotne oraz opodatkowaniu
          według zasad PIT. Dokładny wynik może zależeć od
          indywidualnej sytuacji podatnika.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">

          <div>
            <h4 className="font-semibold">
              Czy kalkulator działa dla umowy zlecenia?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Nie w tej wersji. Ten kalkulator dotyczy umowy
              o pracę. Kalkulator umowy zlecenia możemy dodać
              jako osobny tryb.
            </p>
          </div>


          <div>
            <h4 className="font-semibold">
              Co daje PIT-2?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Przy złożonym PIT-2 płatnik może stosować
              pomniejszenie miesięcznej zaliczki na podatek
              dochodowy o kwotę zmniejszającą podatek.
            </p>
          </div>


          <div>
            <h4 className="font-semibold">
              Czy osoby przed 26. rokiem życia płacą PIT?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Mogą korzystać z ulgi dla młodych, jeżeli spełniają
              ustawowe warunki i mieszczą się w obowiązującym limicie.
            </p>
          </div>


          <div>
            <h4 className="font-semibold">
              Czy wynik jest dokładny?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Jest to symulacja. Rzeczywista wypłata może różnić się
              między innymi ze względu na sytuację podatkową,
              inne dochody, moment przekroczenia progów, składniki
              wynagrodzenia i indywidualne zasady naliczania.
            </p>
          </div>

        </div>


        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">

          <div className="font-semibold text-blue-900">
            Aktualizacja
          </div>

          <p className="mt-2 text-sm leading-7 text-blue-800">
            Kalkulator został przygotowany dla zasad obowiązujących
            w 2026 roku. Przy istotnych zmianach przepisów
            kalkulator powinien zostać zaktualizowany.
          </p>

        </div>

      </div>

    </CalculatorLayout>
  );
}