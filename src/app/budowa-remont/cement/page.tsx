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

export default function CementPage() {
  const [volume, setVolume] = useState("");
  const [cementPerM3, setCementPerM3] = useState("300");
  const [bagWeight, setBagWeight] = useState("25");
  const [reserve, setReserve] = useState("10");

  const [calculated, setCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  const volumeValue = parseNumber(volume);
  const cementValue = parseNumber(cementPerM3);
  const bagValue = parseNumber(bagWeight);
  const reserveValue = parseNumber(reserve);

  const valid =
    volumeValue > 0 &&
    cementValue > 0 &&
    bagValue > 0 &&
    reserveValue >= 0;

  const baseCementWeight = valid
    ? volumeValue * cementValue
    : 0;

  const cementWeight = valid
    ? baseCementWeight * (1 + reserveValue / 100)
    : 0;

  const bags = valid
    ? Math.ceil(cementWeight / bagValue)
    : 0;

  const reserveWeight = valid
    ? cementWeight - baseCementWeight
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
    setVolume("5");
    setCementPerM3("300");
    setBagWeight("25");
    setReserve("10");
    setCalculated(false);
    setCopied(false);
  }

  function handleReset() {
    setVolume("");
    setCementPerM3("300");
    setBagWeight("25");
    setReserve("10");
    setCalculated(false);
    setCopied(false);
  }

  async function handleCopy() {
    if (!calculated) {
      return;
    }

    const text = [
      `Objętość mieszanki: ${formatNumber(volumeValue)} m³`,
      `Cement na 1 m³: ${formatNumber(cementValue, 0)} kg`,
      `Zapas: ${formatNumber(reserveValue, 1)}%`,
      `Potrzebna masa cementu: ${formatNumber(cementWeight)} kg`,
      `Waga worka: ${formatNumber(bagValue, 0)} kg`,
      `Liczba worków: ${bags} szt.`,
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
      title="Kalkulator cementu – ile worków potrzebujesz?"
      description="Oblicz orientacyjną ilość cementu potrzebnego do przygotowania mieszanki oraz liczbę worków."
      categoryName="Budowa i remont"
      categoryHref="/budowa-remont"
      related={[
        {
          icon: "🏗️",
          title: "Kalkulator betonu",
          href: "/budowa-remont/beton",
        },
        {
          icon: "🪨",
          title: "Kalkulator piasku i żwiru",
          href: "/budowa-remont/piasek-i-zwir",
        },
        {
          icon: "🧱",
          title: "Kalkulator kostki brukowej",
          href: "/budowa-remont/kostka-brukowa",
        },
      ]}
    >
      <CalculatorTracker
        calculator="cement"
        isCalculated={calculated}
      />

      <div className="mx-auto max-w-5xl">

        {/* WPROWADZENIE */}

        <div className="mb-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-7">

          <h2 className="text-xl font-bold text-slate-950">
            Oblicz, ile cementu potrzebujesz
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Podaj objętość mieszanki, orientacyjne zużycie cementu
            na 1 m³ oraz wagę worka. Kalkulator wyliczy potrzebną
            masę cementu i liczbę pełnych worków z uwzględnieniem zapasu.
          </p>

        </div>


        {/* KALKULATOR */}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* FORMULARZ */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-xl font-bold">
              Dane mieszanki
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Możesz wpisywać wartości z przecinkiem lub kropką.
            </p>


            <div className="mt-7 space-y-5">

              {/* OBJĘTOŚĆ */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Objętość mieszanki
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={volume}
                    onChange={(e) => {
                      setVolume(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 5"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    m³
                  </span>

                </div>

              </div>


              {/* CEMENT NA M3 */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Cement na 1 m³
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={cementPerM3}
                    onChange={(e) => {
                      setCementPerM3(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 300"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-20 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    kg/m³
                  </span>

                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Wpisz dawkę wynikającą z receptury lub przyjętego
                  sposobu wykonania mieszanki.
                </p>

              </div>


              {/* WAGA WORKA */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Waga worka
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={bagWeight}
                    onChange={(e) => {
                      setBagWeight(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 25"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-16 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    kg
                  </span>

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
                  Zapas pomaga uwzględnić straty i różnice wynikające
                  z wykonywania prac.
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
              💡 Zawsze sprawdź recepturę konkretnej mieszanki.
              Zużycie cementu na 1 m³ może się różnić zależnie od
              zastosowania.
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
                    Wprowadź dane i kliknij „Oblicz”.
                  </p>

                </div>

              </div>

            ) : (

              <div className="mt-7 space-y-4">

                {/* MASA */}

                <div className="rounded-2xl bg-white/10 p-6">

                  <div className="text-sm text-slate-300">
                    Potrzebna masa cementu
                  </div>

                  <div className="mt-2 text-5xl font-extrabold tracking-tight">

                    {formatNumber(cementWeight, 1)}

                    <span className="ml-2 text-xl font-medium text-slate-300">
                      kg
                    </span>

                  </div>

                </div>


                {/* WORKI */}

                <div className="rounded-2xl bg-blue-500/10 p-5">

                  <div className="text-sm text-blue-200">
                    Liczba pełnych worków
                  </div>

                  <div className="mt-1 text-3xl font-bold text-blue-100">
                    {bags.toLocaleString("pl-PL")} szt.
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
                        Objętość mieszanki
                      </span>

                      <strong>
                        {formatNumber(volumeValue)} m³
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Zużycie cementu
                      </span>

                      <strong>
                        {formatNumber(cementValue, 0)} kg/m³
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Masa bez zapasu
                      </span>

                      <strong>
                        {formatNumber(baseCementWeight)} kg
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Zapas
                      </span>

                      <strong>
                        {formatNumber(reserveValue, 1)}%
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Dodatkowa masa
                      </span>

                      <strong>
                        {formatNumber(reserveWeight)} kg
                      </strong>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-slate-400">
                        Waga worka
                      </span>

                      <strong>
                        {formatNumber(bagValue, 0)} kg
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
                    Podana dawka cementu jest parametrem orientacyjnym.
                    Rzeczywiste proporcje mieszanki powinny wynikać
                    z receptury odpowiedniej dla konkretnego zastosowania.
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>


        {/* TREŚĆ SEO */}

        <article className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-2xl font-bold">
            Kalkulator cementu – jak obliczyć ilość cementu?
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Ilość cementu zależy od objętości przygotowywanej
            mieszanki oraz ilości cementu przyjętej na jeden metr
            sześcienny. Po obliczeniu masy można przeliczyć ją
            na liczbę worków o określonej wadze.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Jak obliczyć ilość cementu?
          </h3>

          <div className="mt-5 rounded-2xl bg-slate-50 p-5 font-mono text-sm leading-7 text-slate-600">
            cement = objętość × zużycie cementu na 1 m³
            <br />
            cement z zapasem = cement × (1 + zapas ÷ 100)
          </div>


          <h3 className="mt-8 text-xl font-bold">
            Jak obliczyć liczbę worków?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Otrzymaną masę cementu należy podzielić przez wagę
            jednego worka i zaokrąglić wynik w górę do pełnego worka.
          </p>

          <div className="mt-5 rounded-2xl bg-slate-50 p-5 font-mono text-sm leading-7 text-slate-600">
            liczba worków = masa cementu ÷ waga worka
          </div>


          <h3 className="mt-8 text-xl font-bold">
            Przykład – 5 m³ mieszanki
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Przy objętości 5 m³, zużyciu 300 kg cementu na 1 m³
            i 10% zapasu otrzymujemy 1650 kg cementu.
            Przy workach po 25 kg daje to 66 pełnych worków.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Czy można przyjąć stałą dawkę cementu?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Nie dla każdego zastosowania. Ilość cementu zależy
            od rodzaju i wymaganych parametrów mieszanki. Warto
            opierać się na recepturze lub zaleceniach odpowiednich
            dla konkretnej pracy.
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
              href="/budowa-remont/piasek-i-zwir"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Kalkulator piasku i żwiru →
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
            FAQ – kalkulator cementu
          </h3>


          <div className="mt-5 space-y-6">

            <div>

              <h4 className="font-semibold">
                Ile cementu potrzeba na 1 m³ mieszanki?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Zależy to od rodzaju mieszanki i wymaganych parametrów.
                W kalkulatorze możesz samodzielnie podać przyjętą
                dawkę cementu na 1 m³.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Ile worków cementu potrzeba?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Zależy to od całkowitej wymaganej masy cementu
                oraz wagi jednego worka. Kalkulator zaokrągla wynik
                w górę do pełnej liczby worków.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy kalkulator uwzględnia zapas?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Możesz podać procentowy zapas, który zostanie
                dodany do podstawowej ilości cementu.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy wynik jest dokładną recepturą betonu?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Nie. Kalkulator wykonuje proste obliczenie ilości
                cementu na podstawie podanej dawki. Nie zastępuje
                receptury konkretnej mieszanki.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy można używać worków 25 kg i 20 kg?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Wpisz wagę worka, który zamierzasz kupić,
                a kalkulator przeliczy liczbę potrzebnych opakowań.
              </p>

            </div>

          </div>


          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">

            <div className="font-semibold text-amber-900">
              Ważne
            </div>

            <p className="mt-2 text-sm leading-7 text-amber-800">
              Kalkulator służy do orientacyjnego oszacowania ilości
              cementu. Rzeczywiste proporcje mieszanki powinny być
              dobrane odpowiednio do jej zastosowania i wymaganych
              parametrów.
            </p>

          </div>

        </article>

      </div>
    </CalculatorLayout>
  );
}