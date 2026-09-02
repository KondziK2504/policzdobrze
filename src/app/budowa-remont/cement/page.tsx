"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { parseNumber } from "@/lib/number";

export default function CementPage() {
  const [volume, setVolume] = useState("");
  const [cementPerM3, setCementPerM3] = useState("300");
  const [bagWeight, setBagWeight] = useState("25");
  const [reserve, setReserve] = useState("10");

  const volumeValue = parseNumber(volume);
  const cementValue = parseNumber(cementPerM3);
  const bagValue = parseNumber(bagWeight);
  const reserveValue = parseNumber(reserve);

  const valid =
    volumeValue > 0 &&
    cementValue > 0 &&
    bagValue > 0;

  const cementWeight = valid
    ? volumeValue *
      cementValue *
      (1 + reserveValue / 100)
    : 0;

  const bags = valid
    ? Math.ceil(cementWeight / bagValue)
    : 0;

  return (
    <CalculatorLayout
      icon="🧱"
      title="Kalkulator cementu"
      description="Oszacuj ilość cementu potrzebnego do przygotowania mieszanki lub wykonania prac budowlanych."
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

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Dane mieszanki
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Podaj objętość mieszanki oraz orientacyjne zużycie cementu.
          </p>

          <div className="mt-7 space-y-5">

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Objętość mieszanki
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="decimal"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="np. 5"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  m³
                </span>

              </div>

            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold">
                Cement na 1 m³
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="decimal"
                  value={cementPerM3}
                  onChange={(e) => setCementPerM3(e.target.value)}
                  placeholder="np. 300"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-20 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  kg/m³
                </span>

              </div>

            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold">
                Waga worka
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="decimal"
                  value={bagWeight}
                  onChange={(e) => setBagWeight(e.target.value)}
                  placeholder="np. 25"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-16 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  kg
                </span>

              </div>

            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold">
                Zapas
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="decimal"
                  value={reserve}
                  onChange={(e) => setReserve(e.target.value)}
                  placeholder="np. 10"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  %
                </span>

              </div>

            </div>

          </div>

        </div>


        <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">

          <h2 className="text-xl font-bold">
            Wynik
          </h2>

          {!valid ? (

            <div className="flex min-h-[390px] items-center justify-center text-center">

              <div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  🧱
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź dane,
                  <br />
                  aby obliczyć ilość cementu.
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Potrzebna masa cementu
                </div>

                <div className="mt-2 text-4xl font-extrabold">
                  {cementWeight.toFixed(0)} kg
                </div>

              </div>


              <div className="rounded-2xl bg-blue-500/10 p-5">

                <div className="text-sm text-blue-200">
                  Liczba worków
                </div>

                <div className="mt-1 text-3xl font-bold text-blue-100">
                  {bags} szt.
                </div>

              </div>

            </div>

          )}

        </div>

      </div>


      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          Jak obliczyć ilość cementu?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Ilość cementu zależy od objętości mieszanki oraz
          przyjętego zużycia cementu na 1 m³. Warto uwzględnić
          niewielki zapas na straty podczas wykonywania prac.
        </p>

        <p className="mt-4 text-sm leading-7 text-slate-500">
          Podana dawka cementu jest parametrem orientacyjnym.
          Rzeczywiste proporcje powinny wynikać z receptury
          konkretnej mieszanki.
        </p>

      </div>

    </CalculatorLayout>
  );
}