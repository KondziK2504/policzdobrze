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

export default function PlytkiPage() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [tileLength, setTileLength] = useState("");
  const [tileWidth, setTileWidth] = useState("");
  const [reserve, setReserve] = useState("10");

  const [calculated, setCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  const areaLength = parseNumber(length);
  const areaWidth = parseNumber(width);
  const tileL = parseNumber(tileLength);
  const tileW = parseNumber(tileWidth);
  const reservePercent = parseNumber(reserve);

  const area =
    areaLength > 0 && areaWidth > 0
      ? areaLength * areaWidth
      : 0;

  const tileArea =
    tileL > 0 && tileW > 0
      ? (tileL / 100) * (tileW / 100)
      : 0;

  const valid =
    area > 0 &&
    tileArea > 0 &&
    reservePercent >= 0;

  const tilesWithoutReserve = valid
    ? Math.ceil(area / tileArea)
    : 0;

  const areaWithReserve = valid
    ? area * (1 + reservePercent / 100)
    : 0;

  const tilesWithReserve = valid
    ? Math.ceil(
        tilesWithoutReserve *
          (1 + reservePercent / 100),
      )
    : 0;

  const extraTiles = valid
    ? tilesWithReserve - tilesWithoutReserve
    : 0;

  const tileCoverage =
    tileArea > 0
      ? tileArea
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
    setLength("4");
    setWidth("3");
    setTileLength("60");
    setTileWidth("60");
    setReserve("10");
    setCalculated(false);
    setCopied(false);
  }

  function handleReset() {
    setLength("");
    setWidth("");
    setTileLength("");
    setTileWidth("");
    setReserve("10");
    setCalculated(false);
    setCopied(false);
  }

  async function handleCopy() {
    if (!calculated) {
      return;
    }

    const text = [
      `Powierzchnia: ${formatNumber(area)} m²`,
      `Płytka: ${formatNumber(tileL, 1)} × ${formatNumber(tileW, 1)} cm`,
      `Powierzchnia jednej płytki: ${formatNumber(tileCoverage, 4)} m²`,
      `Zapas: ${formatNumber(reservePercent, 1)}%`,
      `Powierzchnia z zapasem: ${formatNumber(areaWithReserve)} m²`,
      `Płytki bez zapasu: ${tilesWithoutReserve} szt.`,
      `Płytki z zapasem: ${tilesWithReserve} szt.`,
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
      title="Kalkulator płytek – ile płytek potrzebujesz?"
      description="Oblicz powierzchnię do wykończenia, liczbę potrzebnych płytek oraz zapas na docinki i uszkodzenia."
      categoryName="Budowa i remont"
      categoryHref="/budowa-remont"
      related={[
        {
          icon: "🎨",
          title: "Kalkulator farby",
          href: "/budowa-remont/farba",
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
        calculator="plytki"
        isCalculated={calculated}
      />

      <div className="mx-auto max-w-5xl">

        {/* WPROWADZENIE */}

        <div className="mb-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-7">

          <h2 className="text-xl font-bold text-slate-950">
            Oblicz, ile płytek potrzebujesz
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Podaj wymiary powierzchni oraz rozmiar jednej płytki.
            Kalkulator wyliczy powierzchnię, liczbę płytek bez zapasu
            i ilość potrzebną po uwzględnieniu docinek oraz odpadów.
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
                  Długość powierzchni
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
                    placeholder="np. 4"
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
                  Szerokość powierzchni
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
                    placeholder="np. 3"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    m
                  </span>

                </div>

              </div>


              {/* ROZMIAR PŁYTKI */}

              <div className="border-t border-slate-200 pt-5">

                <div className="mb-4 font-semibold">
                  Rozmiar jednej płytki
                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                  {/* DŁUGOŚĆ PŁYTKI */}

                  <div>

                    <label className="mb-2 block text-sm font-medium text-slate-600">
                      Długość płytki
                    </label>

                    <div className="relative">

                      <input
                        type="text"
                        inputMode="decimal"
                        value={tileLength}
                        onChange={(e) => {
                          setTileLength(e.target.value);
                          setCalculated(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleCalculate();
                          }
                        }}
                        placeholder="np. 60"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />

                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                        cm
                      </span>

                    </div>

                  </div>


                  {/* SZEROKOŚĆ PŁYTKI */}

                  <div>

                    <label className="mb-2 block text-sm font-medium text-slate-600">
                      Szerokość płytki
                    </label>

                    <div className="relative">

                      <input
                        type="text"
                        inputMode="decimal"
                        value={tileWidth}
                        onChange={(e) => {
                          setTileWidth(e.target.value);
                          setCalculated(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleCalculate();
                          }
                        }}
                        placeholder="np. 60"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />

                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                        cm
                      </span>

                    </div>

                  </div>

                </div>

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
                    placeholder="np. 10"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    %
                  </span>

                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Większy zapas może być potrzebny przy skomplikowanym
                  wzorze, wielu docinkach lub nieregularnej powierzchni.
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
              💡 Dla płytek 60 × 60 cm jedna sztuka pokrywa
              0,36 m² powierzchni.
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


                {/* PŁYTKI */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl bg-white/10 p-5">

                    <div className="text-sm text-slate-300">
                      Bez zapasu
                    </div>

                    <div className="mt-1 text-2xl font-bold">
                      {tilesWithoutReserve.toLocaleString("pl-PL")} szt.
                    </div>

                  </div>


                  <div className="rounded-2xl bg-blue-500/10 p-5">

                    <div className="text-sm text-blue-200">
                      Z zapasem
                    </div>

                    <div className="mt-1 text-2xl font-bold text-blue-100">
                      {tilesWithReserve.toLocaleString("pl-PL")} szt.
                    </div>

                  </div>

                </div>


                {/* POWIERZCHNIA Z ZAPASEM */}

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Powierzchnia z zapasem
                  </div>

                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(areaWithReserve)} m²
                  </div>

                </div>


                {/* SZCZEGÓŁY */}

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Szczegóły
                  </div>

                  <div className="mt-3 space-y-3 text-sm">

                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Rozmiar płytki
                      </span>

                      <strong>
                        {formatNumber(tileL, 1)} × {formatNumber(tileW, 1)} cm
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Powierzchnia jednej płytki
                      </span>

                      <strong>
                        {formatNumber(tileCoverage, 4)} m²
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
                        Dodatkowe płytki
                      </span>

                      <strong>
                        {extraTiles.toLocaleString("pl-PL")} szt.
                      </strong>

                    </div>

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


                <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">

                  <div className="font-semibold text-amber-200">
                    Ważne
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Wynik jest orientacyjny. Rzeczywiste zapotrzebowanie
                    może zależeć od sposobu ułożenia, szerokości fug,
                    liczby docinek, wzoru oraz ewentualnych uszkodzeń.
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>


        {/* SEO */}

        <article className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-2xl font-bold">
            Kalkulator płytek – jak obliczyć potrzebną ilość?
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Aby obliczyć liczbę potrzebnych płytek, trzeba najpierw
            określić powierzchnię podłogi, ściany lub innej powierzchni,
            a następnie sprawdzić, ile miejsca zajmuje jedna płytka.
            Do wyniku warto doliczyć zapas.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Jak obliczyć powierzchnię?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Dla prostokątnej powierzchni wystarczy pomnożyć jej
            długość przez szerokość.
          </p>


          <div className="mt-5 rounded-2xl bg-slate-50 p-5 font-mono text-sm leading-7 text-slate-600">
            powierzchnia = długość × szerokość
          </div>


          <h3 className="mt-8 text-xl font-bold">
            Jak obliczyć powierzchnię płytki?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Wymiary płytki podajemy tutaj w centymetrach, dlatego
            najpierw trzeba zamienić je na metry.
          </p>


          <div className="mt-5 rounded-2xl bg-slate-50 p-5 font-mono text-sm leading-7 text-slate-600">
            60 cm = 0,60 m
            <br />
            60 cm = 0,60 m
            <br />
            0,60 × 0,60 = 0,36 m²
          </div>


          <h3 className="mt-8 text-xl font-bold">
            Jak obliczyć liczbę płytek?
          </h3>

          <div className="mt-5 rounded-2xl bg-slate-50 p-5 font-mono text-sm leading-7 text-slate-600">
            liczba płytek = powierzchnia ÷ powierzchnia jednej płytki
          </div>


          <h3 className="mt-8 text-xl font-bold">
            Ile płytek kupić z zapasem?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Liczba potrzebnych płytek powinna uwzględniać docinki,
            odpady i ewentualne uszkodzenia. Zapas powinien być
            dopasowany do konkretnego pomieszczenia i sposobu
            układania płytek.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Przykład: łazienka 4 × 3 m i płytki 60 × 60 cm
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Powierzchnia wynosi 12 m². Jedna płytka 60 × 60 cm
            zajmuje 0,36 m², więc bez zapasu potrzeba 34 sztuk.
            Przy 10% zapasu kalkulator zaokrągla wynik do pełnych
            płytek.
          </p>


          {/* LINKI */}

          <div className="mt-7 flex flex-wrap gap-3">

            <Link
              href="/budowa-remont/farba"
              className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
            >
              Kalkulator farby →
            </Link>


            <Link
              href="/budowa-remont/kostka-brukowa"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Kalkulator kostki brukowej →
            </Link>


            <Link
              href="/budowa-remont/beton"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Kalkulator betonu →
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
            FAQ – kalkulator płytek
          </h3>


          <div className="mt-5 space-y-6">

            <div>

              <h4 className="font-semibold">
                Jak obliczyć, ile płytek potrzeba na podłogę?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Oblicz powierzchnię podłogi, oblicz powierzchnię
                jednej płytki i podziel pierwszą wartość przez drugą.
                Następnie dolicz zapas na docinki i odpady.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Ile płytek 60 × 60 cm potrzeba na 1 m²?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Jedna płytka 60 × 60 cm ma powierzchnię 0,36 m²,
                dlatego na jeden metr kwadratowy potrzeba matematycznie
                około 2,78 płytki. Przy zakupie trzeba oczywiście
                zaokrąglić liczbę do pełnych sztuk i uwzględnić zapas.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Jaki zapas płytek kupić?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Zależy to od kształtu pomieszczenia, wzoru ułożenia
                i liczby koniecznych docinek. Im więcej skomplikowanych
                cięć, tym większe może być zużycie materiału.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy szerokość fugi wpływa na ilość płytek?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Na dokładne rozplanowanie ułożenia może wpływać,
                ponieważ zmienia rzeczywiste rozmieszczenie kolejnych
                płytek. Ten kalkulator wykorzystuje powierzchnię
                geometryczną i nie modeluje szerokości fug.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy kalkulator działa dla płytek ściennych i podłogowych?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Matematyczne obliczenie powierzchni i liczby
                płytek jest takie samo dla obu zastosowań.
              </p>

            </div>

          </div>


          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">

            <div className="font-semibold text-amber-900">
              Ważne
            </div>

            <p className="mt-2 text-sm leading-7 text-amber-800">
              Kalkulator wykonuje obliczenia orientacyjne. Przy zakupie
              płytek warto uwzględnić zalecenia producenta oraz
              specyfikę konkretnego projektu.
            </p>

          </div>

        </article>

      </div>
    </CalculatorLayout>
  );
}