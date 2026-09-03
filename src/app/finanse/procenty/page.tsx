"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

type Mode = "part" | "share" | "change";

export default function ProcentyPage() {
  const [mode, setMode] = useState<Mode>("part");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  const a = parseNumber(first);
  const b = parseNumber(second);

  const valid = (() => {
    if (mode === "part") {
      return a >= 0 && b > 0;
    }

    if (mode === "share") {
      return a > 0 && b > 0;
    }

    return a > 0 && b > 0;
  })();

  const result = (() => {
    if (!valid) return null;

    if (mode === "part") {
      return {
        main: (a * b) / 100,
        label: `${a}% z ${b}`,
      };
    }

    if (mode === "share") {
      return {
        main: (a / b) * 100,
        label: `${a} stanowi procent z ${b}`,
      };
    }

    const change = ((b - a) / a) * 100;

    return {
      main: Math.abs(change),
      label: change >= 0 ? "wzrost" : "spadek",
    };
  })();


  return (
    <CalculatorLayout
      icon="%"
      title="Kalkulator procentów"
      description="Oblicz procent z liczby, udział procentowy lub zmianę procentową."
      categoryName="Finanse"
      categoryHref="/finanse"
      related={[
        {
          icon: "📊",
          title: "Kalkulator marży",
          href: "/finanse/marza",
        },
        {
          icon: "📈",
          title: "Kalkulator narzutu",
          href: "/finanse/narzut",
        },
        {
          icon: "💵",
          title: "Kalkulator VAT",
          href: "/finanse/vat",
        },
      ]}
    >

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Wybierz działanie
          </h2>

          <div className="mt-7 space-y-5">

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Rodzaj obliczenia
              </label>

              <select
                value={mode}
                onChange={(e) =>
                  setMode(e.target.value as Mode)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >

                <option value="part">
                  Ile wynosi X% z liczby?
                </option>

                <option value="share">
                  Ile procent stanowi A z B?
                </option>

                <option value="change">
                  Jaka jest zmiana procentowa?
                </option>

              </select>

            </div>


            {mode === "part" && (
              <>
                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Procent
                  </label>

                  <div className="relative">

                    <input
                      type="text"
                      inputMode="decimal"
                      value={first}
                      onChange={(e) => setFirst(e.target.value)}
                      placeholder="np. 20"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500"
                    />

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                      %
                    </span>

                  </div>

                </div>


                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Liczba
                  </label>

                  <input
                    type="text"
                    inputMode="decimal"
                    value={second}
                    onChange={(e) => setSecond(e.target.value)}
                    placeholder="np. 500"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />

                </div>
              </>
            )}


            {mode === "share" && (
              <>
                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Liczba A
                  </label>

                  <input
                    type="text"
                    inputMode="decimal"
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}
                    placeholder="np. 25"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Liczba B
                  </label>

                  <input
                    type="text"
                    inputMode="decimal"
                    value={second}
                    onChange={(e) => setSecond(e.target.value)}
                    placeholder="np. 100"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />

                </div>
              </>
            )}


            {mode === "change" && (
              <>
                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Wartość początkowa
                  </label>

                  <input
                    type="text"
                    inputMode="decimal"
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}
                    placeholder="np. 100"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Wartość końcowa
                  </label>

                  <input
                    type="text"
                    inputMode="decimal"
                    value={second}
                    onChange={(e) => setSecond(e.target.value)}
                    placeholder="np. 125"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />

                </div>
              </>
            )}

          </div>

        </div>


        <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">

          <h2 className="text-xl font-bold">
            Wynik
          </h2>

          {!valid || !result ? (

            <div className="flex min-h-[380px] items-center justify-center text-center">
              <p className="text-slate-300">
                Wprowadź dane, aby zobaczyć wynik.
              </p>
            </div>

          ) : (

            <div className="mt-7">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  {result.label}
                </div>

                <div className="mt-2 text-5xl font-extrabold">
                  {result.main.toFixed(2)}
                  {mode === "part" ? " zł" : "%"}
                </div>

              </div>

              {mode === "change" && (
                <p className="mt-5 text-sm leading-6 text-slate-400">
                  Wynik pokazuje zmianę względem wartości początkowej.
                </p>
              )}

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczać procenty?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Procent oznacza część ze stu. W zależności od rodzaju
          obliczenia można sprawdzić wartość procentu z liczby,
          udział jednej liczby w drugiej albo zmianę procentową
          pomiędzy dwiema wartościami.
        </p>

      </div>


      <CalculatorTracker
        calculator="procenty"
        isCalculated={valid}
      />
    </CalculatorLayout>
  );
}