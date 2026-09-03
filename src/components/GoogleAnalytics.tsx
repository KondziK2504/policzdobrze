import Script from "next/script";

const GOOGLE_TAG_ID = "G-6P53DQG8PR";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        id="google-tag-script"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
        strategy="afterInteractive"
      />

      <Script
        id="google-tag"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;

          gtag('js', new Date());
          gtag('config', '${GOOGLE_TAG_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}