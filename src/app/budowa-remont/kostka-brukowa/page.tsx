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

export default function KostkaBrukowaPage() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [piecesPerM2, setPiecesPerM2] = useState("36");
  const [reserve, setReserve] = useState("7");

  const [calculated, setCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  const l = parseNumber(length);
  const w = parseNumber(width);
  const pieces = parseNumber(piecesPerM2);
  const reservePercent = parseNumber(reserve);

  const valid =
    l > 0 &&
    w > 0 &&
    pieces > 0 &&
    reservePercent >= 0;

  const area = valid
    ? l * w
    : 0;

  const areaWithReserve = valid
    ? area * (1 + reservePercent / 100)
    : 0;

  const estimatedPieces = valid
    ? Math.ceil(
        areaWithReserve * pieces,
      )
    : 0;

  const extraArea = valid
    ? areaWithReserve - area
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
    setLength("12");
    setWidth("4");
    setPiecesPerM2("36");
    setReserve("7");
    setCalculated(false);
    setCopied(false);
  }

  function handleReset() {
    setLength("");
    setWidth("");
    setPiecesPerM2("36");
    setReserve("7");
    setCalculated(false);
    setCopied(false);
  }

  async function handleCopy() {
    if (!calculated) {
      return;
    }

    const text = [
      `Powierzchnia: ${formatNumber(area)} m²`,
      `Zapas: ${formatNumber(reservePercent, 1)}%`,
      `Powierzchnia z zapasem: ${formatNumber(areaWithReserve)} m²`,
      `Kostka: ${formatNumber(pieces, 0)} szt./m²`,
      `Orientacyjna liczba sztuk: ${estimatedPieces.toLocaleString("pl-PL")} szt.`,
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
      icon="🧱"
      title="Kalkulator kostki brukowej – ilość i powierzchnia"
      description="Oblicz powierzchnię podjazdu, chodnika lub tarasu, potrzebną ilość kostki brukowej oraz zapas na docinki i odpady."
      categoryName="Budowa i remont"
      categoryHref="/budowa-remont"
      related={[
        {
          icon: "🏗️",
          title: "Kalkulator betonu",
          href: "/budowa-remont/beton",
        },
        {
          icon: "🎨",
          title: "Kalkulator farby",
          href: "/budowa-remont/farba",
        },
        {
          icon: "🧱",
          title: "Kalkulator płytek",
          href: "/budowa-remont/plytki",
        },
      ]}
    >
      <CalculatorTracker
        calculator="kostka-brukowa"
        isCalculated={calculated}
      />

      <div className="mx-auto max-w-5xl">

        {/* WPROWADZENIE */}

        <div className="mb-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-7">

          <h2 className="text-xl font-bold text-slate-950">
            Oblicz, ile kostki brukowej potrzebujesz
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Podaj długość i szerokość powierzchni oraz orientacyjną
            liczbę sztuk kostki przypadającą na 1 m². Kalkulator
            wyliczy powierzchnię, zapas oraz przybliżoną liczbę sztuk
            potrzebnych do wykonania prac.
          </p>

        </div>


        {/* KALKULATOR */}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* FORMULARZ */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-xl font-bold">
              Wymiary powierzchni
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Możesz używać przecinka lub kropki jako separatora
              dziesiętnego.
            </p>


            <div className="mt-7 space-y-5">

              {/* DŁUGOŚĆ */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Długość
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
                    placeholder="np. 12"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    m
                  </span>

                </div>

              </div>


              {/* SZEROKOŚĆ */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Szerokość
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={width}
                    onChange={(e) => {
                      setWidth(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 4"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    m
                  </span>

                </div>

              </div>


              {/* SZTUKI NA M2 */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Liczba sztuk kostki na 1 m²
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={piecesPerM2}
                    onChange={(e) => {
                      setPiecesPerM2(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 36"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-16 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    szt./m²
                  </span>

                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Wartość zależy od konkretnego rozmiaru i kształtu
                  kostki.
                </p>

              </div>


              {/* ZAPAS */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Zapas
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={reserve}
                    onChange={(e) => {
                      setReserve(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 7"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    %
                  </span>

                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Zapas można zwiększyć przy bardziej skomplikowanym
                  układzie, wielu docinkach lub bardziej nieregularnej
                  powierzchni.
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
              💡 Przykład: powierzchnia 12 × 4 m daje 48 m².
              Przy 7% zapasu potrzeba około 51,36 m² materiału.
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
                    🧱
                  </div>

                  <p className="mt-5 text-slate-300">
                    Wprowadź wymiary i kliknij „Oblicz”.
                  </p>

                </div>

              </div>

            ) : (

              <div className="mt-7 space-y-4">

                {/* POWIERZCHNIA */}

                <div className="rounded-2xl bg-white/10 p-6">

                  <div className="text-sm text-slate-300">
                    Powierzchnia
                  </div>

                  <div className="mt-2 text-5xl font-extrabold tracking-tight">
                    {formatNumber(area)}

                    <span className="ml-2 text-xl font-medium text-slate-300">
                      m²
                    </span>
                  </div>

                </div>


                {/* ZAPAS / ILOŚĆ */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl bg-white/10 p-5">

                    <div className="text-sm text-slate-300">
                      Powierzchnia z zapasem
                    </div>

                    <div className="mt-1 text-xl font-bold">
                      {formatNumber(areaWithReserve)} m²
                    </div>

                  </div>


                  <div className="rounded-2xl bg-blue-500/10 p-5">

                    <div className="text-sm text-blue-200">
                      Szacowana liczba sztuk
                    </div>

                    <div className="mt-1 text-2xl font-bold text-blue-100">
                      {estimatedPieces.toLocaleString("pl-PL")} szt.
                    </div>

                  </div>

                </div>


                {/* ZAPAS */}

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Podsumowanie
                  </div>

                  <div className="mt-3 space-y-3 text-sm">

                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Podstawowa powierzchnia
                      </span>

                      <strong>
                        {formatNumber(area)} m²
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Zapas
                      </span>

                      <strong>
                        {formatNumber(reservePercent, 1)}%
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Dodatkowa powierzchnia
                      </span>

                      <strong>
                        {formatNumber(extraArea)} m²
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Zużycie kostki
                      </span>

                      <strong>
                        {formatNumber(pieces, 0)} szt./m²
                      </strong>

                    </div>

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
                    Wynik liczby sztuk jest orientacyjny. Rzeczywiste
                    zapotrzebowanie zależy między innymi od wymiarów
                    konkretnej kostki, sposobu ułożenia, docinek
                    oraz kształtu powierzchni.
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>


        {/* SEO */}

        <article className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-2xl font-bold">
            Kalkulator kostki brukowej – jak obliczyć ilość materiału?
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Aby obliczyć ilość kostki brukowej, najpierw trzeba
            określić powierzchnię, którą chcesz wybrukować. Dla
            prostokątnej powierzchni wystarczy pomnożyć długość
            przez szerokość.
          </p>


          <div className="mt-6 rounded-2xl bg-slate-50 p-5">

            <div className="font-semibold">
              Wzór na powierzchnię:
            </div>

            <div className="mt-3 font-mono text-sm text-slate-600">
              powierzchnia = długość × szerokość
            </div>


            <div className="mt-5 font-semibold">
              Powierzchnia z zapasem:
            </div>

            <div className="mt-3 font-mono text-sm text-slate-600">
              powierzchnia z zapasem = powierzchnia × (1 + zapas ÷ 100)
            </div>


            <div className="mt-5 font-semibold">
              Liczba sztuk:
            </div>

            <div className="mt-3 font-mono text-sm text-slate-600">
              sztuki = powierzchnia z zapasem × sztuki na 1 m²
            </div>

          </div>


          <h3 className="mt-8 text-xl font-bold">
            Ile kostki brukowej na 1 m²?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Liczba sztuk przypadających na metr kwadratowy zależy
            od wymiarów i kształtu konkretnej kostki. Dlatego najlepiej
            korzystać z informacji podanej przez producenta lub
            sprzedawcę danego produktu.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Jaki zapas kostki brukowej przyjąć?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Zapas powinien uwzględniać przede wszystkim docinki,
            sposób ułożenia oraz kształt powierzchni. Przy prostym
            prostokątnym podjeździe straty mogą być inne niż przy
            powierzchni z wieloma narożnikami i łukami.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Przykład obliczenia
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Dla powierzchni 12 × 4 m otrzymujemy 48 m².
            Przy 7% zapasu potrzebna powierzchnia materiału wynosi
            51,36 m². Jeżeli dana kostka wymaga 36 sztuk na 1 m²,
            orientacyjna liczba sztuk wynosi około 1849.
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
              href="/budowa-remont/farba"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Kalkulator farby →
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
            FAQ – kalkulator kostki brukowej
          </h3>


          <div className="mt-5 space-y-6">

            <div>

              <h4 className="font-semibold">
                Jak obliczyć powierzchnię pod kostkę brukową?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Dla prostokątnej powierzchni pomnóż jej długość
                przez szerokość. Przy bardziej skomplikowanym kształcie
                podziel powierzchnię na kilka prostszych figur i dodaj
                ich pola.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Ile kostki potrzebuję na podjazd?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Zależy to od powierzchni podjazdu oraz liczby sztuk
                przypadających na 1 m² konkretnego produktu.
                Kalkulator pozwala uwzględnić oba parametry.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Po co dodawać zapas?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Zapas pozwala uwzględnić docinki, odpady i ewentualne
                uszkodzenia materiału. Jego wysokość zależy od
                konkretnego projektu.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy kalkulator podaje dokładną liczbę kostek?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Wynik jest orientacyjny. Dokładne zapotrzebowanie
                może zależeć od wymiarów kostki, wzoru ułożenia
                i ilości docinek.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy mogę używać przecinka zamiast kropki?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Kalkulator obsługuje oba sposoby zapisu liczb
                dziesiętnych.
              </p>

            </div>

          </div>


          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">

            <div className="font-semibold text-amber-900">
              Ważne
            </div>

            <p className="mt-2 text-sm leading-7 text-amber-800">
              Kalkulator służy do orientacyjnego oszacowania
              powierzchni i ilości materiału. Przed zamówieniem
              warto porównać wynik z informacjami producenta
              konkretnej kostki brukowej.
            </p>

          </div>

        </article>

      </div>
    </CalculatorLayout>
  );
}