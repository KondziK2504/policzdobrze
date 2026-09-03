export function trackCalculatorUsed(calculator: string) {
  if (typeof window === "undefined") {
    return;
  }

  const gtag = (
    window as Window & {
      gtag?: (
        command: string,
        eventName: string,
        parameters?: Record<string, string>,
      ) => void;
    }
  ).gtag;

  if (!gtag) {
    return;
  }

  gtag("event", "calculator_used", {
    calculator,
  });
}