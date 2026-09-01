"use client";

import { useState } from "react";

export default function KosztPrzejazdu() {
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [roundTrip, setRoundTrip] = useState(false);
  const [people, setPeople] = useState("1");

  const calculate = () => {
    const km = Number(distance);
    const fuel = Number(consumption);
    const price = Number(fuelPrice);
    const persons = Number(people);

    if (!km || !fuel || !price || !persons) {
      return null;
    }

    const totalDistance = roundTrip ? km * 2 : km;
    const liters = (totalDistance * fuel) / 100;
    const totalCost = liters * price;
    const costPer100 = (fuel * price);
    const costPerPerson = totalCost / persons;

    return {
      totalDistance,
      liters,
      totalCost,
      costPer100,
      costPerPerson,
    };
  };

  const result = calculate();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-xl font-extrabold tracking-tight"
          >
            POLICZ<span className="text-blue-600">DOBRZE</span>
          </a>

          <a
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            ← Wszystkie kalkulatory
          </a>
        </div>
      </header>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <div className="mb-4 text-5xl">🚗</div>

            <h1 className="text-4xl font-extrabold tracking-tight">
              Kalkulator kosztu przejazdu
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Oblicz koszt paliwa, ilość potrzebnego paliwa oraz koszt
              przejazdu na osobę.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* FORMULARZ */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-xl font-bold">
                Podaj dane
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Dystans
                  </label>

                  <div className="flex">
                    <input
                      type="number"
                      min="0"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      placeholder="np. 500"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <span className="ml-[-45px] flex items-center text-sm text-slate-400">
                      km
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Spalanie samochodu
                  </label>

                  <div className="flex">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={consumption}
                      onChange={(e) => setConsumption(e.target.value)}
                      placeholder="np. 7.0"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <span className="ml-[-75px] flex items-center text-sm text-slate-400">
                      l/100 km
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Cena paliwa
                  </label>

                  <div className="flex">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={fuelPrice}
                      onChange={(e) => setFuelPrice(e.target.value)}
                      placeholder="np. 6.50"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <span className="ml-[-45px] flex items-center text-sm text-slate-400">
                      zł/l
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Liczba osób
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <input
                    type="checkbox"
                    checked={roundTrip}
                    onChange={(e) => setRoundTrip(e.target.checked)}
                    className="h-5 w-5"
                  />

                  <span className="text-sm font-medium">
                    Podróż w obie strony
                  </span>
                </label>
              </div>
            </div>

            {/* WYNIK */}
            <div className="rounded-3xl bg-slate-900 p-7 text-white">
              <h2 className="text-xl font-bold">
                Twój wynik
              </h2>

              {!result ? (
                <div className="flex min-h-[300px] items-center justify-center text-center">
                  <div>
                    <div className="text-5xl">🧮</div>

                    <p className="mt-4 text-slate-300">
                      Wpisz dane po lewej stronie,
                      <br />
                      a wynik pojawi się tutaj.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-7 space-y-4">
                  <div className="rounded-2xl bg-white/10 p-5">
                    <div className="text-sm text-slate-300">
                      Całkowity koszt paliwa
                    </div>

                    <div className="mt-1 text-4xl font-extrabold">
                      {result.totalCost.toFixed(2)} zł
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <div className="text-sm text-slate-300">
                        Dystans
                      </div>

                      <div className="mt-1 text-xl font-bold">
                        {result.totalDistance.toFixed(0)} km
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4">
                      <div className="text-sm text-slate-300">
                        Paliwo
                      </div>

                      <div className="mt-1 text-xl font-bold">
                        {result.liters.toFixed(1)} l
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-5">
                    <div className="flex justify-between py-2">
                      <span className="text-slate-300">
                        Koszt 100 km
                      </span>

                      <strong>
                        {result.costPer100.toFixed(2)} zł
                      </strong>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-slate-300">
                        Koszt na osobę
                      </span>

                      <strong>
                        {result.costPerPerson.toFixed(2)} zł
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* INFORMACJE */}
          <div className="mt-12 rounded-3xl bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold">
              Jak obliczany jest koszt przejazdu?
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Koszt przejazdu obliczamy na podstawie dystansu,
              średniego spalania samochodu oraz aktualnej ceny paliwa.
              Kalkulator uwzględnia również podróż w obie strony
              oraz pozwala podzielić koszt paliwa pomiędzy pasażerów.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <div className="font-semibold">
                Wzór:
              </div>

              <div className="mt-2 font-mono text-sm text-slate-600">
                koszt = dystans × spalanie ÷ 100 × cena paliwa
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} PoliczDobrze.pl
        </div>
      </footer>
    </main>
  );
}