import type { MetadataRoute } from "next";
import { calculators } from "@/data/calculators";

const siteUrl = "https://www.policzdobrze.pl";

export default function sitemap(): MetadataRoute.Sitemap {
  const activeCalculators = calculators.filter(
    (calculator) =>
      calculator.status === "active" &&
      calculator.href.startsWith("/"),
  );

  const calculatorUrls = activeCalculators.map(
    (calculator) => ({
      url: `${siteUrl}${calculator.href}`,
      changeFrequency: "monthly" as const,
      priority:
        calculator.category === "Finanse"
          ? 0.95
          : 0.9,
    }),
  );

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${siteUrl}/motoryzacja`,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: `${siteUrl}/budowa-remont`,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: `${siteUrl}/finanse`,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    ...calculatorUrls,
  ];
}