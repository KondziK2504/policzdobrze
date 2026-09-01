import Link from "next/link";
import { ReactNode } from "react";

type CalculatorLayoutProps = {
  icon: string;
  title: string;
  description: string;
  children: ReactNode;
};

export default function CalculatorLayout({
  icon,
  title,
  description,
  children,
}: CalculatorLayoutProps) {
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
            ← Wszystkie kalkulatory
          </Link>

        </div>
      </header>


      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 pb-14 pt-14 text-center">

          <div className="text-5xl">
            {icon}
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            {description}
          </p>

        </div>
      </section>


      <section className="px-6 py-12">
        {children}
      </section>


      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-500">

          © {new Date().getFullYear()} PoliczDobrze.pl

        </div>

      </footer>

    </main>
  );
}