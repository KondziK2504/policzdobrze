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
    question: "Czy mogę obliczyć koszt podróży tam i z powrotem?",
    answer:
      "Tak. Zaznacz opcję podróży w obie strony, a podany dystans zostanie automatycznie podwojony.",
  },
  {
    question: "Czy można podzielić koszt paliwa na pasażerów?",
    answer:
      "Tak. Podaj liczbę osób, a kalkulator pokaże koszt przypadający na jedną osobę.",
  },
  {
    question: "Czy kalkulator działa dla LPG?",
    answer:
      "Tak. Wystarczy podać spalanie LPG oraz cenę gazu za litr.",
  },
  {
    question: "Czy koszt przejazdu obejmuje autostrady i parkingi?",
    answer:
      "Nie. Kalkulator oblicza koszt paliwa. Opłaty drogowe, parkingi i inne wydatki należy uwzględnić osobno.",
  },
];

export default function KosztPrzejazduPage() {
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [people, setPeople] = useState("1");
  const [roundTrip, setRoundTrip] = useState(false);

  const [calculated, setCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  const km = parseNumber(distance);
  const lPer100 = parseNumber(consumption);
  const price = parseNumber(fuelPrice);
  const persons = Math.floor(parseNumber(people));

  const valid =
    km > 0 &&
    lPer100 > 0 &&
    price > 0 &&
    persons >= 1;

  const totalDistance = roundTrip
    ? km * 2
    : km;

  const litersNeeded = valid
    ? (totalDistance * lPer100) / 100
    : 0;

  const totalCost = valid
    ? litersNeeded * price
    : 0;

  const costPer100 = valid
    ? lPer100 * price
    : 0;

  const costPerPerson = valid
    ? totalCost / persons
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
    setFuelPrice("6,50");
    setPeople("2");
    setRoundTrip(false);
    setCalculated(false);
    setCopied(false);
  }

  function handleReset() {
    setDistance("");
    setConsumption("");
    setFuelPrice("");
    setPeople("1");
    setRoundTrip(false);
    setCalculated(false);
    setCopied(false);
  }

  async function handleCopy() {
    if (!calculated) {
      return;
    }

    const text = [
      `Dystans: ${formatNumber(totalDistance, 1)} km`,
      `Spalanie: ${formatNumber(lPer100)} l/100 km`,
      `Cena paliwa: ${formatNumber(price)} zł/l`,
      `Potrzebne paliwo: ${formatNumber(litersNeeded)} l`,
      `Koszt całkowity: ${formatNumber(totalCost)} zł`,
      `Liczba osób: ${persons}`,
      `Koszt na osobę: ${formatNumber(costPerPerson)} zł`,
      roundTrip
        ? "Podróż: w obie strony"
        : "Podróż: w jedną stronę",
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
      icon="🚗"
      title="Kalkulator kosztu przejazdu – koszt trasy"
      description="Oblicz koszt przejazdu samochodem, potrzebną ilość paliwa oraz koszt przypadający na jedną osobę."
      categoryName="Motoryzacja"
      categoryHref="/motoryzacja"
      related={[
        {
          icon: "⛽",
          title: "Kalkulator spalania",
          href: "/motoryzacja/spalanie",
        },
        {
          icon: "💰",
          title: "Kalkulator kosztu paliwa",
          href: "/motoryzacja/koszt-paliwa",
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
        calculator="koszt-przejazdu"
        isCalculated={calculated}
      />

      <div className="mx-auto max-w-5xl">

        {/* WPROWADZENIE */}

        <div className="mb-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-7">

          <h2 className="text-xl font-bold text-slate-950">
            Sprawdź koszt całej trasy
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Podaj dystans, średnie spalanie i cenę paliwa.
            Możesz również określić liczbę osób oraz zaznaczyć,
            że podróż odbywa się w obie strony.
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
              Możesz używać przecinka albo kropki jako separatora
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
                    value={fuelPrice}
                    onChange={(e) => {
                      setFuelPrice(e.target.value);
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


              {/* OSOBY */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Liczba osób
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  value={people}
                  onChange={(e) => {
                    setPeople(e.target.value);
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

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Przy jednej osobie koszt na osobę będzie równy
                  całkowitemu kosztowi paliwa.
                </p>

              </div>


              {/* POWROT */}

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100">

                <input
                  type="checkbox"
                  checked={roundTrip}
                  onChange={(e) => {
                    setRoundTrip(e.target.checked);
                    setCalculated(false);
                  }}
                  className="h-5 w-5 accent-blue-600"
                />

                <div>

                  <div className="font-semibold">
                    Podróż w obie strony
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    Podany dystans zostanie podwojony.
                  </div>

                </div>

              </label>

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
              💡 Przy wspólnym wyjeździe możesz podzielić koszt
              paliwa na dowolną liczbę osób.
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
                    🚗
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


                {/* KOSZT NA OSOBĘ */}

                <div className="rounded-2xl bg-blue-500/10 p-5">

                  <div className="text-sm text-blue-200">
                    Koszt na osobę
                  </div>

                  <div className="mt-1 text-3xl font-bold text-blue-100">
                    {formatNumber(costPerPerson)} zł
                  </div>

                  <div className="mt-2 text-sm text-slate-400">
                    {persons}{" "}
                    {persons === 1
                      ? "osoba"
                      : persons >= 2 && persons <= 4
                        ? "osoby"
                        : "osób"}
                  </div>

                </div>


                {/* SZCZEGÓŁY */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl bg-white/10 p-5">

                    <div className="text-sm text-slate-300">
                      Dystans
                    </div>

                    <div className="mt-1 text-xl font-bold">
                      {formatNumber(totalDistance, 1)} km
                    </div>

                  </div>


                  <div className="rounded-2xl bg-white/10 p-5">

                    <div className="text-sm text-slate-300">
                      Potrzebne paliwo
                    </div>

                    <div className="mt-1 text-xl font-bold">
                      {formatNumber(litersNeeded)} l
                    </div>

                  </div>

                </div>


                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Koszt 100 km
                  </div>

                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(costPer100)} zł
                  </div>

                </div>


                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Szczegóły trasy
                  </div>

                  <div className="mt-3 space-y-2 text-sm">

                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">
                        Kierunek
                      </span>

                      <strong>
                        {roundTrip
                          ? "Tam i z powrotem"
                          : "W jedną stronę"}
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
                        {formatNumber(price)} zł/l
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
            Jak obliczyć koszt przejazdu samochodem?
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Koszt przejazdu samochodem zależy od długości trasy,
            średniego spalania oraz ceny paliwa. Najpierw należy
            obliczyć ilość paliwa potrzebną na przejechanie całej
            trasy, a następnie pomnożyć ją przez cenę jednego litra.
          </p>


          <div className="mt-6 rounded-2xl bg-slate-50 p-5">

            <div className="font-semibold">
              Wzór:
            </div>

            <div className="mt-3 font-mono text-sm leading-7 text-slate-600">
              koszt = dystans × spalanie ÷ 100 × cena paliwa
            </div>

          </div>


          <h3 className="mt-8 text-xl font-bold">
            Przykład: 500 km
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Przy dystansie 500 km, spalaniu 7,5 l/100 km i cenie
            paliwa 6,50 zł/l samochód potrzebuje 37,5 litra paliwa.
            Koszt podróży wyniesie 243,75 zł.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Ile kosztuje przejazd w obie strony?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Jeżeli podana odległość dotyczy tylko przejazdu w jedną
            stronę, zaznacz opcję „Podróż w obie strony”. Kalkulator
            podwoi dystans i wyliczy koszt całej podróży.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Jak podzielić koszt przejazdu na osoby?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            W przypadku wspólnego przejazdu wpisz liczbę osób.
            Całkowity koszt paliwa zostanie podzielony przez ich liczbę.
          </p>


          <div className="mt-7 flex flex-wrap gap-3">

            <Link
              href="/motoryzacja/spalanie"
              className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
            >
              Oblicz spalanie samochodu →
            </Link>


            <Link
              href="/motoryzacja/koszt-paliwa"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Oblicz koszt paliwa →
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
            FAQ – koszt przejazdu
          </h3>


          <div className="mt-5 space-y-6">

            <div>

              <h4 className="font-semibold">
                Czy mogę obliczyć koszt podróży tam i z powrotem?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Zaznacz opcję podróży w obie strony, a podany
                dystans zostanie automatycznie podwojony.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy można podzielić koszt paliwa na pasażerów?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Podaj liczbę osób, a kalkulator pokaże koszt
                przypadający na jedną osobę.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy kalkulator działa dla LPG?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Wystarczy podać spalanie LPG oraz cenę gazu
                za litr.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy koszt przejazdu obejmuje autostrady i parkingi?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Nie. Kalkulator oblicza koszt paliwa. Opłaty drogowe,
                parkingi i inne wydatki należy uwzględnić osobno.
              </p>

            </div>

          </div>


          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <div className="font-semibold">
              Ważne
            </div>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              Wynik jest obliczeniem na podstawie podanych danych.
              Rzeczywisty koszt podróży może być wyższy, jeżeli
              uwzględnisz opłaty drogowe, parkingi lub inne koszty.
            </p>

          </div>

        </article>

      </div>
    </CalculatorLayout>
  );
}