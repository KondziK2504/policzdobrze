"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
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
  const totalDiameter = rimDiameter + sidewall * 2;
  const circumference = Math.PI * totalDiameter;

  return {
    sidewall,
    rimDiameter,
    totalDiameter,
    circumference,
  };
}

export default function OponyPage() {
  const [currentWidth, setCurrentWidth] = useState("205");
  const [currentProfile, setCurrentProfile] = useState("55");
  const [currentRim, setCurrentRim] = useState("16");

  const [newWidth, setNewWidth] = useState("225");
  const [newProfile, setNewProfile] = useState("45");
  const [newRim, setNewRim] = useState("17");

  const [speedometer, setSpeedometer] = useState("100");
  const [calculated, setCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const valid = validCurrent && validReplacement;

  const currentWheel = validCurrent
    ? calculateWheel(
        current.width,
        current.profile,
        current.rim,
      )
    : null;

  const replacementWheel = validReplacement
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

  if (currentWheel && replacementWheel) {
    diameterDifference =
      replacementWheel.totalDiameter -
      currentWheel.totalDiameter;

    diameterDifferencePercent =
      (diameterDifference / currentWheel.totalDiameter) *
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
      replacement.width -
      current.width;

    realSpeed =
      speed > 0
        ? speed *
          (replacementWheel.totalDiameter /
            currentWheel.totalDiameter)
        : 0;

    groundClearanceChange =
      sidewallDifference / 2;
  }

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
    if (!calculated || !currentWheel || !replacementWheel) {
      return;
    }

    const text = [
      `Obecna opona: ${current.width}/${current.profile} R${current.rim}`,
      `Nowa opona: ${replacement.width}/${replacement.profile} R${replacement.rim}`,
      `Średnica obecna: ${formatNumber(currentWheel.totalDiameter)} mm`,
      `Średnica nowa: ${formatNumber(replacementWheel.totalDiameter)} mm`,
      `Różnica średnicy: ${formatSigned(diameterDifference)} mm (${formatSigned(diameterDifferencePercent, 2)}%)`,
      `Różnica obwodu: ${formatSigned(circumferenceDifference)} mm (${formatSigned(circumferenceDifferencePercent, 2)}%)`,
      speed > 0
        ? `Przy ${speed} km/h na liczniku rzeczywista prędkość wyniesie około ${formatNumber(realSpeed, 1)} km/h`
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
      title="Kalkulator opon – rozmiar i zamiennik"
      description="Porównaj dwa rozmiary opon i sprawdź różnicę średnicy, obwodu, wysokości boku oraz wpływ zmiany na wskazania prędkościomierza."
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
      <CalculatorTracker
        calculator="opony"
        isCalculated={calculated}
      />

      <div className="mx-auto max-w-5xl">

        {/* DANE */}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* OBECNA OPONA */}

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
                    inputMode="decimal"
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
                    inputMode="decimal"
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
                    inputMode="decimal"
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
                {current.width > 0 &&
                current.profile > 0 &&
                current.rim > 0
                  ? `${current.width}/${current.profile} R${current.rim}`
                  : "—"}
              </div>

            </div>

          </div>


          {/* NOWA OPONA */}

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
                    inputMode="decimal"
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
                    inputMode="decimal"
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
                    inputMode="decimal"
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
                {replacement.width > 0 &&
                replacement.profile > 0 &&
                replacement.rim > 0
                  ? `${replacement.width}/${replacement.profile} R${replacement.rim}`
                  : "—"}
              </div>

            </div>

          </div>

        </div>


        {/* DODATKOWE DANE */}

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <div className="max-w-2xl">

            <h2 className="text-xl font-bold">
              Wskazanie prędkościomierza
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Opcjonalnie podaj prędkość widoczną na liczniku,
              aby sprawdzić orientacyjną rzeczywistą prędkość
              po zmianie rozmiaru koła.
            </p>

          </div>


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

            <div className="flex min-h-[360px] items-center justify-center text-center">

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


              {/* PARAMETRY */}

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


              {/* SZCZEGÓŁOWE RÓŻNICE */}

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
                        1,
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
                        1,
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
                    około {formatNumber(realSpeed, 1)} km/h rzeczywiście
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    To matematyczne przeliczenie wynikające z różnicy
                    średnicy koła. Rzeczywiste wskazanie zależy również
                    od kalibracji konkretnego pojazdu.
                  </p>

                </div>

              )}


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


              {/* OSTRZEŻENIE */}

              <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">

                <div className="font-semibold text-amber-200">
                  Ważne
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Kalkulator porównuje wyłącznie parametry geometryczne
                  rozmiarów opon. Nie potwierdza, że dany rozmiar jest
                  dopuszczony do konkretnego samochodu. Przed zmianą
                  rozmiaru sprawdź zalecenia producenta pojazdu, felgi
                  i opony oraz wymagania dotyczące homologacji.
                </p>

              </div>

            </div>

          )}

        </div>


        {/* SEO */}

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-2xl font-bold">
            Jak czytać rozmiar opony?
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            W oznaczeniu takim jak 205/55 R16 liczba 205 oznacza
            szerokość opony w milimetrach, 55 oznacza profil wyrażony
            jako procent szerokości, a 16 oznacza średnicę felgi
            w calach.
          </p>


          <div className="mt-6 rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-600">

            średnica koła =
            <br />
            średnica felgi + 2 × wysokość boku

          </div>


          <h3 className="mt-8 text-xl font-bold">
            Co daje porównanie rozmiarów?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Kalkulator pokazuje, jak zmienia się średnica całego
            koła, jego obwód, wysokość boku oraz szerokość opony.
            Pozwala również oszacować matematyczną zmianę wskazania
            prędkościomierza wynikającą ze zmiany średnicy koła.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Czy większa opona zawsze pasuje?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Nie. Zgodność średnicy nie wystarcza do potwierdzenia,
            że konkretny rozmiar może być zastosowany w danym aucie.
            Trzeba uwzględnić między innymi szerokość felgi,
            nośność, indeks prędkości, miejsce w nadkolu oraz
            dopuszczone przez producenta rozmiary.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            FAQ
          </h3>

          <div className="mt-5 space-y-5">

            <div>
              <h4 className="font-semibold">
                Czy kalkulator obsługuje przecinek i kropkę?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Możesz wpisać zarówno 225,5, jak i 225.5.
              </p>
            </div>


            <div>
              <h4 className="font-semibold">
                Jak obliczana jest średnica koła?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Do średnicy felgi przeliczonej z cali na milimetry
                dodajemy dwukrotność wysokości boku opony.
              </p>
            </div>


            <div>
              <h4 className="font-semibold">
                Czy wynik mówi, że opona jest bezpieczna dla mojego auta?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Nie. Wynik pokazuje różnice geometryczne między
                rozmiarami. Ostateczny dobór należy sprawdzić dla
                konkretnego samochodu i felgi.
              </p>
            </div>

          </div>

        </div>

      </div>
    </CalculatorLayout>
  );
}