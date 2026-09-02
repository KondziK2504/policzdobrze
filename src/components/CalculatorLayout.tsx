import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalculatorSchema from "@/components/CalculatorSchema";
import { ReactNode } from "react";

type RelatedCalculator = {
  title: string;
  href: string;
  icon: string;
};

type CalculatorLayoutProps = {
  icon: string;
  title: string;
  description: string;
  categoryName?: string;
  categoryHref?: string;
  related?: RelatedCalculator[];
  children: ReactNode;
};

export default function CalculatorLayout({
  icon,
  title,
  description,
  categoryName = "Kalkulatory",
  categoryHref = "/#kalkulatory",
  related = [],
  children,
}: CalculatorLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      <CalculatorSchema
        title={title}
        description={description}
        categoryName={categoryName}
        categoryHref={categoryHref}
      />

      <Header />

      {/* HERO */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-6 sm:pb-14 lg:px-8">

          <nav
            aria-label="Okruszki nawigacyjne"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500"
          >

            <Link
              href="/"
              className="transition hover:text-blue-600"
            >
              PoliczDobrze
            </Link>

            <span>/</span>

            <Link
              href={categoryHref}
              className="transition hover:text-blue-600"
            >
              {categoryName}
            </Link>

            <span>/</span>

            <span
              aria-current="page"
              className="text-slate-700"
            >
              {title}
            </span>

          </nav>


          <div className="mx-auto max-w-3xl text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-4xl shadow-sm ring-1 ring-blue-100">
              {icon}
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {title}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {description}
            </p>

          </div>

        </div>

      </section>


      {/* CALCULATOR */}

      <section className="px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        {children}
      </section>


      {/* RELATED */}

      {related.length > 0 && (

        <section className="border-t border-slate-200 bg-white py-14">

          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

            <h2 className="text-2xl font-extrabold text-slate-950">
              Przydatne kalkulatory
            </h2>

            <p className="mt-2 text-slate-500">
              Sprawdź również inne narzędzia związane z tym tematem.
            </p>


            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {related.map((calculator, index) => {

                const isInternalLink =
                  calculator.href.startsWith("/") &&
                  calculator.href !== "#";

                if (!isInternalLink) {
                  return (
                    <div
                      key={`${calculator.title}-${calculator.href}-${index}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 opacity-60"
                    >

                      <div className="text-3xl">
                        {calculator.icon}
                      </div>

                      <div className="mt-4 font-bold text-slate-900">
                        {calculator.title}
                      </div>

                      <div className="mt-3 text-sm font-semibold text-slate-400">
                        Wkrótce
                      </div>

                    </div>
                  );
                }

                return (
                  <Link
                    key={`${calculator.title}-${calculator.href}-${index}`}
                    href={calculator.href}
                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg"
                  >

                    <div className="text-3xl">
                      {calculator.icon}
                    </div>

                    <div className="mt-4 font-bold text-slate-900 group-hover:text-blue-600">
                      {calculator.title}
                    </div>

                    <div className="mt-3 text-sm font-semibold text-blue-600">
                      Otwórz kalkulator →
                    </div>

                  </Link>
                );

              })}

            </div>

          </div>

        </section>

      )}

      <Footer />

    </main>
  );
}