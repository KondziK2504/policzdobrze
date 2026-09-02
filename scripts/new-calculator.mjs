import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const ROOT = process.cwd();

const CALCULATORS_FILE = path.join(
  ROOT,
  "src",
  "data",
  "calculators.ts",
);

const APP_DIR = path.join(
  ROOT,
  "src",
  "app",
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/ą/g, "a")
    .replace(/ć/g, "c")
    .replace(/ę/g, "e")
    .replace(/ł/g, "l")
    .replace(/ń/g, "n")
    .replace(/ó/g, "o")
    .replace(/ś/g, "s")
    .replace(/ź/g, "z")
    .replace(/ż/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeTsString(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}

function normalizeCategory(value) {
  const normalized = value
    .toLowerCase()
    .trim();

  const knownCategories = {
    motoryzacja: {
      name: "Motoryzacja",
      path: "motoryzacja",
    },

    "budowa i remont": {
      name: "Budowa i remont",
      path: "budowa-remont",
    },

    budowa: {
      name: "Budowa i remont",
      path: "budowa-remont",
    },

    finanse: {
      name: "Finanse",
      path: "finanse",
    },

    dom: {
      name: "Dom",
      path: "dom",
    },
  };

  return (
    knownCategories[normalized] ?? {
      name: value,
      path: slugify(value),
    }
  );
}

function toComponentName(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map(
      (part) =>
        part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join("");
}

function buildLayout({
  title,
  description,
  keywords,
  siteUrl,
  route,
}) {
  return `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "${escapeTsString(title)}",
  description:
    "${escapeTsString(description)}",
  keywords: [
${keywords
  .map(
    (keyword) =>
      `    "${escapeTsString(keyword)}",`,
  )
  .join("\n")}
  ],
  alternates: {
    canonical: "${escapeTsString(siteUrl + route)}",
  },
  openGraph: {
    title: "${escapeTsString(title)}",
    description:
      "${escapeTsString(description)}",
    url: "${escapeTsString(siteUrl + route)}",
    siteName: "PoliczDobrze.pl",
    locale: "pl_PL",
    type: "website",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
`;
}

function buildPage({
  icon,
  title,
  description,
  categoryName,
  categoryPath,
  slug,
}) {
  const componentName = toComponentName(slug);

  return `"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorTracker from "@/components/CalculatorTracker";

export default function ${componentName}Page() {
  const [calculated, setCalculated] = useState(false);

  function handleCalculate() {
    setCalculated(true);
  }

  function handleReset() {
    setCalculated(false);
  }

  return (
    <CalculatorLayout
      icon="${escapeTsString(icon)}"
      title="${escapeTsString(title)}"
      description="${escapeTsString(description)}"
      categoryName="${escapeTsString(categoryName)}"
      categoryHref="/${escapeTsString(categoryPath)}"
      related={[]}
    >
      <CalculatorTracker
        calculator="${escapeTsString(slug)}"
        isCalculated={calculated}
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">

        {/* =========================
            FORMULARZ
        ========================== */}

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Dane
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            ${escapeTsString(description)}
          </p>


          <div className="mt-7 space-y-5">

            {/* TODO:
                Tutaj dodaj pola kalkulatora.
            */}

            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm leading-6 text-slate-500">
              Dodaj tutaj pola potrzebne do wykonania obliczenia.
            </div>

          </div>


          <div className="mt-7 grid gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={handleCalculate}
              className="rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Oblicz
            </button>


            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Wyczyść
            </button>

          </div>

        </div>


        {/* =========================
            WYNIK
        ========================== */}

        <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">

          <h2 className="text-xl font-bold">
            Wynik
          </h2>


          {!calculated ? (

            <div className="flex min-h-[420px] items-center justify-center text-center">

              <div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  ${escapeTsString(icon)}
                </div>

                <p className="mt-5 text-slate-300">
                  Wprowadź dane i kliknij „Oblicz”.
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-7">

              {/* TODO:
                  Podmień ten blok na właściwy wynik.
              */}

              <div className="rounded-2xl bg-white/10 p-6">

                <div className="text-sm text-slate-300">
                  Wynik
                </div>

                <div className="mt-2 text-4xl font-extrabold">
                  0
                </div>

              </div>

            </div>

          )}

        </div>

      </div>


      {/* =========================
          TREŚĆ SEO
      ========================== */}

      <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-2xl font-bold">
          ${escapeTsString(title)}
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          ${escapeTsString(description)}
        </p>


        <h3 className="mt-8 text-xl font-bold">
          Jak działa kalkulator?
        </h3>

        <p className="mt-3 leading-8 text-slate-600">
          W tej sekcji dodaj szczegółowe wyjaśnienie sposobu
          obliczania wyniku. Opisz dane wejściowe, wzór,
          sposób zaokrąglania oraz interpretację rezultatu.
        </p>


        <h3 className="mt-8 text-xl font-bold">
          Przykład obliczenia
        </h3>

        <div className="mt-4 rounded-2xl bg-slate-50 p-5">

          <p className="leading-7 text-slate-600">
            Dodaj tutaj konkretny przykład użycia kalkulatora.
          </p>

        </div>


        <h3 className="mt-8 text-xl font-bold">
          FAQ
        </h3>

        <div className="mt-5 space-y-5">

          <div>

            <h4 className="font-semibold">
              Jak korzystać z kalkulatora?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Wprowadź wymagane dane i kliknij przycisk „Oblicz”.
            </p>

          </div>


          <div>

            <h4 className="font-semibold">
              Czy kalkulator jest darmowy?
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              Tak. Korzystanie z kalkulatora na PoliczDobrze.pl
              nie wymaga rejestracji.
            </p>

          </div>

        </div>

      </div>

    </CalculatorLayout>
  );
}
`;
}

function addToCalculators({
  icon,
  title,
  description,
  categoryName,
  slug,
  route,
  keywords,
}) {
  if (!fs.existsSync(CALCULATORS_FILE)) {
    throw new Error(
      `Nie znaleziono pliku: ${CALCULATORS_FILE}`,
    );
  }

  const current = fs.readFileSync(
    CALCULATORS_FILE,
    "utf8",
  );

  if (
    current.includes(`href: "${route}"`)
  ) {
    throw new Error(
      `Kalkulator z adresem "${route}" już istnieje w calculators.ts.`,
    );
  }

  const keywordString = keywords.join(" ");

  const newEntry = `

  {
    icon: "${escapeTsString(icon)}",
    name: "${escapeTsString(title)}",
    description:
      "${escapeTsString(description)}",
    category: "${escapeTsString(categoryName)}",
    keywords:
      "${escapeTsString(keywordString)}",
    href: "${escapeTsString(route)}",
    status: "active",
  },`;

  const closingIndex =
    current.lastIndexOf("];");

  if (closingIndex === -1) {
    throw new Error(
      "Nie znaleziono końca tablicy calculators.",
    );
  }

  const updated =
    current.slice(0, closingIndex) +
    newEntry +
    "\n" +
    current.slice(closingIndex);

  fs.writeFileSync(
    CALCULATORS_FILE,
    updated,
    "utf8",
  );
}

async function main() {
  console.log("");
  console.log("======================================");
  console.log("   POLICZDOBRZE – NOWY KALKULATOR");
  console.log("======================================");
  console.log("");

  const title = await ask(
    "Nazwa kalkulatora: ",
  );

  if (!title) {
    throw new Error(
      "Nazwa kalkulatora jest wymagana.",
    );
  }

  const slugInput = await ask(
    "Slug URL [automatycznie]: ",
  );

  const slug =
    slugInput || slugify(title);

  if (!slug) {
    throw new Error(
      "Nie udało się utworzyć poprawnego sluga.",
    );
  }

  const iconInput = await ask(
    "Ikona [🧮]: ",
  );

  const icon =
    iconInput || "🧮";

  const categoryInput = await ask(
    "Kategoria (Motoryzacja / Budowa i remont / Finanse / Dom): ",
  );

  if (!categoryInput) {
    throw new Error(
      "Kategoria jest wymagana.",
    );
  }

  const category =
    normalizeCategory(categoryInput);

  const description = await ask(
    "Opis: ",
  );

  if (!description) {
    throw new Error(
      "Opis jest wymagany.",
    );
  }

  const keywordsInput = await ask(
    "Słowa kluczowe (oddziel przecinkami): ",
  );

  const keywords = keywordsInput
    ? keywordsInput
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    : [
        title,
        category.name,
        "kalkulator",
      ];

  const siteUrl =
    "https://policzdobrze.pl";

  const route =
    `/${category.path}/${slug}`;

  const targetDirectory = path.join(
    APP_DIR,
    category.path,
    slug,
  );

  const pageFile = path.join(
    targetDirectory,
    "page.tsx",
  );

  const layoutFile = path.join(
    targetDirectory,
    "layout.tsx",
  );

  if (fs.existsSync(targetDirectory)) {
    throw new Error(
      `Folder już istnieje:\n${targetDirectory}`,
    );
  }

  fs.mkdirSync(
    targetDirectory,
    { recursive: true },
  );

  fs.writeFileSync(
    pageFile,
    buildPage({
      icon,
      title,
      description,
      categoryName: category.name,
      categoryPath: category.path,
      slug,
    }),
    "utf8",
  );

  fs.writeFileSync(
    layoutFile,
    buildLayout({
      title,
      description,
      keywords,
      siteUrl,
      route,
    }),
    "utf8",
  );

  addToCalculators({
    icon,
    title,
    description,
    categoryName: category.name,
    slug,
    route,
    keywords,
  });

  console.log("");
  console.log("======================================");
  console.log("✅ KALKULATOR UTWORZONY");
  console.log("======================================");
  console.log("");
  console.log(`Nazwa:       ${title}`);
  console.log(`Kategoria:   ${category.name}`);
  console.log(`Adres:       ${route}`);
  console.log("");
  console.log("Utworzone pliki:");
  console.log(`- ${pageFile}`);
  console.log(`- ${layoutFile}`);
  console.log("");
  console.log(
    "Sitemap zostanie zaktualizowana automatycznie przez Next.js.",
  );
  console.log("");
  console.log(
    "Analytics calculator_used jest już przygotowane.",
  );
  console.log("");
  console.log(
    "⚠️  page.tsx zawiera szkielet kalkulatora.",
  );
  console.log(
    "    Trzeba dodać właściwą logikę obliczeń.",
  );
  console.log("");
}

main()
  .catch((error) => {
    console.error("");
    console.error("❌ Błąd:");
    console.error(error.message);
    console.error("");
    process.exitCode = 1;
  })
  .finally(() => {
    rl.close();
  });