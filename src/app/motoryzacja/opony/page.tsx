"use client";

import Link from "next/link";
import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import FaqSchema from "@/components/FaqSchema";
import AffiliateButton from "@/components/AffiliateButton";
import { parseNumber } from "@/lib/number";

function formatNumber(value: number, digits = 1) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatSigned(value: number, digits = 1) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${formatNumber(value, digits)}`;
}

function calculateWheel(
  width: number,
  profile: number,
  rim: number,
) {
  const sidewall = width * (profile / 100);
  const rimDiameter = rim * 25.4;
  const totalDiameter =
    rimDiameter + sidewall * 2;
  const circumference =
    Math.PI * totalDiameter;

  return {
    sidewall,
    rimDiameter,
    totalDiameter,
    circumference,
  };
}

function buildCeneoUrl(
  width: number,
  profile: number,
  rim: number,
) {
  const search = `${width} ${profile} r${rim}`
    .replace(/\s+/g, "+");

  return `https://www.ceneo.pl/Opony_osobowe;szukaj-opony+${search}#crid=809544&pid=31174`;
}

const faqItems = [
  {
    question: "Jak obliczyć różnicę między rozmiarami opon?",
    answer:
      "Porównaj średnicę i obwód całego koła dla obu rozmiarów. Kalkulator wykonuje te obliczenia automatycznie po wpisaniu szerokości, profilu i średnicy felgi.",
  },
  {
    question: "Czy 205/55 R16 można zamienić na 225/45 R17?",
    answer:
      "Kalkulator pozwala sprawdzić matematyczną różnicę pomiędzy tymi rozmiarami. Nie oznacza to jednak, że taki rozmiar jest dopuszczony w każdym samochodzie.",
  },
  {
    question: "Czy większa różnica średnicy wpływa na prędkościomierz?",
    answer:
      "Zmiana średnicy koła może zmienić zależność pomiędzy obrotem koła a prędkością jazdy. Kalkulator pokazuje matematyczne przeliczenie tego efektu.",
  },
  {
    question: "Czy po porównaniu mogę sprawdzić ceny opon?",
    answer:
      "Tak. Po wykonaniu obliczenia możesz przejść do ofert opon w wybranym rozmiarze.",
  },
  {
    question: "Czy przecinek i kropka działają tak samo?",
    answer:
      "Tak. Kalkulator obsługuje oba sposoby zapisu wartości dziesiętnych.",
  },
];

