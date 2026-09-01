import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-3 lg:px-8">

        <div>
          <div className="text-lg font-extrabold text-white">
            Policz<span className="text-blue-400">Dobrze</span>
          </div>

          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Proste i darmowe kalkulatory online do codziennych obliczeń.
          </p>
        </div>


        <div>
          <div className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Kategorie
          </div>

          <div className="mt-4 space-y-3 text-sm">

            <Link
              href="/motoryzacja"
              className="block hover:text-white"
            >
              Motoryzacja
            </Link>

            <Link
              href="/budowa-remont"
              className="block hover:text-white"
            >
              Budowa i remont
            </Link>

            <Link
              href="/#kalkulatory"
              className="block hover:text-white"
            >
              Wszystkie kalkulatory
            </Link>

          </div>
        </div>


        <div>
          <div className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Informacje
          </div>

          <div className="mt-4 space-y-3 text-sm">

            <Link
              href="/#jak-dziala"
              className="block hover:text-white"
            >
              Jak to działa?
            </Link>

            <span className="block text-slate-500">
              © {new Date().getFullYear()} PoliczDobrze.pl
            </span>

          </div>
        </div>

      </div>

    </footer>
  );
}