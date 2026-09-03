import Link from "next/link";
import { calculators } from "@/data/calculators";

export const metadata = {
  title: "Kalkulatory finansowe",
  description:
    "Darmowe kalkulatory finansowe. Oblicz VAT, brutto i netto, marżę, narzut, procenty oraz ratę kredytu.",
};

export default function FinansePage() {
  const categoryCalculators = calculators.filter(
    (calculator) => calculator.category === "Finanse",
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

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
            className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-blue-600"
          >
            ← Strona główna
          </Link>

        </div>

      </header>


      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-4xl">
              💰
            </div>

            <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">
              Kalkulatory finansowe
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Proste narzędzia do obliczania VAT, marży, narzutu,
              procentów, cen netto i brutto oraz rat kredytu.
            </p>

          </div>

        </div>

      </section>


      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {categoryCalculators.map((calculator) => {

            const active = calculator.status === "active";

            if (!active) {
              return (
                <div
                  key={calculator.name}
                  className="rounded-3xl border border-slate-200 bg-white p-7 opacity-70"
                >

                  <div className="text-4xl">
                    {calculator.icon}
                  </div>

                  <h2 className="mt-5 text-xl font-black">
                    {calculator.name}
                  </h2>

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

                <h2 className="mt-5 text-xl font-black group-hover:text-blue-600">
                  {calculator.name}
                </h2>

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


      <section className="bg-white py-16">

        <div className="mx-auto max-w-4xl px-5 sm:px-6">

          <h2 className="text-3xl font-black">
            Kalkulatory finansowe online
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Kalkulatory finansowe pozwalają szybko wykonać
            podstawowe obliczenia związane z cenami, podatkami,
            sprzedażą i kredytami.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Wyniki kalkulatorów mają charakter pomocniczy.
            W przypadku rozliczeń podatkowych lub decyzji
            finansowych warto sprawdzić aktualne przepisy,
            warunki umowy albo skonsultować konkretny przypadek
            z odpowiednim specjalistą.
          </p>

        </div>

      </section>


      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-8 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} PoliczDobrze.pl
        </div>

      </footer>

    </main>
  );
}