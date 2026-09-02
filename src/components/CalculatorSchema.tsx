"use client";

import { useEffect, useState } from "react";

type CalculatorSchemaProps = {
  title: string;
  description: string;
  categoryName?: string;
  categoryHref?: string;
};

const siteUrl = "https://policzdobrze.pl";

export default function CalculatorSchema({
  title,
  description,
  categoryName = "Kalkulatory",
  categoryHref = "/",
}: CalculatorSchemaProps) {
  const [url, setUrl] = useState(siteUrl);

  useEffect(() => {
    setUrl(window.location.href.split("#")[0]);
  }, []);

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
    url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: "pl-PL",
    publisher: {
      "@type": "Organization",
      name: "PoliczDobrze.pl",
      url: siteUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "PoliczDobrze",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryName,
        item: `${siteUrl}${categoryHref}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            calculatorSchema,
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema,
          ),
        }}
      />
    </>
  );
}