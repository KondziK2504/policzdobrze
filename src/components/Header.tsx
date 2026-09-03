import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">

        <Link
          href="/"
          className="flex items-center gap-3"
        >

          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-lg font-black text-white shadow-sm">
            P
          </span>

          <span className="text-lg font-extrabold tracking-tight text-slate-950">
            Policz<span className="text-blue-600">Dobrze</span>
          </span>

        </Link>


        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">

          <Link
            href="/"
            className="transition hover:text-blue-600"
          >
            Start
          </Link>

          <Link
            href="/motoryzacja"
            className="transition hover:text-blue-600"
          >
            Motoryzacja
          </Link>

          <Link
            href="/budowa-remont"
            className="transition hover:text-blue-600"
          >
            Budowa i remont
          </Link>

          <Link
            href="/finanse"
            className="transition hover:text-blue-600"
          >
            Finanse
          </Link>

        </nav>


        <Link
          href="/#kalkulatory"
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
        >
          Kalkulatory
        </Link>

      </div>
    </header>
  );
}