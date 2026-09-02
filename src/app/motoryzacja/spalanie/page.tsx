"use client";

import Link from "next/link";
import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

type CalculationMode = "consumption" | "fuel";

function formatNumber(value: number, digits = 2) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function SpalaniePage() {
  const [mode, setMode] =
    useState<CalculationMode>("consumption");

  const [distance, setDistance] = useState("");
  const [fuelUsed, setFuelUsed] = useState("");
  const [consumption, setConsumption] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");

  const [calculated, setCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  const km = parseNumber(distance);
  const liters = parseNumber(fuelUsed);
  const lPer100 = parseNumber(consumption);
  const price = parseNumber(fuelPrice);

  const validConsumptionMode =
    km > 0 && liters > 0;

  const validFuelMode =
    km > 0 && lPer100 > 0;

  const valid =
    mode === "consumption"
      ? validConsumptionMode
      : validFuelMode;

  const calculatedConsumption =
    mode === "consumption" && validConsumptionMode
      ? (liters / km) * 100
      : mode === "fuel" && validFuelMode
        ? lPer100
        : 0;

  const calculatedFuel =
    mode === "consumption" && validConsumptionMode
      ? liters
      : mode === "fuel" && validFuelMode
        ? (km * lPer100) / 100
        : 0;

  const costPer100 =
    price > 0 && calculatedConsumption > 0
      ? calculatedConsumption * price
      : 0;

  const totalCost =
    price > 0 && calculatedFuel > 0
      ? calculatedFuel * price
      : 0;

  function handleModeChange(nextMode: CalculationMode) {
    setMode(nextMode);
    setCalculated(false);
    setCopied(false);
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
    setDistance("520");
    setFuelUsed("39");
    setConsumption("7,5");
    setFuelPrice("6,50");
    setCalculated(false);
    setCopied(false);
  }

  function handleReset() {
    setDistance("");
    setFuelUsed("");
    setConsumption("");
    setFuelPrice("");
    setCalculated(false);
    setCopied(false);
  }

  async function handleCopy() {
    if (!calculated) {
      return;
    }

    const text = [
      `Dystans: ${formatNumber(km, 1)} km`,
      `Spalanie: ${formatNumber(calculatedConsumption)} l/100 km`,
      `Zużyte paliwo: ${formatNumber(calculatedFuel)} l`,
      price > 0
        ? `Cena paliwa: ${formatNumber(price)} zł/l`
        : "",
      price > 0
        ? `Koszt 100 km: ${formatNumber(costPer100)} zł`
        : "",
      price > 0
        ? `Koszt przejazdu: ${formatNumber(totalCost)} zł`
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
      icon="⛽"
      title="Kalkulator spalania samochodu – l/100 km"
      description="Oblicz średnie spalanie samochodu, potrzebną ilość paliwa oraz koszt przejazdu na podstawie dystansu, zużycia paliwa i jego ceny."
      categoryName="Motoryzacja"
      categoryHref="/motoryzacja"
      related={[
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
        {
          icon: "🛞",
          title: "Kalkulator opon",
          href: "/motoryzacja/opony",
        },
      ]}
    >
      <CalculatorTracker
        calculator="spalanie"
        isCalculated={calculated}
      />

      <div className="mx-auto max-w-5xl">

        {/* WPROWADZENIE */}

        <div className="mb-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-7">

          <h2 className="text-xl font-bold text-slate-950">
            Oblicz spalanie albo potrzebną ilość paliwa
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Wybierz, co chcesz obliczyć. Możesz policzyć średnie
            spalanie na podstawie ilości zużytego paliwa albo
            sprawdzić, ile litrów paliwa potrzebujesz na konkretną
            trasę. Cena paliwa jest opcjonalna i pozwala wyliczyć
            również koszt jazdy.
          </p>

        </div>


        {/* KALKULATOR */}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* FORMULARZ */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-xl font-bold">
              Dane przejazdu
            </h2>

            {/* TRYB */}

            <div className="mt-6 grid grid-cols-2 rounded-2xl bg-slate-100 p-1">

              <button
                type="button"
                onClick={() =>
                  handleModeChange("consumption")
                }
                className={
                  mode === "consumption"
                    ? "rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-900 shadow-sm"
                    : "rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
                }
              >
                Oblicz spalanie
              </button>

              <button
                type="button"
                onClick={() =>
                  handleModeChange("fuel")
                }
                className={
                  mode === "fuel"
                    ? "rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-900 shadow-sm"
                    : "rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
                }
              >
                Oblicz zużycie
              </button>

            </div>


            <p className="mt-4 text-sm leading-6 text-slate-500">
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
                    placeholder="np. 520"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    km
                  </span>

                </div>

              </div>


              {/* OBLICZANIE SPALANIA */}

              {mode === "consumption" && (

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Zużyte paliwo
                  </label>

                  <div className="relative">

                    <input
                      type="text"
                      inputMode="decimal"
                      value={fuelUsed}
                      onChange={(e) => {
                        setFuelUsed(e.target.value);
                        setCalculated(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleCalculate();
                        }
                      }}
                      placeholder="np. 39"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                      l
                    </span>

                  </div>


                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Wpisz ilość paliwa zużytą na całej trasie.
                  </p>

                </div>

              )}


              {/* OBLICZANIE ZUŻYCIA */}

              {mode === "fuel" && (

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


                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Podaj średnie spalanie samochodu.
                  </p>

                </div>

              )}


              {/* CENA */}

              <div>

                <label className="mb-2 block text-sm font-semibold">

                  Cena paliwa

                  <span className="ml-2 font-normal text-slate-400">
                    opcjonalnie
                  </span>

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

            </div>


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
              💡 Przykład: jeżeli przejechałeś 520 km i zużyłeś
              39 litrów paliwa, średnie spalanie wynosi 7,50 l/100 km.
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
                    ⛽
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
                    Średnie spalanie
                  </div>

                  <div className="mt-2 text-5xl font-extrabold tracking-tight">

                    {formatNumber(
                      calculatedConsumption,
                    )}

                    <span className="ml-2 text-xl font-medium text-slate-300">
                      l/100 km
                    </span>

                  </div>

                </div>


                {/* DYSTANS / PALIWO */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl bg-white/10 p-5">

                    <div className="text-sm text-slate-300">
                      Dystans
                    </div>

                    <div className="mt-1 text-xl font-bold">
                      {formatNumber(km, 1)} km
                    </div>

                  </div>


                  <div className="rounded-2xl bg-white/10 p-5">

                    <div className="text-sm text-slate-300">
                      Zużyte / potrzebne paliwo
                    </div>

                    <div className="mt-1 text-xl font-bold">
                      {formatNumber(calculatedFuel)} l
                    </div>

                  </div>

                </div>


                {/* KOSZT */}

                {price > 0 && (

                  <div className="rounded-2xl bg-blue-500/10 p-5">

                    <div className="text-sm text-blue-200">
                      Koszt jazdy
                    </div>

                    <div className="mt-1 text-3xl font-bold text-blue-100">
                      {formatNumber(totalCost)} zł
                    </div>

                    <div className="mt-3 text-sm text-slate-400">
                      Koszt 100 km:{" "}
                      <strong className="text-slate-200">
                        {formatNumber(costPer100)} zł
                      </strong>
                    </div>

                  </div>

                )}


                {/* FORMUŁA */}

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="text-sm text-slate-300">
                    Sposób obliczenia
                  </div>

                  {mode === "consumption" ? (

                    <div className="mt-3 font-mono text-sm leading-7 text-slate-300">
                      {formatNumber(liters)} ÷{" "}
                      {formatNumber(km, 1)} × 100 ={" "}
                      <strong className="text-white">
                        {formatNumber(calculatedConsumption)} l/100 km
                      </strong>
                    </div>

                  ) : (

                    <div className="mt-3 font-mono text-sm leading-7 text-slate-300">
                      {formatNumber(km, 1)} ×{" "}
                      {formatNumber(lPer100)} ÷ 100 ={" "}
                      <strong className="text-white">
                        {formatNumber(calculatedFuel)} l
                      </strong>
                    </div>

                  )}

                </div>


                {/* COPY */}

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


        {/* SEO / EDUKACJA */}

        <article className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-2xl font-bold">
            Jak obliczyć spalanie samochodu?
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Średnie spalanie samochodu określa ilość paliwa
            potrzebną do przejechania 100 kilometrów. Najczęściej
            podaje się je w litrach na 100 km.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            Najbardziej praktyczny sposób obliczenia spalania
            polega na sprawdzeniu, ile paliwa samochód rzeczywiście
            zużył na znanym dystansie.
          </p>


          <div className="mt-6 rounded-2xl bg-slate-50 p-5">

            <div className="font-semibold">
              Wzór:
            </div>

            <div className="mt-3 font-mono text-sm text-slate-600">
              spalanie = zużyte paliwo ÷ przejechany dystans × 100
            </div>

          </div>


          <h3 className="mt-8 text-xl font-bold">
            Przykład: 39 litrów na 520 km
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Jeżeli samochód zużył 39 litrów paliwa podczas przejazdu
            520 km, obliczenie wygląda następująco:
          </p>

          <div className="mt-4 rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-600">
            39 ÷ 520 × 100 = 7,50 l/100 km
          </div>


          <h3 className="mt-8 text-xl font-bold">
            Jak obliczyć, ile paliwa potrzeba na trasę?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Jeżeli znasz już średnie spalanie samochodu, możesz
            obliczyć potrzebną ilość paliwa dla dowolnego dystansu.
          </p>

          <div className="mt-4 rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-600">
            potrzebne paliwo = dystans × spalanie ÷ 100
          </div>


          <h3 className="mt-8 text-xl font-bold">
            Jak obliczyć koszt przejazdu?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Po określeniu ilości potrzebnego paliwa pomnóż ją
            przez cenę jednego litra. Możesz również obliczyć
            bezpośrednio koszt pokonania 100 km.
          </p>

          <div className="mt-4 rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-600">
            koszt 100 km = spalanie × cena paliwa
          </div>


          {/* LINKOWANIE */}

          <div className="mt-7 flex flex-wrap gap-3">

            <Link
              href="/motoryzacja/koszt-paliwa"
              className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
            >
              Oblicz koszt paliwa →
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
            FAQ – kalkulator spalania
          </h3>


          <div className="mt-5 space-y-6">

            <div>

              <h4 className="font-semibold">
                Jak najdokładniej sprawdzić spalanie samochodu?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Najlepiej zatankować samochód, wyzerować licznik
                przebiegu, przejechać określony dystans, a następnie
                ponownie zatankować. Ilość dolanego paliwa i przejechany
                dystans pozwalają obliczyć rzeczywiste spalanie.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy kalkulator działa dla LPG?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. W przypadku LPG podaj ilość zużytego gazu
                lub średnie spalanie LPG oraz cenę gazu za litr.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Ile kosztuje przejechanie 100 km?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Zależy to od spalania samochodu oraz ceny paliwa.
                Koszt 100 km otrzymasz, mnożąc średnie spalanie
                przez cenę jednego litra paliwa.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy komputer pokładowy pokazuje dokładne spalanie?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Wskazanie komputera może różnić się od rzeczywistego
                zużycia paliwa. Dokładniejszy wynik uzyskasz na podstawie
                ilości zatankowanego paliwa i rzeczywistego dystansu.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy można wpisać przecinek zamiast kropki?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Kalkulator obsługuje oba sposoby zapisu liczb,
                np. 7,5 oraz 7.5.
              </p>

            </div>

          </div>


          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <div className="font-semibold">
              Ważne
            </div>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              Wynik jest obliczeniem matematycznym na podstawie
              wprowadzonych danych. Rzeczywiste zużycie paliwa może
              zmieniać się w zależności od stylu jazdy, warunków
              drogowych, temperatury, obciążenia samochodu oraz rodzaju
              paliwa.
            </p>

          </div>

        </article>

      </div>
    </CalculatorLayout>
  );
}