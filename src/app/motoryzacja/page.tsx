export const metadata = {
  title: "Kalkulatory motoryzacyjne",
  description:
    "Darmowe kalkulatory motoryzacyjne. Oblicz spalanie, koszt paliwa, koszt przejazdu oraz koszt sprowadzenia samochodu.",
};

const calculators = [
  {
    icon: "🚗",
    title: "Kalkulator kosztu przejazdu",
    description:
      "Sprawdź, ile będzie kosztować przejazd samochodem na wybranej trasie.",
    href: "/motoryzacja/koszt-przejazdu",
  },

  {
    icon: "⛽",
    title: "Kalkulator spalania",
    description:
      "Oblicz średnie spalanie samochodu na podstawie przejechanej trasy i zużytego paliwa.",
    href: "/motoryzacja/spalanie",
  },

  {
    icon: "💰",
    title: "Kalkulator kosztu paliwa",
    description:
      "Oblicz koszt paliwa dla dowolnej trasy, spalania i aktualnej ceny paliwa.",
    href: "/motoryzacja/koszt-paliwa",
  },

  {
    icon: "🚘",
    title: "Kalkulator sprowadzenia auta",
    description:
      "Oszacuj orientacyjny koszt sprowadzenia samochodu z zagranicy.",
    href: "/motoryzacja/sprowadzenie-auta",
  },
];

export default function MotoryzacjaPage() {
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
            ← Strona główna
          </a>

        </div>

      </header>


      <section className="bg-white">

        <div className="mx-auto max-w-6xl px-6 pb-16 pt-16">

          <div className="max-w-3xl">

            <div className="text-5xl">
              🚗
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Kalkulatory motoryzacyjne
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Darmowe narzędzia dla kierowców. Oblicz koszty
              podróży, spalanie samochodu, koszt paliwa lub
              sprawdź orientacyjny koszt sprowadzenia auta.
            </p>

          </div>

        </div>

      </section>


      <section className="mx-auto max-w-6xl px-6 py-14">

        <div className="grid gap-6 md:grid-cols-2">

          {calculators.map((calculator) => (

            <a
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

            </a>

          ))}

        </div>

      </section>


      <section className="bg-white py-16">

        <div className="mx-auto max-w-4xl px-6">

          <h2 className="text-3xl font-bold">
            Kalkulatory dla kierowców
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Koszt paliwa jest jednym z podstawowych wydatków
            związanych z samochodem. Znając dystans, średnie
            spalanie oraz cenę paliwa, można szybko obliczyć
            orientacyjny koszt podróży.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Na PoliczDobrze.pl znajdziesz również narzędzia
            pozwalające obliczyć średnie spalanie samochodu
            oraz oszacować koszt sprowadzenia auta z zagranicy.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Wszystkie kalkulatory są dostępne bez rejestracji
            i można z nich korzystać bezpłatnie.
          </p>

        </div>

      </section>


      <section className="px-6 py-16">

        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold">
            Najczęściej zadawane pytania
          </h2>


          <div className="mt-8 space-y-7">

            <div>

              <h3 className="font-bold">
                Jak obliczyć koszt przejazdu samochodem?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Wystarczy znać dystans, średnie spalanie
                samochodu oraz cenę paliwa. Na tej podstawie
                można obliczyć ilość potrzebnego paliwa i jego koszt.
              </p>

            </div>


            <div>

              <h3 className="font-bold">
                Jak obliczyć spalanie samochodu?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Najprościej podzielić ilość zużytego paliwa przez
                przejechany dystans i pomnożyć wynik przez 100.
              </p>

            </div>


            <div>

              <h3 className="font-bold">
                Czy kalkulatory są darmowe?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Tak. Korzystanie z kalkulatorów PoliczDobrze.pl
                nie wymaga rejestracji.
              </p>

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