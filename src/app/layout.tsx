import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const siteUrl = "https://www.policzdobrze.pl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "PoliczDobrze.pl – Darmowe kalkulatory online",
    template: "%s | PoliczDobrze.pl",
  },

  description:
    "Darmowe kalkulatory online do szybkiego obliczania kosztów, cen, spalania samochodu, VAT, leasingu, wynagrodzenia i wielu innych wartości.",

  authors: [
    {
      name: "PoliczDobrze.pl",
      url: siteUrl,
    },
  ],

  creator: "PoliczDobrze.pl",
  publisher: "PoliczDobrze.pl",

  openGraph: {
    title: "PoliczDobrze.pl – Darmowe kalkulatory online",
    description:
      "Proste i darmowe kalkulatory do codziennych obliczeń.",
    url: siteUrl,
    siteName: "PoliczDobrze.pl",
    locale: "pl_PL",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PoliczDobrze.pl – Darmowe kalkulatory online",
    description:
      "Proste i darmowe kalkulatory do codziennych obliczeń.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/icon.svg",
  },

  category: "utilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <meta
          name="convertiser-verification"
          content="0cd3fe0d75772d7926a17c7b2f7ea75c54188a1c"
        />
      </head>

      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}