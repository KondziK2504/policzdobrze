"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

type CalculatorTrackerProps = {
  calculator: string;
  isCalculated: boolean;
};

export default function CalculatorTracker({
  calculator,
  isCalculated,
}: CalculatorTrackerProps) {
  const lastTracked = useRef(false);

  useEffect(() => {
    if (!isCalculated) {
      lastTracked.current = false;
      return;
    }

    if (lastTracked.current) {
      return;
    }

    lastTracked.current = true;

    trackEvent("calculator_used", {
      calculator,
    });
  }, [calculator, isCalculated]);

  return null;
}