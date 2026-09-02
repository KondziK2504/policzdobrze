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

export default function SprowadzenieAutaPage() {
  const [carPrice, setCarPrice] = useState("");
  const [transport, setTransport] = useState("");
  const [exciseRate, setExciseRate] = useState("3.1");
  const [otherCosts, setOtherCosts] = useState("");

  const [calculated, setCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  const price = parseNumber(carPrice);
  const transportCost = parseNumber(transport);
  const excise = parseNumber(exciseRate);
  const additionalCosts = parseNumber(otherCosts);

  const valid = price > 0;

  const exciseCost = valid
    ? price * (excise / 100)
    : 0;

  const total = valid
    ? price +
      transportCost +
      exciseCost +
      additionalCosts
    : 0;

  const additionalTotal =
    transportCost +
    exciseCost +
    additionalCosts;

  const additionalShare =
    price > 0
      ? (additionalTotal / price) * 100
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
    setCarPrice("35000");
    setTransport("2500");
    setExciseRate("3.1");
    setOtherCosts("1000");
    setCalculated(false);
    setCopied(false);
  }

  function handleReset() {
    setCarPrice("");
    setTransport("");
    setExciseRate("3.1");
    setOtherCosts("");
    setCalculated(false);
    setCopied(false);
  }

  async function handleCopy() {
    if (!calculated) {
      return;
    }

    const text = [
      `Cena samochodu: ${formatNumber(price)} zł`,
      `Akcyza (${formatNumber(excise, 1)}%): ${formatNumber(exciseCost)} zł`,
      `Transport: ${formatNumber(transportCost)} zł`,
      `Pozostałe koszty: ${formatNumber(additionalCosts)} zł`,
      `Łączny koszt: ${formatNumber(total)} zł`,
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
      icon="🚘"
      title="Kalkulator sprowadzenia auta – koszt importu samochodu"
      description="Oszacuj orientacyjny całkowity koszt sprowadzenia samochodu z zagranicy, uwzględniając cenę auta, transport, akcyzę i dodatkowe wydatki."
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
          icon: "⛽",
          title: "Kalkulator spalania",
          href: "/motoryzacja/spalanie",
        },
      ]}
    >
      <CalculatorTracker
        calculator="sprowadzenie-auta"
        isCalculated={calculated}
      />

      <div className="mx-auto max-w-5xl">

        {/* WPROWADZENIE */}

        <div className="mb-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-7">

          <h2 className="text-xl font-bold text-slate-950">
            Sprawdź orientacyjny koszt sprowadzenia samochodu
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Podaj cenę samochodu oraz koszty związane z jego
            transportem i przygotowaniem do rejestracji. Kalkulator
            pokaże orientacyjny koszt auta po doliczeniu podanych
            wydatków i wybranej stawki akcyzy.
          </p>

        </div>


        {/* KALKULATOR */}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* FORMULARZ */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-xl font-bold">
              Koszty importu
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Możesz używać przecinka lub kropki jako separatora
              dziesiętnego.
            </p>


            <div className="mt-7 space-y-5">

              {/* CENA AUTA */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Cena samochodu
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={carPrice}
                    onChange={(e) => {
                      setCarPrice(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 35000"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    zł
                  </span>

                </div>

              </div>


              {/* TRANSPORT */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Transport
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={transport}
                    onChange={(e) => {
                      setTransport(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 2500"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    zł
                  </span>

                </div>

              </div>


              {/* AKCYZA */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Stawka akcyzy
                </label>

                <select
                  value={exciseRate}
                  onChange={(e) => {
                    setExciseRate(e.target.value);
                    setCalculated(false);
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                >

                  <option value="3.1">
                    3,1%
                  </option>

                  <option value="18.6">
                    18,6%
                  </option>

                </select>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Wybierz stawkę używaną do orientacyjnej symulacji.
                </p>

              </div>


              {/* DODATKOWE */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Pozostałe koszty
                </label>

                <div className="relative">

                  <input
                    type="text"
                    inputMode="decimal"
                    value={otherCosts}
                    onChange={(e) => {
                      setOtherCosts(e.target.value);
                      setCalculated(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCalculate();
                      }
                    }}
                    placeholder="np. 1000"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    zł
                  </span>

                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Możesz uwzględnić np. badanie techniczne,
                  tłumaczenia dokumentów, rejestrację lub inne
                  wydatki.
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


            <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm leading-6 text-amber-800">

              <strong>⚠️ Ważne:</strong>{" "}
              wynik jest orientacyjny. Rzeczywiste należności
              i koszty zależą od konkretnego pojazdu, jego parametrów,
              kraju pochodzenia oraz aktualnych przepisów.

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
                    🚘
                  </div>

                  <p className="mt-5 text-slate-300">
                    Wprowadź cenę samochodu
                    <br />
                    i kliknij „Oblicz”.
                  </p>

                </div>

              </div>

            ) : (

              <div className="mt-7 space-y-4">

                {/* GŁÓWNY WYNIK */}

                <div className="rounded-2xl bg-white/10 p-6">

                  <div className="text-sm text-slate-300">
                    Orientacyjny łączny koszt
                  </div>

                  <div className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                    {formatNumber(total)}

                    <span className="ml-2 text-xl font-medium text-slate-300">
                      zł
                    </span>

                  </div>

                </div>


                {/* SZCZEGÓŁY */}

                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="flex items-center justify-between py-2">

                    <span className="text-slate-300">
                      Samochód
                    </span>

                    <strong>
                      {formatNumber(price)} zł
                    </strong>

                  </div>


                  <div className="flex items-center justify-between py-2">

                    <span className="text-slate-300">
                      Akcyza ({formatNumber(excise, 1)}%)
                    </span>

                    <strong>
                      {formatNumber(exciseCost)} zł
                    </strong>

                  </div>


                  <div className="flex items-center justify-between py-2">

                    <span className="text-slate-300">
                      Transport
                    </span>

                    <strong>
                      {formatNumber(transportCost)} zł
                    </strong>

                  </div>


                  <div className="flex items-center justify-between py-2">

                    <span className="text-slate-300">
                      Pozostałe koszty
                    </span>

                    <strong>
                      {formatNumber(additionalCosts)} zł
                    </strong>

                  </div>

                </div>


                {/* DODATKOWE INFO */}

                <div className="rounded-2xl bg-blue-500/10 p-5">

                  <div className="text-sm text-blue-200">
                    Dodatkowe koszty względem ceny auta
                  </div>

                  <div className="mt-1 text-2xl font-bold text-blue-100">
                    {formatNumber(additionalTotal)} zł
                  </div>

                  <div className="mt-2 text-sm text-slate-400">
                    To około{" "}
                    <strong className="text-slate-200">
                      {formatNumber(additionalShare, 1)}%
                    </strong>{" "}
                    ceny samochodu.
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

              </div>

            )}

          </div>

        </div>


        {/* TREŚĆ SEO */}

        <article className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-2xl font-bold">
            Ile kosztuje sprowadzenie samochodu?
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Cena samochodu widoczna w zagranicznym ogłoszeniu
            nie musi odpowiadać całkowitemu kosztowi, jaki poniesiesz
            do momentu przygotowania auta do użytkowania w Polsce.
            W kalkulacji mogą pojawić się między innymi koszty transportu,
            należności związane z importem oraz wydatki administracyjne.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            Jak obliczyć orientacyjny koszt importu auta?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Najprostszym sposobem jest zsumowanie ceny samochodu
            oraz wszystkich dodatkowych kosztów, które chcesz
            uwzględnić w kalkulacji.
          </p>


          <div className="mt-6 rounded-2xl bg-slate-50 p-5">

            <div className="font-semibold">
              Uproszczony wzór:
            </div>

            <div className="mt-3 font-mono text-sm leading-7 text-slate-600">
              koszt całkowity = cena auta + transport + akcyza + pozostałe koszty
            </div>

          </div>


          <h3 className="mt-8 text-xl font-bold">
            Przykład
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Dla samochodu kosztującego 35 000 zł, transportu
            za 2 500 zł, stawki 3,1% oraz 1 000 zł pozostałych
            kosztów kalkulator daje wynik około 39 585 zł.
          </p>


          <h3 className="mt-8 text-xl font-bold">
            O czym pamiętać?
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Koszt sprowadzenia samochodu zależy od konkretnego
            pojazdu i jego sytuacji. Dlatego wynik kalkulatora
            należy traktować jako orientacyjną symulację, a nie
            ostateczne rozliczenie wszystkich należności.
          </p>


          <div className="mt-7 flex flex-wrap gap-3">

            <Link
              href="/motoryzacja/koszt-przejazdu"
              className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
            >
              Oblicz koszt przejazdu →
            </Link>

            <Link
              href="/motoryzacja/koszt-paliwa"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Oblicz koszt paliwa →
            </Link>

            <Link
              href="/motoryzacja/spalanie"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              Oblicz spalanie →
            </Link>

          </div>


          {/* FAQ */}

          <h3 className="mt-10 text-xl font-bold">
            FAQ – sprowadzenie auta
          </h3>


          <div className="mt-5 space-y-6">

            <div>

              <h4 className="font-semibold">
                Czy kalkulator pokazuje wszystkie koszty sprowadzenia auta?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Nie. To uproszczona symulacja. Rzeczywisty koszt
                może zależeć od dodatkowych opłat i indywidualnych
                parametrów samochodu.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy transport można uwzględnić w kalkulacji?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Wpisz przewidywany koszt transportu samochodu
                do Polski.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Co wpisać w „Pozostałe koszty”?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Możesz uwzględnić tam dodatkowe wydatki, których
                nie ma w pozostałych polach, np. tłumaczenia,
                badanie techniczne lub inne koszty związane
                z przygotowaniem auta.
              </p>

            </div>


            <div>

              <h4 className="font-semibold">
                Czy wynik jest dokładnym wyliczeniem akcyzy?
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                Nie. Kalkulator ma charakter orientacyjny.
                Przed zakupem samochodu należy sprawdzić aktualne
                zasady i należności dotyczące konkretnego pojazdu.
              </p>

            </div>

          </div>


          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">

            <div className="font-semibold text-amber-900">
              Uwaga
            </div>

            <p className="mt-2 text-sm leading-7 text-amber-800">
              Kalkulator wykonuje uproszczone obliczenie na podstawie
              podanych wartości. Nie stanowi porady podatkowej ani
              ostatecznego wyliczenia należności publicznoprawnych.
            </p>

          </div>

        </article>

      </div>
    </CalculatorLayout>
  );
}