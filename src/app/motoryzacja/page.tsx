import Link from "next/link";
import { calculators } from "@/data/calculators";

export const metadata = {
  title: "Kalkulatory motoryzacyjne – spalanie, paliwo, opony",
  description:
    "Darmowe kalkulatory motoryzacyjne. Oblicz spalanie samochodu, koszt paliwa i przejazdu, porównaj rozmiary opon oraz sprawdź koszt sprowadzenia auta.",
};

export default function MotoryzacjaPage() {
  const categoryCalculators = calculators.filter(
    (calculator) =>
      calculator.category === "Motoryzacja",
  );

  const activeCalculators =
    categoryCalculators.filter(
      (calculator) =>
        calculator.status === "active",
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


          <div className="flex items-center gap-2">

            <Link
              href="/"
              className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
            >
              ← Strona główna
            </Link>

          </div>

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
            Motoryzacja
          </span>

        </div>

      </nav>


      {/* HERO */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-6 lg:px-8">

          <div className="max-w-4xl">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-4xl">
              🚗
            </div>


            <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">
              Kalkulatory motoryzacyjne
            </h1>


            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Sprawdź spalanie samochodu, koszt paliwa i przejazdu,
              porównaj rozmiary opon oraz oszacuj koszt sprowadzenia auta.
              Wszystkie kalkulatory działają bez rejestracji.
            </p>


            <div className="mt-7 flex flex-wrap gap-3">

              <a
                href="#kalkulatory"
                className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
              >
                Zobacz kalkulatory
              </a>

              <Link
                href="/motoryzacja/opony"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
              >
                Kalkulator opon →
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
            Wybierz narzędzie odpowiadające temu, co chcesz
            policzyć. Wynik otrzymasz od razu po wpisaniu danych.
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


      {/* CONTENT */}

      <section className="bg-white py-16">

        <div className="mx-auto max-w-4xl px-5 sm:px-6">

          <h2 className="text-3xl font-black">
            Kalkulatory samochodowe w jednym miejscu
          </h2>


          <p className="mt-5 leading-8 text-slate-600">
            Koszty związane z samochodem można łatwo policzyć,
            jeżeli znamy podstawowe dane dotyczące spalania,
            dystansu, ceny paliwa lub rozmiaru opon.
            PoliczDobrze zbiera najczęściej potrzebne obliczenia
            w jednym miejscu.
          </p>


          <h3 className="mt-9 text-2xl font-bold">
            Koszt paliwa i przejazdu
          </h3>


          <p className="mt-4 leading-8 text-slate-600">
            Kalkulatory paliwa pozwalają sprawdzić, ile paliwa
            potrzebujesz na konkretną trasę i ile będzie kosztowała
            podróż. Możesz wykorzystać je zarówno przy krótkich
            przejazdach, jak i planowaniu dłuższych tras.
          </p>


          <div className="mt-5 flex flex-wrap gap-3">

            <Link
              href="/motoryzacja/koszt-paliwa"
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Kalkulator kosztu paliwa
            </Link>

            <Link
              href="/motoryzacja/koszt-przejazdu"
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Kalkulator kosztu przejazdu
            </Link>

            <Link
              href="/motoryzacja/spalanie"
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Kalkulator spalania
            </Link>

          </div>


          <h3 className="mt-10 text-2xl font-bold">
            Rozmiar i zamienniki opon
          </h3>


          <p className="mt-4 leading-8 text-slate-600">
            Przy zmianie rozmiaru opon warto sprawdzić nie tylko
            szerokość, ale również średnicę całego koła i jego obwód.
            Kalkulator opon pozwala szybko porównać dwa rozmiary
            i sprawdzić matematyczny wpływ zmiany na prędkościomierz.
          </p>


          <Link
            href="/motoryzacja/opony"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Sprawdź kalkulator opon →
          </Link>


          <h3 className="mt-10 text-2xl font-bold">
            Sprowadzanie samochodu
          </h3>


          <p className="mt-4 leading-8 text-slate-600">
            Przy imporcie samochodu końcowy koszt zakupu może być
            wyższy od samej ceny auta. Warto uwzględnić między innymi
            transport, akcyzę i inne koszty związane ze sprowadzeniem.
          </p>


          <Link
            href="/motoryzacja/sprowadzenie-auta"
            className="mt-5 inline-flex rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
          >
            Oblicz koszt sprowadzenia auta →
          </Link>

        </div>

      </section>


      {/* FAQ */}

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6">

        <h2 className="text-3xl font-black">
          FAQ – kalkulatory motoryzacyjne
        </h2>


        <div className="mt-8 space-y-7">

          <div>

            <h3 className="text-lg font-bold">
              Czy kalkulatory są darmowe?
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Korzystanie z kalkulatorów PoliczDobrze nie
              wymaga zakładania konta ani rejestracji.
            </p>

          </div>


          <div>

            <h3 className="text-lg font-bold">
              Czy wynik kalkulatora jest dokładny?
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              Kalkulatory wykonują obliczenia na podstawie danych
              wprowadzonych przez użytkownika. W przypadku narzędzi
              dotyczących kosztów samochodu wynik może być orientacyjny,
              szczególnie gdy rzeczywiste koszty zależą od dodatkowych
              czynników.
            </p>

          </div>


          <div>

            <h3 className="text-lg font-bold">
              Czy mogę korzystać z kalkulatorów na telefonie?
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Strona została przygotowana również z myślą
              o urządzeniach mobilnych.
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