"use client";

import Link from "next/link";
import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import FaqSchema from "@/components/FaqSchema";
import { parseNumber } from "@/lib/number";

function formatNumber(value: number, digits = 2) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

const faqItems = [
  {
    question: "Jak obliczyć koszt przejazdu samochodem?",
    answer:
      "Pomnóż dystans przez średnie spalanie i podziel przez 100, aby otrzymać potrzebną ilość paliwa. Następnie pomnóż wynik przez cenę jednego litra.",
  },
  {
    question: "Ile kosztuje przejechanie 100 km?",
    answer:
      "Pomnóż spalanie samochodu przez cenę jednego litra paliwa. Przykładowo 7,5 l/100 km przy cenie 6,50 zł/l daje 48,75 zł za 100 km.",
  },
  {
    question: "Czy kalkulator działa dla LPG i diesla?",
    answer:
      "Tak. Wystarczy podać spalanie konkretnego paliwa oraz jego aktualną cenę za litr.",
  },
  {
    question: "Czy mogę wpisać 6,50 zamiast 6.50?",
    answer:
      "Tak. Kalkulator obsługuje zarówno przecinek, jak i kropkę jako separator dziesiętny.",
  },
];

export default function KosztPaliwaPage() {
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [price, setPrice] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  const km = parseNumber(distance);
  const lPer100 = parseNumber(consumption);
  const fuelPrice = parseNumber(price);

  const valid =
    km > 0 &&
    lPer100 > 0 &&
    fuelPrice > 0;

  const liters = valid
    ? (km * lPer100) / 100
    : 0;

  const totalCost = valid
    ? liters * fuelPrice
    : 0;

  const costPer100 = valid
    ? lPer100 * fuelPrice
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
    setDistance("500");
    setConsumption("7,5");
    setPrice("6,50");
    setCalculated(false);
    setCopied(false);
  }

  function handleReset() {
    setDistance("");
    setConsumption("");
    setPrice("");
    setCalculated(false);
    setCopied(false);
  }

  async function handleCopy() {
    if (!calculated) {
      return;
    }

    const text = [
      `Dystans: ${formatNumber(km, 1)} km`,
      `Spalanie: ${formatNumber(lPer100)} l/100 km`,
      `Cena paliwa: ${formatNumber(fuelPrice)} zł/l`,
      `Potrzebne paliwo: ${formatNumber(liters)} l`,
      `Koszt 100 km: ${formatNumber(costPer100)} zł`,
      `Koszt przejazdu: ${formatNumber(totalCost)} zł`,
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
      icon="💰"
      title="Kalkulator kosztu paliwa – koszt przejazdu"
      description="Oblicz ilość potrzebnego paliwa, koszt przejechania 100 km oraz całkowity koszt trasy."
      categoryName="Motoryzacja"
      categoryHref="/motoryzacja"
      related={[
        {
          icon: "⛽",
          title: "Kalkulator spalania",
          href: "/motoryzacja/spalanie",
        },
        {
          icon: "🚗",
          title: "Kalkulator kosztu przejazdu",
          href: "/motoryzacja/koszt-przejazdu",
        },
        {
          icon: "🛞",
          title: "Kalkulator opon",
          href: "/motoryzacja/opony",
        },
      ]}
    >
      <FaqSchema items={faqItems} />

      <CalculatorTracker
        calculator="koszt-paliwa"
        isCalculated={calculated}
      />

      <div className="mx-auto max-w-5xl">

        {/* WPROWADZENIE */}

        <div className="mb-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-7">

          <h2 className="text-xl font-bold text-slate-950">
            Sprawdź, ile będzie kosztować przejazd
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Podaj długość trasy, średnie spalanie samochodu oraz
            cenę paliwa. Kalkulator wyliczy potrzebną ilość paliwa,
            koszt przejechania 100 km oraz całkowity koszt podróży.
          </p>

        </div>


        {/* KALKULATOR */}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* FORMULARZ */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-xl font-bold">
              Dane przejazdu
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Możesz używać przecinka lub kropki jako separatora
              dziesiętnego.
            </p>


            <div className="mt-7 space-y-5">

              {/* DYSTANS */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Dystans
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={distance}
                    onChange={(e) => {
                      setDistance(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 500"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    km
                  </span>

                </div>

              </div>


              {/* SPALANIE */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Średnie spalanie
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={consumption}
                    onChange={(e) => {
                      setConsumption(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 7,5"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-24 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    l/100 km
                  </span>

                </div>

              </div>


              {/* CENA */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Cena paliwa
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 6,50"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    zł/l
                  </span>

                </div>

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
              💡 Przykład: 500 km, spalanie 7,5 l/100 km i paliwo
              po 6,50 zł/l.
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
                    💰
                  </div>

                  <p className="mt-5 text-slate-300">
                    Wprowadź dane i kliknij „Oblicz”.
                  </p>

                </div>

              </div>

            ) : (

              <div className="mt-7 space-y-4">

                {/* GŁÓWNY WYNIK */}

                <div className="rounded-2xl bg-white/10 p-6">

                  <div className="text-sm text-slate-300">
                    Całkowity koszt paliwa
                  </div>

                  <div className="mt-2 text-5xl font-extrabold tracking-tight">
                    {formatNumber(totalCost)}

                    <span className="ml-2 text-xl font-medium text-slate-300">
                      zł
                    </span>

                  </div>

                </div>


                {/* SZCZEGÓŁY */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl bg-white/10 p-5">

                    <div className="text-sm text-slate-300">
                      Potrzebne paliwo
                    </div>

                    <div className="mt-1 text-xl font-bold">
                      {formatNumber(liters)} l
                    </div>

                  </div>


                  <div className="rounded-2xl bg-blue-500/10 p-5">

                    <div className="text-sm text-blue-200">
                      Koszt 100 km
                    </div>

                    <div className="mt-1 text-xl font-bold text-blue-100">
                      {formatNumber(costPer100)} zł
                    </div>

                  </div>

                </div>


                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Podsumowanie
                  </div>

                  <div className="mt-3 space-y-3 text-sm">

                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">
                        Dystans
                      </span>

                      <strong>
                        {formatNumber(km, 1)} km
                      </strong>
                    </div>


                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">
                        Spalanie
                      </span>

                      <strong>
                        {formatNumber(lPer100)} l/100 km
                      </strong>
                    </div>


                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">
                        Cena paliwa
                      </span>

                      <strong>
                        {formatNumber(fuelPrice)} zł/l
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

              </div>

            )}

          </div>

        </div>


        {/* SEO */}

        <article className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-2xl font-bold">
            Jak obliczyć koszt paliwa?
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Do obliczenia kosztu paliwa potrzebujesz trzech danych:
            długości trasy, średniego spalania samochodu oraz ceny
            jednego litra paliwa.
          </p>


          <div className="mt-6 rounded-2xl bg-slate-50 p-5">

            <div className="font-semibold">
              Ilość potrzebnego paliwa:
            </div>

            <div className="mt-3 font-mono text-sm text-slate-600">
              paliwo = dystans × spalanie ÷ 100
            </div>


            <div className="mt-5 font-semibold">
              Koszt przejazdu:
            </div>

            <div className="mt-3 font-mono text-sm text-slate-600">
              koszt = ilość paliwa × cena za litr
            </div>

          </div>


          <h3 className="mt-8 text-xl font-bold">
            Przykład: 500 km
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Przy dystansie 500 km, spalaniu 7,5 l/100 km oraz cenie
            6,50 zł/l samochód zużyje 37,5 litra paliwa.
            Koszt przejazdu wyniesie 243,75 zł.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Ile kosztuje przejechanie 100 km?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Koszt 100 km zależy przede wszystkim od spalania
            samochodu oraz ceny paliwa. Przy spalaniu 7,5 l/100 km
            i cenie 6,50 zł/l koszt wynosi 48,75 zł na każde 100 km.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Koszt różnych długości tras
          </h3>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">

            <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold">
              <div>Trasa</div>
              <div>Paliwo</div>
              <div>Koszt</div>
            </div>

            <div className="grid grid-cols-3 border-b border-slate-200 px-4 py-3 text-sm">
              <div>100 km</div>
              <div>7,50 l</div>
              <div>48,75 zł</div>
            </div>

            <div className="grid grid-cols-3 border-b border-slate-200 px-4 py-3 text-sm">
              <div>500 km</div>
              <div>37,50 l</div>
              <div>243,75 zł</div>
            </div>

            <div className="grid grid-cols-3 px-4 py-3 text-sm">
              <div>1000 km</div>
              <div>75,00 l</div>
              <div>487,50 zł</div>
            </div>

          </div>


          {/* LINKOWANIE */}

          <div className="mt-7 flex flex-wrap gap-3">

            <Link
              href="/motoryzacja/spalanie"
              className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
            >
              Oblicz spalanie samochodu →
            </Link>


            <Link
              href="/motoryzacja/koszt-przejazdu"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Oblicz koszt przejazdu →
            </Link>


            <Link
              href="/motoryzacja/opony"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Sprawdź rozmiar opon →
            </Link>

          </div>


          {/* FAQ */}

          <h3 className="mt-10 text-xl font-bold">
            FAQ – koszt paliwa
          </h3>


          <div className="mt-5 space-y-6">

            <div>

              <h4 className="font-semibold">
                Jak obliczyć koszt przejazdu samochodem?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Pomnóż dystans przez średnie spalanie i podziel
                przez 100, aby otrzymać potrzebną ilość paliwa.
                Następnie pomnóż wynik przez cenę jednego litra.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Ile kosztuje przejechanie 100 km?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Pomnóż spalanie samochodu przez cenę jednego litra
                paliwa. Przykładowo 7,5 l/100 km przy cenie
                6,50 zł/l daje 48,75 zł za 100 km.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy kalkulator działa dla LPG i diesla?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Wystarczy podać spalanie konkretnego paliwa
                oraz jego aktualną cenę za litr.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy mogę wpisać 6,50 zamiast 6.50?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Kalkulator obsługuje zarówno przecinek,
                jak i kropkę jako separator dziesiętny.
              </p>

            </div>

          </div>


          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <div className="font-semibold">
              Ważne
            </div>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              Wynik jest obliczeniem na podstawie podanych danych.
              Rzeczywisty koszt podróży może być wyższy, jeśli
              uwzględnisz dodatkowe wydatki, takie jak opłaty drogowe,
              parkingi lub inne koszty związane z trasą.
            </p>

          </div>

        </article>

      </div>
    </CalculatorLayout>
  );
}