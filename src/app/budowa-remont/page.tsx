import Link from "next/link";

export const metadata = {
  title: "Kalkulatory budowlane i remontowe",
  description:
    "Darmowe kalkulatory budowlane. Oblicz ilość betonu, kostki brukowej, farby, płytek i innych materiałów.",
};

const calculators = [
  {
    icon: "🏗️",
    title: "Kalkulator betonu",
    description:
      "Oblicz ilość betonu potrzebnego do wykonania płyty, fundamentu, posadzki lub innej konstrukcji.",
    href: "/budowa-remont/beton",
    active: true,
  },

  {
    icon: "🧱",
    title: "Kalkulator kostki brukowej",
    description:
      "Oblicz powierzchnię oraz ilość kostki potrzebnej na podjazd, chodnik lub taras.",
    href: "#",
    active: false,
  },

  {
    icon: "🎨",
    title: "Kalkulator farby",
    description:
      "Sprawdź, ile litrów farby potrzebujesz do pomalowania ścian i sufitów.",
    href: "#",
    active: false,
  },

  {
    icon: "🧱",
    title: "Kalkulator płytek",
    description:
      "Oblicz liczbę płytek potrzebnych do wykończenia podłogi lub ściany.",
    href: "#",
    active: false,
  },

  {
    icon: "🪨",
    title: "Kalkulator piasku i żwiru",
    description:
      "Oblicz orientacyjną ilość kruszywa potrzebnego do wykonania prac budowlanych.",
    href: "#",
    active: false,
  },
];

export default function BudowaRemontPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight"
          >
            POLICZ<span className="text-blue-600">DOBRZE</span>
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            ← Strona główna
          </Link>

        </div>

      </header>


      <section className="bg-white">

        <div className="mx-auto max-w-6xl px-6 pb-16 pt-16">

          <div className="max-w-3xl">

            <div className="text-5xl">
              🏗️
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Kalkulatory budowlane i remontowe
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Darmowe kalkulatory pomagające obliczyć ilość
              materiałów potrzebnych podczas budowy i remontu.
            </p>

          </div>

        </div>

      </section>


      <section className="mx-auto max-w-6xl px-6 py-14">

        <div className="grid gap-6 md:grid-cols-2">

          {calculators.map((calculator) => {

            if (!calculator.active) {

              return (
                <div
                  key={calculator.title}
                  className="rounded-3xl border border-slate-200 bg-white p-7 opacity-75"
                >

                  <div className="text-4xl">
                    {calculator.icon}
                  </div>

                  <h2 className="mt-5 text-xl font-bold">
                    {calculator.title}
                  </h2>

                  <p className="mt-3 leading-7 text-slate-600">
                    {calculator.description}
                  </p>

                  <div className="mt-6 text-sm font-medium text-slate-400">
                    Wkrótce
                  </div>

                </div>
              );

            }


            return (

              <Link
                key={calculator.title}
                href={calculator.href}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >

                <div className="text-4xl">
                  {calculator.icon}
                </div>

                <h2 className="mt-5 text-xl font-bold group-hover:text-blue-600">
                  {calculator.title}
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  {calculator.description}
                </p>

                <div className="mt-6 font-semibold text-blue-600">
                  Otwórz kalkulator →
                </div>

              </Link>

            );

          })}

        </div>

      </section>


      <section className="bg-white py-16">

        <div className="mx-auto max-w-4xl px-6">

          <h2 className="text-3xl font-bold">
            Kalkulatory materiałów budowlanych
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Podczas budowy i remontu bardzo łatwo kupić zbyt
            dużo lub zbyt mało materiału. Kalkulatory pomagają
            szybko oszacować potrzebne ilości na podstawie
            wymiarów powierzchni lub konstrukcji.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Wyniki mają charakter orientacyjny. Rzeczywiste
            zużycie może zależeć między innymi od rodzaju
            materiału, podłoża, sposobu wykonania oraz strat
            powstających podczas prac.
          </p>

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