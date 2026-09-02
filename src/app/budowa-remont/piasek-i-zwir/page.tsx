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

export default function PiasekZwirPage() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [density, setDensity] = useState("1.6");
  const [reserve, setReserve] = useState("10");

  const [calculated, setCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  const l = parseNumber(length);
  const w = parseNumber(width);
  const h = parseNumber(height);
  const densityValue = parseNumber(density);
  const reservePercent = parseNumber(reserve);

  const volume =
    l > 0 && w > 0 && h > 0
      ? l * w * h
      : 0;

  const valid =
    volume > 0 &&
    densityValue > 0 &&
    reservePercent >= 0;

  const volumeWithReserve = valid
    ? volume * (1 + reservePercent / 100)
    : 0;

  const estimatedWeight = valid
    ? volumeWithReserve * densityValue
    : 0;

  const baseWeight = valid
    ? volume * densityValue
    : 0;

  const extraVolume = valid
    ? volumeWithReserve - volume
    : 0;

  const extraWeight = valid
    ? estimatedWeight - baseWeight
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
    setLength("10");
    setWidth("5");
    setHeight("0,15");
    setDensity("1,6");
    setReserve("10");
    setCalculated(false);
    setCopied(false);
  }

  function handleReset() {
    setLength("");
    setWidth("");
    setHeight("");
    setDensity("1.6");
    setReserve("10");
    setCalculated(false);
    setCopied(false);
  }

  async function handleCopy() {
    if (!calculated) {
      return;
    }

    const text = [
      `Wymiary: ${formatNumber(l, 2)} × ${formatNumber(w, 2)} × ${formatNumber(h, 2)} m`,
      `Objętość: ${formatNumber(volume)} m³`,
      `Gęstość: ${formatNumber(densityValue)} t/m³`,
      `Zapas: ${formatNumber(reservePercent, 1)}%`,
      `Objętość z zapasem: ${formatNumber(volumeWithReserve)} m³`,
      `Orientacyjna masa: ${formatNumber(estimatedWeight)} t`,
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
      icon="🪨"
      title="Kalkulator piasku i żwiru – m³ i tony"
      description="Oblicz objętość piasku, żwiru lub kruszywa oraz orientacyjną masę materiału potrzebną do wykonania prac."
      categoryName="Budowa i remont"
      categoryHref="/budowa-remont"
      related={[
        {
          icon: "🏗️",
          title: "Kalkulator betonu",
          href: "/budowa-remont/beton",
        },
        {
          icon: "🧱",
          title: "Kalkulator cementu",
          href: "/budowa-remont/cement",
        },
        {
          icon: "🧱",
          title: "Kalkulator kostki brukowej",
          href: "/budowa-remont/kostka-brukowa",
        },
      ]}
    >
      <CalculatorTracker
        calculator="piasek-i-zwir"
        isCalculated={calculated}
      />

      <div className="mx-auto max-w-5xl">

        {/* WPROWADZENIE */}

        <div className="mb-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-7">

          <h2 className="text-xl font-bold text-slate-950">
            Oblicz, ile piasku lub żwiru potrzebujesz
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Podaj wymiary warstwy, orientacyjną gęstość materiału
            i zapas. Kalkulator wyliczy objętość w metrach sześciennych
            oraz orientacyjną masę w tonach.
          </p>

        </div>


        {/* KALKULATOR */}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* FORMULARZ */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-xl font-bold">
              Wymiary i materiał
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Możesz wpisywać wartości z przecinkiem lub kropką.
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
                    placeholder="np. 10"
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
                    placeholder="np. 5"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    m
                  </span>

                </div>

              </div>


              {/* GRUBOŚĆ */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Grubość warstwy
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
                    placeholder="np. 0,15"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    m
                  </span>

                </div>

              </div>


              {/* GĘSTOŚĆ */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Gęstość materiału
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={density}
                    onChange={(e) => {
                      setDensity(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 1,6"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-20 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    t/m³
                  </span>

                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Gęstość zależy od rodzaju materiału i jego wilgotności.
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
                    placeholder="np. 10"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    %
                  </span>

                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Zapas pomaga uwzględnić nierówności, straty
                  i różnice w rzeczywistym zużyciu materiału.
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
              💡 Przykład: warstwa 10 × 5 × 0,15 m ma objętość
              7,50 m³.
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
                    🪨
                  </div>

                  <p className="mt-5 text-slate-300">
                    Wprowadź wymiary i kliknij „Oblicz”.
                  </p>

                </div>

              </div>

            ) : (

              <div className="mt-7 space-y-4">

                {/* OBJĘTOŚĆ */}

                <div className="rounded-2xl bg-white/10 p-6">

                  <div className="text-sm text-slate-300">
                    Objętość z zapasem
                  </div>

                  <div className="mt-2 text-5xl font-extrabold tracking-tight">

                    {formatNumber(volumeWithReserve)}

                    <span className="ml-2 text-xl font-medium text-slate-300">
                      m³
                    </span>

                  </div>

                </div>


                {/* MASA */}

                <div className="rounded-2xl bg-blue-500/10 p-5">

                  <div className="text-sm text-blue-200">
                    Orientacyjna masa
                  </div>

                  <div className="mt-1 text-3xl font-bold text-blue-100">
                    {formatNumber(estimatedWeight)} t
                  </div>

                </div>


                {/* BEZ ZAPASU */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl bg-white/10 p-5">

                    <div className="text-sm text-slate-300">
                      Objętość bez zapasu
                    </div>

                    <div className="mt-1 text-xl font-bold">
                      {formatNumber(volume)} m³
                    </div>

                  </div>


                  <div className="rounded-2xl bg-white/10 p-5">

                    <div className="text-sm text-slate-300">
                      Masa bez zapasu
                    </div>

                    <div className="mt-1 text-xl font-bold">
                      {formatNumber(baseWeight)} t
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
                        Wymiary
                      </span>

                      <strong>
                        {formatNumber(l)} ×{" "}
                        {formatNumber(w)} ×{" "}
                        {formatNumber(h)} m
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Gęstość
                      </span>

                      <strong>
                        {formatNumber(densityValue)} t/m³
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
                        Dodatkowa objętość
                      </span>

                      <strong>
                        {formatNumber(extraVolume)} m³
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Dodatkowa masa
                      </span>

                      <strong>
                        {formatNumber(extraWeight)} t
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
                    Masa jest orientacyjna. Rzeczywista masa materiału
                    może się różnić w zależności od rodzaju kruszywa,
                    uziarnienia, wilgotności i stopnia zagęszczenia.
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>


        {/* SEO */}

        <article className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-2xl font-bold">
            Kalkulator piasku i żwiru – jak obliczyć ilość materiału?
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Do obliczenia ilości piasku, żwiru lub innego kruszywa
            potrzebujesz wymiarów powierzchni oraz planowanej
            grubości warstwy. Na tej podstawie można obliczyć
            objętość materiału w metrach sześciennych.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Jak obliczyć objętość piasku lub żwiru?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Dla prostokątnej warstwy wystarczy pomnożyć długość,
            szerokość i grubość.
          </p>

          <div className="mt-5 rounded-2xl bg-slate-50 p-5 font-mono text-sm leading-7 text-slate-600">
            objętość = długość × szerokość × grubość
          </div>


          <h3 className="mt-8 text-xl font-bold">
            Jak przeliczyć m³ na tony?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Jeżeli znasz orientacyjną gęstość materiału, możesz
            pomnożyć objętość przez gęstość, otrzymując przybliżoną
            masę.
          </p>

          <div className="mt-5 rounded-2xl bg-slate-50 p-5 font-mono text-sm leading-7 text-slate-600">
            masa = objętość × gęstość
          </div>


          <h3 className="mt-8 text-xl font-bold">
            Przykład – warstwa 10 × 5 × 0,15 m
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Powierzchnia 10 × 5 m przy grubości 15 cm ma objętość
            7,50 m³. Przy założonej gęstości 1,6 t/m³ daje to
            około 12 ton materiału przed uwzględnieniem zapasu.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Ile piasku lub żwiru zamówić?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Warto uwzględnić zapas, ponieważ rzeczywiste zużycie
            może zależeć od nierówności podłoża, sposobu rozłożenia
            materiału oraz jego zagęszczenia. Ostateczną ilość
            najlepiej dopasować do konkretnego projektu.
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
              href="/budowa-remont/cement"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Kalkulator cementu →
            </Link>


            <Link
              href="/budowa-remont/kostka-brukowa"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Kalkulator kostki brukowej →
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
            FAQ – kalkulator piasku i żwiru
          </h3>


          <div className="mt-5 space-y-6">

            <div>

              <h4 className="font-semibold">
                Jak obliczyć, ile piasku potrzeba?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Oblicz objętość warstwy, mnożąc długość, szerokość
                i jej grubość. Następnie możesz dodać zapas.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Ile waży 1 m³ piasku lub żwiru?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Zależy to od rodzaju materiału, jego wilgotności
                i innych właściwości. Dlatego kalkulator pozwala
                samodzielnie podać przyjętą gęstość.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Jak przeliczyć piasek z ton na metry sześcienne?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Do przeliczenia potrzebna jest gęstość materiału.
                Dzieląc masę przez gęstość otrzymasz orientacyjną
                objętość.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy kalkulator uwzględnia zapas?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Możesz ustawić własny procent zapasu, który
                zostanie doliczony do podstawowej objętości.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy można obliczyć kruszywo na podjazd?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Wprowadź długość i szerokość podjazdu oraz
                planowaną grubość warstwy kruszywa.
              </p>

            </div>

          </div>


          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">

            <div className="font-semibold text-amber-900">
              Ważne
            </div>

            <p className="mt-2 text-sm leading-7 text-amber-800">
              Wynik masy ma charakter orientacyjny. Gęstość materiału
              może różnić się w zależności od jego rodzaju, wilgotności
              i sposobu zagęszczenia.
            </p>

          </div>

        </article>

      </div>
    </CalculatorLayout>
  );
}