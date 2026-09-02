import type { Metadata } from "next";
import Link from "next/link";
import { calculators } from "@/data/calculators";

const siteUrl = "https://policzdobrze.pl";

export const metadata: Metadata = {
  title: "Kalkulatory budowlane i remontowe – beton, płytki, farba",
  description:
    "Darmowe kalkulatory budowlane i remontowe. Oblicz ilość betonu, cementu, farby, płytek, kostki brukowej, piasku i żwiru.",

  alternates: {
    canonical: `${siteUrl}/budowa-remont`,
  },

  openGraph: {
    title: "Kalkulatory budowlane i remontowe – beton, płytki, farba",
    description:
      "Darmowe kalkulatory do obliczania ilości betonu, cementu, farby, płytek, kostki brukowej, piasku i żwiru.",
    url: `${siteUrl}/budowa-remont`,
    siteName: "PoliczDobrze.pl",
    locale: "pl_PL",
    type: "website",
  },
};

export default function BudowaRemontPage() {
  const categoryCalculators = calculators.filter(
    (calculator) => calculator.category === "Budowa i remont",
  );

  const activeCalculators = categoryCalculators.filter(
    (calculator) => calculator.status === "active",
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}

      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-lg font-black text-white">
              P
            </span>

            <span className="text-xl font-extrabold tracking-tight">
              Policz<span className="text-blue-600">Dobrze</span>
            </span>

          </Link>


          <Link
            href="/"
            className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
          >
            ← Strona główna
          </Link>

        </div>

      </header>


      {/* BREADCRUMBS */}

      <nav
        aria-label="Okruszki nawigacyjne"
        className="mx-auto max-w-7xl px-5 pt-6 sm:px-6 lg:px-8"
      >

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">

          <Link
            href="/"
            className="transition hover:text-blue-600"
          >
            PoliczDobrze
          </Link>

          <span>/</span>

          <span className="font-medium text-slate-900">
            Budowa i remont
          </span>

        </div>

      </nav>


      {/* HERO */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-6 lg:px-8">

          <div className="max-w-4xl">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-4xl">
              🏗️
            </div>

            <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">
              Kalkulatory budowlane i remontowe
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Oblicz ilość materiałów potrzebnych podczas budowy,
              remontu i prac wykończeniowych. Sprawdź potrzebną ilość
              betonu, cementu, farby, płytek, kostki brukowej, piasku
              i żwiru.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <a
                href="#kalkulatory"
                className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
              >
                Zobacz kalkulatory
              </a>

              <Link
                href="/budowa-remont/beton"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
              >
                Kalkulator betonu →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* CALCULATORS */}

      <section
        id="kalkulatory"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8"
      >

        <div className="mb-8">

          <div className="text-sm font-bold uppercase tracking-wider text-blue-600">
            {activeCalculators.length} dostępnych narzędzi
          </div>

          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            Wybierz kalkulator
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Wybierz materiał lub rodzaj prac, które chcesz
            oszacować. Wynik otrzymasz od razu po wpisaniu
            potrzebnych danych.
          </p>

        </div>


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {categoryCalculators.map((calculator) => {

            const active =
              calculator.status === "active";

            if (!active) {
              return (
                <div
                  key={calculator.name}
                  className="rounded-3xl border border-slate-200 bg-white p-7 opacity-70"
                >

                  <div className="text-4xl">
                    {calculator.icon}
                  </div>

                  <h3 className="mt-5 text-xl font-black">
                    {calculator.name}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {calculator.description}
                  </p>

                  <div className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Wkrótce
                  </div>

                </div>
              );
            }

            return (
              <Link
                key={calculator.name}
                href={calculator.href}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >

                <div className="text-4xl">
                  {calculator.icon}
                </div>

                <h3 className="mt-5 text-xl font-black group-hover:text-blue-600">
                  {calculator.name}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {calculator.description}
                </p>

                <div className="mt-6 font-bold text-blue-600">
                  Otwórz kalkulator →
                </div>

              </Link>
            );

          })}

        </div>

      </section>


      {/* BETON */}

      <section className="bg-white py-16">

        <div className="mx-auto max-w-4xl px-5 sm:px-6">

          <h2 className="text-3xl font-black">
            Kalkulator betonu
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Przy planowaniu fundamentu, płyty, posadzki lub innego
            elementu betonowego ważne jest określenie jego objętości.
            Kalkulator betonu pozwala szybko obliczyć potrzebną ilość
            mieszanki na podstawie wymiarów.
          </p>

          <Link
            href="/budowa-remont/beton"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Oblicz ilość betonu →
          </Link>

        </div>

      </section>


      {/* KOSTKA */}

      <section className="border-y border-slate-200 bg-slate-50 py-16">

        <div className="mx-auto max-w-4xl px-5 sm:px-6">

          <h2 className="text-3xl font-black">
            Kalkulator kostki brukowej
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Przy zakupie kostki brukowej warto uwzględnić całą
            powierzchnię podjazdu, chodnika lub tarasu oraz dodatkowy
            zapas. Kalkulator pomaga oszacować potrzebną powierzchnię
            i ilość materiału.
          </p>

          <Link
            href="/budowa-remont/kostka-brukowa"
            className="mt-5 inline-flex rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
          >
            Oblicz kostkę brukową →
          </Link>

        </div>

      </section>


      {/* FARBA I PŁYTKI */}

      <section className="bg-white py-16">

        <div className="mx-auto max-w-4xl px-5 sm:px-6">

          <h2 className="text-3xl font-black">
            Farba, płytki i materiały wykończeniowe
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Przy remoncie istotne jest właściwe oszacowanie ilości
            materiału. Zbyt mały zakup może oznaczać dodatkową wizytę
            w sklepie, a zbyt duży — niepotrzebny koszt. Kalkulatory
            pomagają określić orientacyjną ilość farby i płytek
            potrzebnych do wykonania prac.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <Link
              href="/budowa-remont/farba"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Kalkulator farby
            </Link>

            <Link
              href="/budowa-remont/plytki"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Kalkulator płytek
            </Link>

          </div>

        </div>

      </section>


      {/* KRUSZYWA */}

      <section className="border-y border-slate-200 bg-slate-50 py-16">

        <div className="mx-auto max-w-4xl px-5 sm:px-6">

          <h2 className="text-3xl font-black">
            Piasek, żwir i cement
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Przy pracach budowlanych często trzeba przeliczyć objętość
            materiału na przybliżoną masę albo liczbę worków. Dotyczy
            to między innymi piasku, żwiru, kruszyw i cementu.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <Link
              href="/budowa-remont/piasek-i-zwir"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Kalkulator piasku i żwiru
            </Link>

            <Link
              href="/budowa-remont/cement"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Kalkulator cementu
            </Link>

          </div>

        </div>

      </section>


      {/* CONTENT */}

      <section className="bg-white py-16">

        <div className="mx-auto max-w-4xl px-5 sm:px-6">

          <h2 className="text-3xl font-black">
            Jak obliczać ilość materiałów budowlanych?
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Podstawą wielu obliczeń budowlanych są wymiary powierzchni
            lub objętości. W zależności od materiału wynik może być
            później przeliczany na litry, kilogramy, tony, metry
            kwadratowe, metry sześcienne albo liczbę sztuk.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Warto również pamiętać o zapasie materiału. Rzeczywiste
            zużycie może różnić się od wyniku kalkulatora ze względu
            na sposób wykonania, nierówności podłoża, straty podczas
            cięcia lub mieszania oraz właściwości konkretnego produktu.
          </p>

        </div>

      </section>


      {/* FAQ */}

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6">

        <h2 className="text-3xl font-black">
          FAQ – kalkulatory budowlane i remontowe
        </h2>

        <div className="mt-8 space-y-7">

          <div>

            <h3 className="text-lg font-bold">
              Czy kalkulatory są darmowe?
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Wszystkie dostępne kalkulatory na PoliczDobrze
              można używać bez rejestracji.
            </p>

          </div>


          <div>

            <h3 className="text-lg font-bold">
              Czy wynik jest dokładną ilością materiału?
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              Wynik ma charakter orientacyjny. Rzeczywiste zużycie
              zależy między innymi od rodzaju materiału, wykonania
              oraz strat podczas prac.
            </p>

          </div>


          <div>

            <h3 className="text-lg font-bold">
              Czy mogę korzystać z kalkulatorów na telefonie?
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Strona jest przystosowana również do urządzeń
              mobilnych.
            </p>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-8 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} PoliczDobrze.pl
        </div>

      </footer>

    </main>
  );
}