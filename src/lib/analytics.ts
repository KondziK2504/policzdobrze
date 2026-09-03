export function trackEvent(
  eventName: string,
  parameters: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const gtag = (
    window as Window & {
      gtag?: (
        command: string,
        eventName: string,
        parameters?: Record<string, string | number | boolean>,
      ) => void;
    }
  ).gtag;

  if (!gtag) {
    return;
  }

  gtag("event", eventName, parameters);
}

export function trackCalculatorUsed(calculator: string) {
  trackEvent("calculator_used", {
    calculator,
  });
}