export default function OponyPage() {
  const [currentWidth, setCurrentWidth] =
    useState("205");
  const [currentProfile, setCurrentProfile] =
    useState("55");
  const [currentRim, setCurrentRim] =
    useState("16");

  const [newWidth, setNewWidth] =
    useState("225");
  const [newProfile, setNewProfile] =
    useState("45");
  const [newRim, setNewRim] =
    useState("17");

  const [speedometer, setSpeedometer] =
    useState("100");

  const [calculated, setCalculated] =
    useState(false);
  const [copied, setCopied] =
    useState(false);

  const current = {
    width: parseNumber(currentWidth),
    profile: parseNumber(currentProfile),
    rim: parseNumber(currentRim),
  };

  const replacement = {
    width: parseNumber(newWidth),
    profile: parseNumber(newProfile),
    rim: parseNumber(newRim),
  };

  const speed = parseNumber(speedometer);

  const validCurrent =
    current.width > 0 &&
    current.profile > 0 &&
    current.rim > 0;

  const validReplacement =
    replacement.width > 0 &&
    replacement.profile > 0 &&
    replacement.rim > 0;

  const valid =
    validCurrent && validReplacement;

  const currentWheel = validCurrent
    ? calculateWheel(
        current.width,
        current.profile,
        current.rim,
      )
    : null;

  const replacementWheel =
    validReplacement
      ? calculateWheel(
          replacement.width,
          replacement.profile,
          replacement.rim,
        )
      : null;

  let diameterDifference = 0;
  let diameterDifferencePercent = 0;
  let circumferenceDifference = 0;
  let circumferenceDifferencePercent = 0;
  let sidewallDifference = 0;
  let widthDifference = 0;
  let realSpeed = 0;
  let groundClearanceChange = 0;

  if (
    currentWheel &&
    replacementWheel
  ) {
    diameterDifference =
      replacementWheel.totalDiameter -
      currentWheel.totalDiameter;

    diameterDifferencePercent =
      (diameterDifference /
        currentWheel.totalDiameter) *
      100;

    circumferenceDifference =
      replacementWheel.circumference -
      currentWheel.circumference;

    circumferenceDifferencePercent =
      (circumferenceDifference /
        currentWheel.circumference) *
      100;

    sidewallDifference =
      replacementWheel.sidewall -
      currentWheel.sidewall;

    widthDifference =
      replacement.width - current.width;

    realSpeed =
      speed > 0
        ? speed *
          (replacementWheel.totalDiameter /
            currentWheel.totalDiameter)
        : 0;

    groundClearanceChange =
      sidewallDifference / 2;
  }

  const ceneoUrl =
    validReplacement
      ? buildCeneoUrl(
          replacement.width,
          replacement.profile,
          replacement.rim,
        )
      : "#";

  function handleCalculate() {
    if (!valid) {
      setCalculated(false);
      return;
    }

    setCalculated(true);
    setCopied(false);
  }

  function handleExample() {
    setCurrentWidth("205");
    setCurrentProfile("55");
    setCurrentRim("16");

    setNewWidth("225");
    setNewProfile("45");
    setNewRim("17");

    setSpeedometer("100");

    setCalculated(false);
    setCopied(false);
  }

  function handleReset() {
    setCurrentWidth("");
    setCurrentProfile("");
    setCurrentRim("");

    setNewWidth("");
    setNewProfile("");
    setNewRim("");

    setSpeedometer("100");

    setCalculated(false);
    setCopied(false);
  }

  async function handleCopy() {
    if (
      !calculated ||
      !currentWheel ||
      !replacementWheel
    ) {
      return;
    }

    const text = [
      `Obecna opona: ${current.width}/${current.profile} R${current.rim}`,
      `Nowa opona: ${replacement.width}/${replacement.profile} R${replacement.rim}`,
      `Średnica obecna: ${formatNumber(currentWheel.totalDiameter)} mm`,
      `Średnica nowa: ${formatNumber(replacementWheel.totalDiameter)} mm`,
      `Różnica średnicy: ${formatSigned(diameterDifference)} mm (${formatSigned(diameterDifferencePercent, 2)}%)`,
      `Różnica obwodu: ${formatSigned(circumferenceDifference)} mm (${formatSigned(circumferenceDifferencePercent, 2)}%)`,
      `Różnica szerokości: ${formatSigned(widthDifference, 0)} mm`,
      `Zmiana wysokości boku: ${formatSigned(sidewallDifference)} mm`,
      speed > 0
        ? `Przy ${formatNumber(speed, 0)} km/h na liczniku rzeczywista prędkość wyniesie około ${formatNumber(realSpeed)} km/h`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

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
      icon="🛞"
      title="Kalkulator opon – rozmiar, zamiennik i różnica"
      description="Porównaj dwa rozmiary opon i sprawdź średnicę koła, obwód, wysokość boku, zmianę prześwitu oraz wpływ zmiany rozmiaru na wskazanie prędkościomierza."
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
          icon: "💰",
          title: "Kalkulator kosztu paliwa",
          href: "/motoryzacja/koszt-paliwa",
        },
      ]}
    >
      <FaqSchema items={faqItems} />

      <CalculatorTracker
        calculator="opony"
        isCalculated={calculated}
      />

      <div className="mx-auto max-w-5xl">

        {/* WPROWADZENIE */}

        <div className="mb-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-7">

          <h2 className="text-xl font-bold text-slate-950">
            Sprawdź zamiennik opony i różnicę rozmiaru
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Wpisz obecny i nowy rozmiar opony. Kalkulator
            porówna średnicę koła, obwód, wysokość boku
            oraz szerokość i pokaże, jak matematycznie zmieni
            się wskazanie prędkościomierza.
          </p>

        </div>


        {/* ROZMIARY */}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* OBECNA */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl">
                1
              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Obecna opona
                </h2>

                <p className="text-sm text-slate-500">
                  Rozmiar, który masz obecnie
                </p>

              </div>

            </div>


            <div className="mt-7 grid gap-4 sm:grid-cols-3">

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Szerokość
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="numeric"
                    value={currentWidth}
                    onChange={(e) => {
                      setCurrentWidth(e.target.value);
                      setCalculated(false);
                    }}
                    placeholder="205"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    mm
                  </span>

                </div>

              </div>


              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Profil
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="numeric"
                    value={currentProfile}
                    onChange={(e) => {
                      setCurrentProfile(e.target.value);
                      setCalculated(false);
                    }}
                    placeholder="55"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    %
                  </span>

                </div>

              </div>


              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Felga
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="numeric"
                    value={currentRim}
                    onChange={(e) => {
                      setCurrentRim(e.target.value);
                      setCalculated(false);
                    }}
                    placeholder="16"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    cal
                  </span>

                </div>

              </div>

            </div>


            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-center">

              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Rozmiar
              </div>

              <div className="mt-1 text-2xl font-black">
                {validCurrent
                  ? `${current.width}/${current.profile} R${current.rim}`
                  : "—"}
              </div>

            </div>

          </div>


          {/* NOWA */}

          <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
                2
              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Nowa opona
                </h2>

                <p className="text-sm text-slate-500">
                  Rozmiar, który chcesz porównać
                </p>

              </div>

            </div>


            <div className="mt-7 grid gap-4 sm:grid-cols-3">

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Szerokość
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="numeric"
                    value={newWidth}
                    onChange={(e) => {
                      setNewWidth(e.target.value);
                      setCalculated(false);
                    }}
                    placeholder="225"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    mm
                  </span>

                </div>

              </div>


              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Profil
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="numeric"
                    value={newProfile}
                    onChange={(e) => {
                      setNewProfile(e.target.value);
                      setCalculated(false);
                    }}
                    placeholder="45"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    %
                  </span>

                </div>

              </div>


              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Felga
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="numeric"
                    value={newRim}
                    onChange={(e) => {
                      setNewRim(e.target.value);
                      setCalculated(false);
                    }}
                    placeholder="17"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    cal
                  </span>

                </div>

              </div>

            </div>


            <div className="mt-5 rounded-2xl bg-blue-50 p-4 text-center">

              <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Rozmiar
              </div>

              <div className="mt-1 text-2xl font-black text-blue-700">
                {validReplacement
                  ? `${replacement.width}/${replacement.profile} R${replacement.rim}`
                  : "—"}
              </div>

            </div>

          </div>

        </div>


        {/* PRĘDKOŚCIOMIERZ */}

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Wskazanie prędkościomierza
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Opcjonalnie wpisz prędkość widoczną na liczniku,
            aby zobaczyć matematyczne przeliczenie wynikające
            ze zmiany średnicy koła.
          </p>


          <div className="mt-6 max-w-sm">

            <div className="relative">

              <input
                type="text"
                inputMode="decimal"
                value={speedometer}
                onChange={(e) => {
                  setSpeedometer(e.target.value);
                  setCalculated(false);
                }}
                placeholder="np. 100"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-20 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                km/h
              </span>

            </div>

          </div>


          <div className="mt-6 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={handleCalculate}
              disabled={!valid}
              className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Porównaj rozmiary
            </button>


            <button
              type="button"
              onClick={handleExample}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Wypełnij przykładem
            </button>


            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Wyczyść
            </button>

          </div>

        </div>


        {/* WYNIK */}

        <div className="mt-8 rounded-3xl bg-slate-950 p-7 text-white shadow-xl">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold">
              Wynik porównania
            </h2>

            {calculated && (

              <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Gotowe
              </div>

            )}

          </div>


          {!calculated ||
          !currentWheel ||
          !replacementWheel ? (

            <div className="flex min-h-[380px] items-center justify-center text-center">

              <div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  🛞
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź oba rozmiary i kliknij
                  <br />
                  „Porównaj rozmiary”.
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-7">

              {/* GŁÓWNY WYNIK */}

              <div
                className={
                  Math.abs(diameterDifferencePercent) <= 3
                    ? "rounded-2xl bg-emerald-400/10 p-6"
                    : "rounded-2xl bg-amber-400/10 p-6"
                }
              >

                <div className="text-sm text-slate-300">
                  Różnica średnicy
                </div>

                <div className="mt-2 text-5xl font-extrabold">

                  {formatSigned(
                    diameterDifferencePercent,
                    2,
                  )}

                  <span className="ml-2 text-xl font-medium text-slate-300">
                    %
                  </span>

                </div>

                <p className="mt-3 text-sm text-slate-300">
                  {formatSigned(
                    diameterDifference,
                    1,
                  )}{" "}
                  mm
                </p>

              </div>


              {/* ŚREDNICA / OBWÓD */}

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Średnica obecna
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {formatNumber(
                      currentWheel.totalDiameter,
                    )}{" "}
                    mm
                  </div>

                </div>


                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Średnica nowa
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {formatNumber(
                      replacementWheel.totalDiameter,
                    )}{" "}
                    mm
                  </div>

                </div>


                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Obwód obecny
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {formatNumber(
                      currentWheel.circumference,
                    )}{" "}
                    mm
                  </div>

                </div>


                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Obwód nowy
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {formatNumber(
                      replacementWheel.circumference,
                    )}{" "}
                    mm
                  </div>

                </div>

              </div>


              {/* SZCZEGÓŁY */}

              <div className="mt-4 rounded-2xl bg-white/10 p-5">

                <div className="text-sm font-semibold text-white">
                  Szczegóły zmiany
                </div>

                <div className="mt-3 divide-y divide-white/10">

                  <div className="flex items-center justify-between py-3">

                    <span className="text-slate-300">
                      Różnica obwodu
                    </span>

                    <strong>
                      {formatSigned(
                        circumferenceDifference,
                      )}{" "}
                      mm (
                      {formatSigned(
                        circumferenceDifferencePercent,
                        2,
                      )}
                      %)
                    </strong>

                  </div>


                  <div className="flex items-center justify-between py-3">

                    <span className="text-slate-300">
                      Różnica szerokości
                    </span>

                    <strong>
                      {formatSigned(
                        widthDifference,
                        0,
                      )}{" "}
                      mm
                    </strong>

                  </div>


                  <div className="flex items-center justify-between py-3">

                    <span className="text-slate-300">
                      Zmiana wysokości boku
                    </span>

                    <strong>
                      {formatSigned(
                        sidewallDifference,
                      )}{" "}
                      mm
                    </strong>

                  </div>


                  <div className="flex items-center justify-between py-3">

                    <span className="text-slate-300">
                      Zmiana prześwitu auta
                    </span>

                    <strong>
                      {formatSigned(
                        groundClearanceChange,
                      )}{" "}
                      mm
                    </strong>

                  </div>

                </div>

              </div>


              {/* PRĘDKOŚĆ */}

              {speed > 0 && (

                <div className="mt-4 rounded-2xl bg-blue-500/10 p-5">

                  <div className="text-sm text-blue-200">
                    Przy {formatNumber(speed, 0)} km/h na liczniku
                  </div>

                  <div className="mt-1 text-3xl font-bold text-blue-100">
                    około {formatNumber(realSpeed)} km/h
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    To matematyczne przeliczenie wynikające
                    z różnicy średnicy koła. Rzeczywiste wskazanie
                    prędkościomierza zależy również od kalibracji
                    konkretnego samochodu.
                  </p>

                </div>

              )}


              {/* CENEO */}

              <div className="mt-6 rounded-2xl border border-blue-400/20 bg-blue-400/5 p-5">

                <div className="flex items-start gap-3">

                  <div className="text-2xl">
                    🛞
                  </div>

                  <div className="flex-1">

                    <div className="font-bold">
                      Szukasz opon w rozmiarze{" "}
                      {replacement.width}/
                      {replacement.profile} R
                      {replacement.rim}?
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Porównaj dostępne oferty i ceny opon
                      w wybranym rozmiarze.
                    </p>

                  </div>

                </div>


                <div className="mt-4">

                  <AffiliateButton
                    calculator="opony"
                    partner="ceneo"
                    href={ceneoUrl}
                  >
                    Sprawdź ceny opon
                  </AffiliateButton>

                </div>

                <p className="mt-3 text-center text-xs text-slate-500">
                  Link partnerski Ceneo.
                </p>

              </div>


              {/* KOPIOWANIE */}

              <button
                type="button"
                onClick={handleCopy}
                className="mt-5 w-full rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-bold transition hover:bg-white/10"
              >
                {copied
                  ? "✓ Skopiowano wynik"
                  : "Skopiuj wynik"}
              </button>


              {/* UWAGA */}

              <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">

                <div className="font-semibold text-amber-200">
                  Ważne
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Kalkulator porównuje parametry geometryczne
                  rozmiarów opon. Sam wynik nie potwierdza,
                  że wybrany rozmiar jest dopuszczony do konkretnego
                  samochodu. Przed zmianą rozmiaru sprawdź zalecenia
                  producenta pojazdu oraz parametry felgi i opony.
                </p>

              </div>

            </div>

          )}

        </div>


        {/* TREŚĆ SEO */}

        <article className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-2xl font-bold">
            Kalkulator opon – sprawdź zamiennik
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Kalkulator opon pozwala porównać dwa rozmiary i sprawdzić,
            jak zmieni się średnica oraz obwód całego koła. Możesz
            dzięki temu szybko ocenić różnicę między rozmiarem,
            który masz obecnie, a planowanym zamiennikiem.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Jak czytać rozmiar opony 205/55 R16?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            W oznaczeniu 205/55 R16 liczba 205 oznacza szerokość
            opony w milimetrach. Wartość 55 oznacza wysokość boku
            jako procent szerokości opony, a 16 oznacza średnicę
            felgi w calach.
          </p>


          <div className="mt-6 rounded-2xl bg-slate-50 p-5">

            <div className="font-semibold">
              Podstawowe wzory:
            </div>

            <div className="mt-3 space-y-2 font-mono text-sm leading-7 text-slate-600">

              <div>
                wysokość boku = szerokość × profil ÷ 100
              </div>

              <div>
                średnica koła = średnica felgi + 2 × wysokość boku
              </div>

              <div>
                obwód koła = π × średnica
              </div>

            </div>

          </div>


          <h3 className="mt-8 text-xl font-bold">
            Jaki rozmiar opony jest zamiennikiem?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Kalkulator pokazuje różnicę matematyczną pomiędzy
            rozmiarami, ale nie określa samodzielnie, czy dany
            rozmiar jest właściwy dla konkretnego samochodu.
            Przy wyborze zamiennika trzeba uwzględnić między innymi
            dopuszczone rozmiary, szerokość felgi, nośność oraz
            indeks prędkości.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Przykład: 205/55 R16 → 225/45 R17
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Rozmiary 205/55 R16 i 225/45 R17 mają różne szerokości
            i średnice całego koła. Wpisz je do kalkulatora powyżej,
            aby zobaczyć dokładną różnicę średnicy, obwodu oraz
            wysokości boku.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Czy większa felga zmienia średnicę koła?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Niekoniecznie. Zwiększenie średnicy felgi może zostać
            skompensowane niższym profilem opony. Dlatego przy
            porównaniu kompletnego rozmiaru należy brać pod uwagę
            zarówno felgę, jak i szerokość oraz profil opony.
          </p>


          {/* LINKOWANIE */}

          <div className="mt-7 flex flex-wrap gap-3">

            <Link
              href="/motoryzacja/spalanie"
              className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
            >
              Kalkulator spalania →
            </Link>


            <Link
              href="/motoryzacja/koszt-paliwa"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Kalkulator kosztu paliwa →
            </Link>


            <Link
              href="/motoryzacja/koszt-przejazdu"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Kalkulator kosztu przejazdu →
            </Link>

          </div>


          {/* FAQ */}

          <h3 className="mt-10 text-xl font-bold">
            FAQ – kalkulator opon
          </h3>


          <div className="mt-5 space-y-6">

            <div>

              <h4 className="font-semibold">
                Jak obliczyć różnicę między rozmiarami opon?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Porównaj średnicę i obwód całego koła dla obu rozmiarów.
                Kalkulator wykonuje te obliczenia automatycznie
                po wpisaniu szerokości, profilu i średnicy felgi.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy 205/55 R16 można zamienić na 225/45 R17?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Kalkulator pozwala sprawdzić matematyczną różnicę
                pomiędzy tymi rozmiarami. Nie oznacza to jednak,
                że taki rozmiar jest dopuszczony w każdym samochodzie.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy większa różnica średnicy wpływa na prędkościomierz?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Zmiana średnicy koła może zmienić zależność pomiędzy
                obrotem koła a prędkością jazdy. Kalkulator pokazuje
                matematyczne przeliczenie tego efektu.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy po porównaniu mogę sprawdzić ceny opon?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Po wykonaniu obliczenia możesz przejść do ofert
                opon w wybranym rozmiarze.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy przecinek i kropka działają tak samo?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Kalkulator obsługuje oba sposoby zapisu wartości
                dziesiętnych.
              </p>

            </div>

          </div>


          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">

            <div className="font-semibold text-amber-900">
              Ważne
            </div>

            <p className="mt-2 text-sm leading-7 text-amber-800">
              Porównanie ma charakter matematyczny i informacyjny.
              Przed zakupem lub zmianą rozmiaru opon sprawdź
              dopuszczone przez producenta samochodu rozmiary oraz
              wszystkie wymagane parametry opony i felgi.
            </p>

          </div>

        </article>

      </div>
    </CalculatorLayout>
  );
}