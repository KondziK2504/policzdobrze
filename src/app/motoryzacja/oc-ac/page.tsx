"use client";

import { useMemo, useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";
import { parseNumber } from "@/lib/number";

type InsuranceType = "oc" | "oc-ac";

type ResidenceType =
  | "small"
  | "medium"
  | "large";

type DrivingHistory =
  | "first"
  | "1-3"
  | "4-7"
  | "8-10"
  | "10+";

function formatMoney(value: number) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function getRiskLabel(score: number) {
  if (score <= 25) {
    return {
      title: "Niskie ryzyko cenowe",
      description:
        "Profil może sprzyjać niższej składce, szczególnie przy bezszkodowej historii.",
    };
  }

  if (score <= 50) {
    return {
      title: "Umiarkowane ryzyko cenowe",
      description:
        "Profil jest typowy, ale część parametrów może podnosić koszt polisy.",
    };
  }

  if (score <= 75) {
    return {
      title: "Podwyższone ryzyko cenowe",
      description:
        "Kilka parametrów może wyraźnie zwiększać koszt ubezpieczenia.",
    };
  }

  return {
    title: "Wysokie ryzyko cenowe",
    description:
      "Profil zawiera kilka czynników, które mogą powodować znaczną zwyżkę składki.",
  };
}

export default function OcAcPage() {
  const [insuranceType, setInsuranceType] =
    useState<InsuranceType>("oc");

  const [age, setAge] = useState("30");
  const [licenseYears, setLicenseYears] = useState("10");
  const [drivingHistory, setDrivingHistory] =
    useState<DrivingHistory>("8-10");

  const [engine, setEngine] = useState("1600");
  const [carValue, setCarValue] = useState("50000");
  const [carAge, setCarAge] = useState("8");

  const [residence, setResidence] =
    useState<ResidenceType>("medium");

  const [accidents, setAccidents] = useState("0");

  const ageValue = parseNumber(age);
  const licenseYearsValue = parseNumber(licenseYears);
  const engineValue = parseNumber(engine);
  const carValueValue = parseNumber(carValue);
  const carAgeValue = parseNumber(carAge);
  const accidentsValue = parseNumber(accidents);

  const valid =
    ageValue >= 18 &&
    licenseYearsValue >= 0 &&
    engineValue > 0 &&
    carValueValue > 0 &&
    carAgeValue >= 0 &&
    accidentsValue >= 0;

  const result = useMemo(() => {
    if (!valid) {
      return null;
    }

    let score = 0;

    // Wiek kierowcy
    if (ageValue < 21) score += 35;
    else if (ageValue < 25) score += 25;
    else if (ageValue < 30) score += 15;
    else if (ageValue >= 60) score += 5;

    // Staż prawa jazdy
    if (licenseYearsValue < 2) score += 20;
    else if (licenseYearsValue < 5) score += 10;
    else if (licenseYearsValue < 10) score += 5;

    // Historia ubezpieczenia
    if (drivingHistory === "first") score += 20;
    else if (drivingHistory === "1-3") score += 12;
    else if (drivingHistory === "4-7") score += 7;
    else if (drivingHistory === "8-10") score += 3;

    // Pojemność silnika
    if (engineValue > 3000) score += 20;
    else if (engineValue > 2500) score += 15;
    else if (engineValue > 2000) score += 10;
    else if (engineValue > 1600) score += 5;

    // Miejsce zamieszkania
    if (residence === "large") score += 10;
    else if (residence === "medium") score += 5;

    // Szkody
    score += Math.min(accidentsValue * 12, 36);

    const normalizedScore = Math.min(score, 100);

    /*
     * To NIE jest rzeczywista taryfikacja ubezpieczyciela.
     * Tworzymy przedział orientacyjny na podstawie profilu.
     */
    const baseOc = 650;

    let ocMultiplier = 1;

    if (normalizedScore <= 15) ocMultiplier = 0.85;
    else if (normalizedScore <= 30) ocMultiplier = 1;
    else if (normalizedScore <= 45) ocMultiplier = 1.2;
    else if (normalizedScore <= 60) ocMultiplier = 1.45;
    else if (normalizedScore <= 75) ocMultiplier = 1.8;
    else ocMultiplier = 2.3;

    let estimatedOc = baseOc * ocMultiplier;

    // Duży silnik może dodatkowo wpływać na wynik orientacyjny.
    if (engineValue > 2500) {
      estimatedOc *= 1.18;
    } else if (engineValue > 2000) {
      estimatedOc *= 1.1;
    }

    const ocMin = Math.max(350, estimatedOc * 0.82);
    const ocMax = estimatedOc * 1.22;

    let acMin = 0;
    let acMax = 0;

    if (insuranceType === "oc-ac") {
      /*
       * Uproszczona orientacja kosztu AC.
       * Nie jest to oferta ani kalkulacja konkretnego TU.
       */
      let acRate = 0.035;

      if (carAgeValue > 15) acRate = 0.045;
      else if (carAgeValue > 10) acRate = 0.04;
      else if (carAgeValue <= 5) acRate = 0.03;

      if (carValueValue > 150000) {
        acRate += 0.01;
      }

      const estimatedAc =
        carValueValue * acRate;

      acMin = Math.max(
        500,
        estimatedAc * 0.75,
      );

      acMax = estimatedAc * 1.3;
    }

    const totalMin =
      insuranceType === "oc-ac"
        ? ocMin + acMin
        : ocMin;

    const totalMax =
      insuranceType === "oc-ac"
        ? ocMax + acMax
        : ocMax;

    return {
      score: normalizedScore,
      ocMin,
      ocMax,
      acMin,
      acMax,
      totalMin,
      totalMax,
    };
  }, [
    valid,
    ageValue,
    licenseYearsValue,
    drivingHistory,
    engineValue,
    carValueValue,
    carAgeValue,
    residence,
    accidentsValue,
    insuranceType,
  ]);

  const risk = result
    ? getRiskLabel(result.score)
    : null;

  return (
    <CalculatorLayout
      icon="🛡️"
      title="Kalkulator OC/AC"
      description="Oszacuj orientacyjny koszt ubezpieczenia samochodu OC lub OC i AC na podstawie profilu kierowcy oraz auta."
      categoryName="Motoryzacja"
      categoryHref="/motoryzacja"
      related={[
        {
          icon: "🚘",
          title: "Kalkulator sprowadzenia auta",
          href: "/motoryzacja/sprowadzenie-auta",
        },
        {
          icon: "🚗",
          title: "Kalkulator kosztu przejazdu",
          href: "/motoryzacja/koszt-przejazdu",
        },
        {
          icon: "🏦",
          title: "Kalkulator leasingu samochodu",
          href: "/finanse/leasing",
        },
      ]}
    >
      <CalculatorTracker
        calculator="oc-ac"
        isCalculated={Boolean(result)}
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold">
            Dane kierowcy i samochodu
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Wpisz podstawowe informacje, aby otrzymać orientacyjny
            przedział kosztu ubezpieczenia.
          </p>

          <div className="mt-7 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Rodzaj ubezpieczenia
              </label>

              <select
                value={insuranceType}
                onChange={(e) =>
                  setInsuranceType(
                    e.target.value as InsuranceType,
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="oc">
                  Tylko OC
                </option>
                <option value="oc-ac">
                  OC + AC
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Wiek kierowcy
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={age}
                  onChange={(e) =>
                    setAge(e.target.value)
                  }
                  placeholder="np. 30"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  lat
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Staż prawa jazdy
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={licenseYears}
                  onChange={(e) =>
                    setLicenseYears(
                      e.target.value,
                    )
                  }
                  placeholder="np. 10"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  lat
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Historia ubezpieczenia
              </label>

              <select
                value={drivingHistory}
                onChange={(e) =>
                  setDrivingHistory(
                    e.target.value as DrivingHistory,
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="first">
                  Pierwsza polisa
                </option>
                <option value="1-3">
                  1–3 lata
                </option>
                <option value="4-7">
                  4–7 lat
                </option>
                <option value="8-10">
                  8–10 lat
                </option>
                <option value="10+">
                  Ponad 10 lat
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Liczba szkód w ostatnich latach
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={accidents}
                  onChange={(e) =>
                    setAccidents(
                      e.target.value,
                    )
                  }
                  placeholder="np. 0"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-16 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  szkód
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Pojemność silnika
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={engine}
                  onChange={(e) =>
                    setEngine(e.target.value)
                  }
                  placeholder="np. 1600"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-20 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  cm³
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Wartość samochodu
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={carValue}
                  onChange={(e) =>
                    setCarValue(
                      e.target.value,
                    )
                  }
                  placeholder="np. 50000"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  zł
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Wiek samochodu
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={carAge}
                  onChange={(e) =>
                    setCarAge(
                      e.target.value,
                    )
                  }
                  placeholder="np. 8"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  lat
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Miejsce zamieszkania
              </label>

              <select
                value={residence}
                onChange={(e) =>
                  setResidence(
                    e.target.value as ResidenceType,
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="small">
                  Mała miejscowość
                </option>
                <option value="medium">
                  Średnie miasto
                </option>
                <option value="large">
                  Duże miasto
                </option>
              </select>
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div className="font-semibold text-blue-900">
              💡 Wpisuj dane orientacyjne
            </div>

            <p className="mt-2 text-sm leading-6 text-blue-800">
              Kalkulator pokazuje przedział orientacyjny.
              Rzeczywista składka może być zupełnie inna,
              ponieważ każde towarzystwo stosuje własne kryteria
              i taryfy.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              Wynik
            </h2>

            {result && (
              <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Gotowe
              </div>
            )}
          </div>

          {!result ? (
            <div className="flex min-h-[560px] items-center justify-center text-center">
              <div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  🛡️
                </div>

                <p className="mt-5 text-slate-300">
                  Uzupełnij dane kierowcy
                  <br />
                  i samochodu.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-7">
              <div className="rounded-2xl bg-white/10 p-6">
                <div className="text-sm text-slate-300">
                  Orientacyjny koszt roczny
                </div>

                <div className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  {formatMoney(result.totalMin)}
                  {" – "}
                  {formatMoney(result.totalMax)}
                  <span className="ml-2 text-xl font-medium text-slate-300">
                    zł
                  </span>
                </div>

                <div className="mt-2 text-sm text-slate-400">
                  {insuranceType === "oc"
                    ? "OC"
                    : "OC + AC"}
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-5">
                  <div className="text-sm text-slate-300">
                    Orientacyjne OC
                  </div>

                  <div className="mt-1 text-xl font-bold">
                    {formatMoney(result.ocMin)}
                    {" – "}
                    {formatMoney(result.ocMax)} zł
                  </div>
                </div>

                {insuranceType === "oc-ac" ? (
                  <div className="rounded-2xl bg-white/10 p-5">
                    <div className="text-sm text-slate-300">
                      Orientacyjne AC
                    </div>

                    <div className="mt-1 text-xl font-bold">
                      {formatMoney(result.acMin)}
                      {" – "}
                      {formatMoney(result.acMax)} zł
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-white/10 p-5">
                    <div className="text-sm text-slate-300">
                      Profil cenowy
                    </div>

                    <div className="mt-1 text-xl font-bold">
                      {result.score}/100
                    </div>
                  </div>
                )}
              </div>

              {risk && (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="font-semibold">
                    {risk.title}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {risk.description}
                  </p>
                </div>
              )}

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="font-semibold">
                  Porównanie może się opłacać
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Ceny ubezpieczenia tego samego samochodu mogą
                  różnić się między towarzystwami. Przed zakupem
                  warto sprawdzić kilka ofert.
                </p>

                <div className="mt-4 rounded-xl border border-dashed border-white/20 px-4 py-3 text-center text-sm font-semibold text-slate-400">
                  Miejsce na przyszły link afiliacyjny
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-xs leading-6 text-slate-400">
                  Wynik ma charakter wyłącznie orientacyjny i nie jest
                  ofertą ubezpieczenia. Rzeczywista składka zależy od
                  indywidualnej kalkulacji ubezpieczyciela.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-bold">
          Od czego zależy cena OC i AC?
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Na wysokość składki może wpływać zarówno profil kierowcy,
          jak i parametry samochodu. W kalkulacjach ubezpieczycieli
          znaczenie mogą mieć między innymi wiek kierowcy, jego
          doświadczenie, historia ubezpieczenia i miejsce zamieszkania,
          a także marka, model, pojemność oraz inne dane samochodu.
          W przypadku AC znaczenie ma również zakres ochrony i wartość
          pojazdu.
        </p>

        <h3 className="mt-8 text-xl font-bold">
          Dlaczego nasz wynik jest tylko orientacyjny?
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          Towarzystwa ubezpieczeniowe korzystają z własnych modeli
          oceny ryzyka i mogą brać pod uwagę znacznie więcej informacji
          niż te uwzględnione w tym narzędziu. Nawet dla podobnego
          profilu ceny kilku ubezpieczycieli mogą być różne.
        </p>

        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">
          <div>
            <h4 className="font-semibold">
              Czy ten kalkulator podaje prawdziwą cenę OC?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Nie. Pokazuje jedynie orientacyjny przedział na podstawie
              uproszczonego modelu. Ostateczna składka jest wyliczana
              przez konkretnego ubezpieczyciela.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              Dlaczego młody kierowca może zapłacić więcej?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Wiek i doświadczenie kierowcy są jednymi z czynników
              używanych przy ocenie ryzyka. Młodzi i niedoświadczeni
              kierowcy często otrzymują wyższe składki.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              Czy większy silnik wpływa na cenę OC?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak, pojemność silnika jest jednym z parametrów
              uwzględnianych przez ubezpieczycieli.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              Czy warto porównywać oferty?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Dla podobnych profili ceny różnych ubezpieczycieli
              mogą się istotnie różnić, dlatego porównanie ofert może
              pomóc znaleźć korzystniejszą polisę.
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}