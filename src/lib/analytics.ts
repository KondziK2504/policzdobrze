declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (
      command: "event" | "config" | "js",
      target: string | Date,
      parameters?: Record<string, string | number | boolean>,
    ) => void;
  }
}

export function trackEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag !== "function") {
    console.warn(
      `Google Analytics nie jest jeszcze gotowy. Event "${eventName}" nie został wysłany.`,
    );
    return;
  }

  window.gtag("event", eventName, parameters);
}