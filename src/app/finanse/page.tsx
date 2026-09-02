import Link from "next/link";
import { calculators } from "@/data/calculators";

export const metadata = {
  title: "Kalkulatory finansowe – VAT, leasing, wynagrodzenie",
  description:
    "Darmowe kalkulatory finansowe. Oblicz VAT netto i brutto, ratę leasingu samochodu oraz wynagrodzenie brutto i netto.",
};

export default function FinansePage() {
  const categoryCalculators = calculators.filter(
    (calculator) => calculator.category === "Finanse",
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
            Finanse
          </span>

        </div>

      </nav>


      {/* HERO */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-6 lg:px-8">

          <div className="max-w-4xl">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-4xl">
              💰
            </div>


            <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">
              Kalkulatory finansowe
            </h1>


            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Oblicz VAT, ratę leasingu samochodu oraz wynagrodzenie
              netto na podstawie kwoty brutto. Wszystkie kalkulatory
              działają bez rejestracji i są dostępne bezpłatnie.
            </p>


            <div className="mt-7 flex flex-wrap gap-3">

              <a
                href="#kalkulatory"
                className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
              >
                Zobacz kalkulatory
              </a>

              <Link
                href="/finanse/vat"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
              >
                Kalkulator VAT →
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
            {activeCalculators.length} dostępne narzędzia
          </div>

          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            Wybierz kalkulator
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Wybierz narzędzie odpowiadające temu, co chcesz
            policzyć. Wynik otrzymasz od razu po wpisaniu danych.
          </p>

        </div>


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {categoryCalculators.map((calculator) => {

            const active =
              calculator.status === "active" &&
              calculator.href.startsWith("/");

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


      {/* VAT */}

      <section className="bg-white py-16">

        <div className="mx-auto max-w-4xl px-5 sm:px-6">

          <h2 className="text-3xl font-black">
            Kalkulator VAT – netto, brutto i podatek VAT
          </h2>


          <p className="mt-5 leading-8 text-slate-600">
            Kalkulator VAT pozwala szybko przeliczyć kwotę netto,
            wysokość podatku oraz wartość brutto. Możesz rozpocząć
            od kwoty netto lub brutto i wybrać odpowiednią stawkę VAT.
          </p>


          <Link
            href="/finanse/vat"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Oblicz VAT →
          </Link>

        </div>

      </section>


      {/* LEASING */}

      <section className="border-y border-slate-200 bg-slate-50 py-16">

        <div className="mx-auto max-w-4xl px-5 sm:px-6">

          <h2 className="text-3xl font-black">
            Kalkulator leasingu samochodu
          </h2>


          <p className="mt-5 leading-8 text-slate-600">
            Przy planowaniu leasingu warto uwzględnić nie tylko
            miesięczną ratę. Znaczenie mają również wpłata własna,
            okres finansowania, wartość wykupu i całkowity koszt
            finansowania samochodu.
          </p>


          <p className="mt-5 leading-8 text-slate-600">
            Nasz kalkulator pozwala szybko wykonać orientacyjną
            symulację i porównać różne warianty parametrów.
          </p>


          <Link
            href="/finanse/leasing"
            className="mt-5 inline-flex rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
          >
            Oblicz ratę leasingu →
          </Link>

        </div>

      </section>


      {/* WYNAGRODZENIE */}

      <section className="bg-white py-16">

        <div className="mx-auto max-w-4xl px-5 sm:px-6">

          <h2 className="text-3xl font-black">
            Wynagrodzenie brutto i netto
          </h2>


          <p className="mt-5 leading-8 text-slate-600">
            Wynagrodzenie brutto nie jest kwotą, którą pracownik
            otrzymuje na konto. Z pensji brutto potrącane są między
            innymi składki na ubezpieczenia społeczne, składka
            zdrowotna oraz zaliczka na podatek dochodowy.
          </p>


          <p className="mt-5 leading-8 text-slate-600">
            Kalkulator wynagrodzenia pozwala oszacować wypłatę netto
            na podstawie kwoty brutto i wybranych ustawień podatkowych.
          </p>


          <Link
            href="/finanse/wynagrodzenie"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Oblicz wynagrodzenie netto →
          </Link>

        </div>

      </section>


      {/* JAK KORZYSTAĆ */}

      <section className="border-y border-slate-200 bg-slate-50 py-16">

        <div className="mx-auto max-w-4xl px-5 sm:px-6">

          <h2 className="text-3xl font-black">
            Jak korzystać z kalkulatorów finansowych?
          </h2>


          <div className="mt-8 grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <div className="text-sm font-black text-blue-600">
                01
              </div>

              <h3 className="mt-3 text-lg font-bold">
                Wybierz narzędzie
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Wybierz kalkulator odpowiadający Twojemu
                problemowi.
              </p>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <div className="text-sm font-black text-blue-600">
                02
              </div>

              <h3 className="mt-3 text-lg font-bold">
                Wpisz dane
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Podaj wartości wymagane przez wybrane narzędzie.
              </p>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <div className="text-sm font-black text-blue-600">
                03
              </div>

              <h3 className="mt-3 text-lg font-bold">
                Sprawdź wynik
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Wynik otrzymasz od razu bez konieczności
                zakładania konta.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* FAQ */}

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6">

        <h2 className="text-3xl font-black">
          FAQ – kalkulatory finansowe
        </h2>


        <div className="mt-8 space-y-7">

          <div>

            <h3 className="text-lg font-bold">
              Czy kalkulatory finansowe są darmowe?
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Korzystanie z kalkulatorów PoliczDobrze nie
              wymaga rejestracji.
            </p>

          </div>


          <div>

            <h3 className="text-lg font-bold">
              Czy wynik kalkulatora jest ofertą finansową?
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              Nie. Kalkulatory mogą przedstawiać symulację lub
              wynik obliczenia na podstawie podanych danych.
              Rzeczywiste warunki mogą zależeć od indywidualnej
              sytuacji oraz oferty konkretnej firmy.
            </p>

          </div>


          <div>

            <h3 className="text-lg font-bold">
              Czy mogę korzystać z kalkulatorów na telefonie?
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Strona została przygotowana z myślą o komputerach,
              tabletach i urządzeniach mobilnych.
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