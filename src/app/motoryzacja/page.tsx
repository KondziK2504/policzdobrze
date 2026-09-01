import Link from "next/link";

export const metadata = {
  title: "Kalkulatory motoryzacyjne",
  description:
    "Darmowe kalkulatory motoryzacyjne. Oblicz spalanie samochodu, koszt paliwa, koszt przejazdu i koszt sprowadzenia auta.",
};

const calculators = [
  {
    icon: "🚗",
    title: "Kalkulator kosztu przejazdu",
    description:
      "Oblicz koszt paliwa podczas podróży, koszt 100 km oraz koszt przypadający na jedną osobę.",
    href: "/motoryzacja/koszt-przejazdu",
  },

  {
    icon: "⛽",
    title: "Kalkulator spalania",
    description:
      "Sprawdź rzeczywiste spalanie samochodu w l/100 km oraz koszt przejechania 100 km.",
    href: "/motoryzacja/spalanie",
  },

  {
    icon: "💰",
    title: "Kalkulator kosztu paliwa",
    description:
      "Sprawdź, ile paliwa potrzebujesz i ile kosztuje przejazd wybranej trasy.",
    href: "/motoryzacja/koszt-paliwa",
  },

  {
    icon: "🚘",
    title: "Kalkulator sprowadzenia auta",
    description:
      "Oszacuj orientacyjny koszt importu samochodu z zagranicy.",
    href: "/motoryzacja/sprowadzenie-auta",
  },
];

export default function MotoryzacjaPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight"
          >
            POLICZ<span className="text-blue-600">DOBRZE</span>
          </Link>

          <Link
            href="/"
            className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-blue-600"
          >
            ← Strona główna
          </Link>

        </div>

      </header>


      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-6xl px-6 pb-16 pt-14">

          <div className="max-w-3xl">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-4xl">
              🚗
            </div>

            <h1 className="mt-7 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Kalkulatory motoryzacyjne
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Darmowe narzędzia dla kierowców. Oblicz spalanie,
              koszt paliwa, koszt przejazdu albo orientacyjny
              koszt sprowadzenia samochodu.
            </p>

          </div>

        </div>

      </section>


      <section className="mx-auto max-w-6xl px-6 py-14">

        <div className="grid gap-6 md:grid-cols-2">

          {calculators.map((calculator) => (

            <Link
              key={calculator.href}
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

          ))}

        </div>

      </section>


      <section className="bg-white py-16">

        <div className="mx-auto max-w-4xl px-6">

          <h2 className="text-3xl font-bold">
            Kalkulatory dla kierowców
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Kalkulatory motoryzacyjne pomagają szybko sprawdzić
            koszty codziennej jazdy oraz planowania podróży.
            Możesz obliczyć między innymi średnie spalanie,
            koszt paliwa i całkowity koszt przejazdu.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            W przyszłości kategoria zostanie rozszerzona
            o kolejne narzędzia związane z kosztami samochodu,
            importem oraz eksploatacją.
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