"use client";

import Link from "next/link";
import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

function formatNumber(value: number, digits = 2) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function FarbaPage() {
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [doorsWindows, setDoorsWindows] = useState("");
  const [coverage, setCoverage] = useState("10");
  const [coats, setCoats] = useState("2");

  const [calculated, setCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  const l = parseNumber(length);
  const h = parseNumber(height);
  const openings = parseNumber(doorsWindows);
  const coverageValue = parseNumber(coverage);
  const coatsValue = Math.floor(parseNumber(coats));

  const wallArea =
    l > 0 && h > 0
      ? l * h
      : 0;

  const openingsArea =
    Math.max(openings, 0);

  const paintArea = Math.max(
    wallArea - openingsArea,
    0,
  );

  const valid =
    paintArea > 0 &&
    coverageValue > 0 &&
    coatsValue > 0;

  const totalPaint = valid
    ? (paintArea * coatsValue) /
      coverageValue
    : 0;

  const recommendedLiters = valid
    ? Math.ceil(totalPaint)
    : 0;

  const roundedLiters = valid
    ? Math.ceil(totalPaint * 2) / 2
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
    setLength("5");
    setHeight("2,7");
    setDoorsWindows("3,5");
    setCoverage("10");
    setCoats("2");
    setCalculated(false);
    setCopied(false);
  }

  function handleReset() {
    setLength("");
    setHeight("");
    setDoorsWindows("");
    setCoverage("10");
    setCoats("2");
    setCalculated(false);
    setCopied(false);
  }

  async function handleCopy() {
    if (!calculated) {
      return;
    }

    const text = [
      `Powierzchnia ściany: ${formatNumber(wallArea)} m²`,
      `Drzwi i okna: ${formatNumber(openingsArea)} m²`,
      `Powierzchnia do malowania: ${formatNumber(paintArea)} m²`,
      `Wydajność farby: ${formatNumber(coverageValue)} m²/l`,
      `Liczba warstw: ${coatsValue}`,
      `Potrzebna ilość farby: ${formatNumber(totalPaint)} l`,
      `Zalecana ilość: ${formatNumber(recommendedLiters, 0)} l`,
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
      icon="🎨"
      title="Kalkulator farby – ile farby potrzebujesz?"
      description="Oblicz, ile farby potrzeba do pomalowania ściany lub pomieszczenia, uwzględniając otwory, wydajność produktu i liczbę warstw."
      categoryName="Budowa i remont"
      categoryHref="/budowa-remont"
      related={[
        {
          icon: "🧱",
          title: "Kalkulator płytek",
          href: "/budowa-remont/plytki",
        },
        {
          icon: "🧱",
          title: "Kalkulator kostki brukowej",
          href: "/budowa-remont/kostka-brukowa",
        },
        {
          icon: "🏗️",
          title: "Kalkulator betonu",
          href: "/budowa-remont/beton",
        },
      ]}
    >
      <CalculatorTracker
        calculator="farba"
        isCalculated={calculated}
      />

      <div className="mx-auto max-w-5xl">

        {/* WPROWADZENIE */}

        <div className="mb-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-7">

          <h2 className="text-xl font-bold text-slate-950">
            Oblicz, ile farby potrzebujesz
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Podaj długość i wysokość ściany, powierzchnię drzwi
            i okien, wydajność farby oraz liczbę warstw. Kalkulator
            wyliczy powierzchnię do pomalowania i orientacyjną ilość
            potrzebnej farby.
          </p>

        </div>


        {/* KALKULATOR */}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* FORMULARZ */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-xl font-bold">
              Dane powierzchni
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Możesz używać przecinka lub kropki jako separatora
              dziesiętnego.
            </p>


            <div className="mt-7 space-y-5">

              {/* DŁUGOŚĆ */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Długość ściany
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={length}
                    onChange={(e) => {
                      setLength(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 5"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    m
                  </span>

                </div>

              </div>


              {/* WYSOKOŚĆ */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Wysokość ściany
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={height}
                    onChange={(e) => {
                      setHeight(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 2,7"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    m
                  </span>

                </div>

              </div>


              {/* OKNA / DRZWI */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Powierzchnia drzwi i okien
                  <span className="ml-2 font-normal text-slate-400">
                    opcjonalnie
                  </span>
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={doorsWindows}
                    onChange={(e) => {
                      setDoorsWindows(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 3,5"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-16 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    m²
                  </span>

                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Zostaw puste albo wpisz 0, jeśli nie chcesz
                  odejmować otworów.
                </p>

              </div>


              {/* WYDAJNOŚĆ */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Wydajność farby
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={coverage}
                    onChange={(e) => {
                      setCoverage(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 10"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-20 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    m²/l
                  </span>

                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Sprawdź wydajność podaną na opakowaniu konkretnej
                  farby.
                </p>

              </div>


              {/* WARSTWY */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Liczba warstw
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  value={coats}
                  onChange={(e) => {
                    setCoats(e.target.value);
                    setCalculated(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCalculate();
                    }
                  }}
                  placeholder="np. 2"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

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
              💡 Wydajność farby zawsze sprawdzaj na opakowaniu.
              Różne produkty mogą mieć różne rzeczywiste zużycie.
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
                    🎨
                  </div>

                  <p className="mt-5 text-slate-300">
                    Wprowadź dane i kliknij „Oblicz”.
                  </p>

                </div>

              </div>

            ) : (

              <div className="mt-7 space-y-4">

                {/* POWIERZCHNIA */}

                <div className="rounded-2xl bg-white/10 p-6">

                  <div className="text-sm text-slate-300">
                    Powierzchnia do malowania
                  </div>

                  <div className="mt-2 text-5xl font-extrabold tracking-tight">

                    {formatNumber(paintArea)}

                    <span className="ml-2 text-xl font-medium text-slate-300">
                      m²
                    </span>

                  </div>

                </div>


                {/* FARBA */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl bg-white/10 p-5">

                    <div className="text-sm text-slate-300">
                      Potrzebna ilość
                    </div>

                    <div className="mt-1 text-2xl font-bold">
                      {formatNumber(totalPaint)} l
                    </div>

                  </div>


                  <div className="rounded-2xl bg-blue-500/10 p-5">

                    <div className="text-sm text-blue-200">
                      Zalecana ilość
                    </div>

                    <div className="mt-1 text-2xl font-bold text-blue-100">
                      {recommendedLiters} l
                    </div>

                  </div>

                </div>


                {/* SZCZEGÓŁY */}

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Szczegóły obliczenia
                  </div>

                  <div className="mt-3 space-y-3 text-sm">

                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">
                        Cała ściana
                      </span>

                      <strong>
                        {formatNumber(wallArea)} m²
                      </strong>
                    </div>


                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">
                        Drzwi i okna
                      </span>

                      <strong>
                        {formatNumber(openingsArea)} m²
                      </strong>
                    </div>


                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">
                        Warstwy
                      </span>

                      <strong>
                        {coatsValue}
                      </strong>
                    </div>


                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">
                        Wydajność
                      </span>

                      <strong>
                        {formatNumber(coverageValue)} m²/l
                      </strong>
                    </div>

                  </div>

                </div>


                {/* INFORMACJA O ZAKUPIE */}

                <div className="rounded-2xl bg-blue-500/10 p-5">

                  <div className="text-sm text-blue-200">
                    Ile kupić?
                  </div>

                  <div className="mt-1 text-lg font-bold text-blue-100">
                    Co najmniej {recommendedLiters} l farby
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Warto sprawdzić dostępne pojemności opakowań
                    i w razie potrzeby dobrać najbliższy większy zestaw.
                  </p>

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


                <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">

                  <div className="font-semibold text-amber-200">
                    Ważne
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Wynik jest orientacyjny. Rzeczywiste zużycie
                    może zależeć od chłonności podłoża, rodzaju farby,
                    liczby warstw, sposobu nakładania oraz stanu
                    malowanej powierzchni.
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>


        {/* TREŚĆ SEO */}

        <article className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-2xl font-bold">
            Kalkulator farby – jak obliczyć ilość farby?
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Aby określić potrzebną ilość farby, należy najpierw
            obliczyć powierzchnię przeznaczoną do malowania.
            Następnie wynik trzeba uwzględnić względem wydajności
            konkretnej farby oraz liczby planowanych warstw.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Jak obliczyć powierzchnię ściany?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            W przypadku prostokątnej ściany wystarczy pomnożyć
            jej długość przez wysokość. Od otrzymanej powierzchni
            można odjąć drzwi i okna.
          </p>


          <div className="mt-5 rounded-2xl bg-slate-50 p-5 font-mono text-sm leading-7 text-slate-600">
            powierzchnia ściany = długość × wysokość
            <br />
            powierzchnia do malowania = powierzchnia ściany − drzwi i okna
          </div>


          <h3 className="mt-8 text-xl font-bold">
            Jak obliczyć ilość farby?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Następnie powierzchnię do malowania mnoży się przez
            liczbę warstw i dzieli przez wydajność farby podaną
            najczęściej w metrach kwadratowych na litr.
          </p>


          <div className="mt-5 rounded-2xl bg-slate-50 p-5 font-mono text-sm leading-7 text-slate-600">
            ilość farby = powierzchnia × liczba warstw ÷ wydajność
          </div>


          <h3 className="mt-8 text-xl font-bold">
            Przykład obliczenia
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Dla ściany o długości 5 m i wysokości 2,7 m powierzchnia
            wynosi 13,5 m². Jeżeli drzwi i okna zajmują 3,5 m²,
            do pomalowania pozostaje 10 m². Przy wydajności 10 m²/l
            i dwóch warstwach potrzeba około 2 litrów farby.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Ile farby kupić?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            W praktyce warto uwzględnić rzeczywiste zużycie produktu
            oraz sposób przygotowania podłoża. Kalkulator daje wynik
            matematyczny, dlatego przed zakupem warto sprawdzić
            zalecenia producenta konkretnej farby.
          </p>


          {/* LINKI */}

          <div className="mt-7 flex flex-wrap gap-3">

            <Link
              href="/budowa-remont/beton"
              className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
            >
              Kalkulator betonu →
            </Link>


            <Link
              href="/budowa-remont/kostka-brukowa"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Kalkulator kostki brukowej →
            </Link>


            <Link
              href="/budowa-remont/plytki"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Kalkulator płytek →
            </Link>


            <Link
              href="/budowa-remont"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Wszystkie kalkulatory budowlane →
            </Link>

          </div>


          {/* FAQ */}

          <h3 className="mt-10 text-xl font-bold">
            FAQ – kalkulator farby
          </h3>


          <div className="mt-5 space-y-6">

            <div>

              <h4 className="font-semibold">
                Jak obliczyć, ile farby potrzeba na ścianę?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Oblicz powierzchnię ściany, odejmij powierzchnię
                drzwi i okien, a następnie uwzględnij liczbę warstw
                i wydajność farby.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Ile farby potrzeba na 10 m²?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Zależy to od wydajności produktu i liczby warstw.
                Przy wydajności 10 m²/l jedna warstwa na 10 m²
                wymaga około 1 litra farby.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy trzeba odejmować okna i drzwi?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Warto je uwzględnić, szczególnie przy dużych
                powierzchniach otworów. Wpisz ich łączną powierzchnię
                w odpowiednim polu.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy dwie warstwy oznaczają dwa razy więcej farby?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                W przybliżeniu tak, dlatego liczba warstw jest
                jednym z parametrów kalkulatora. Rzeczywiste zużycie
                może zależeć od rodzaju powierzchni i produktu.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Gdzie sprawdzić wydajność farby?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Najlepiej sprawdzić informacje na opakowaniu
                lub w dokumentacji producenta. Różne farby mogą mieć
                różną deklarowaną wydajność.
              </p>

            </div>

          </div>


          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">

            <div className="font-semibold text-amber-900">
              Ważne
            </div>

            <p className="mt-2 text-sm leading-7 text-amber-800">
              Kalkulator służy do orientacyjnego oszacowania ilości
              farby. Dokładne zużycie zależy od konkretnego produktu,
              podłoża, liczby warstw i techniki malowania.
            </p>

          </div>

        </article>

      </div>
    </CalculatorLayout>
  );
}