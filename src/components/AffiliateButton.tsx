"use client";

import { trackEvent } from "@/lib/analytics";

type AffiliateButtonProps = {
  calculator: string;
  partner: string;
  href: string;
  children: React.ReactNode;
};

export default function AffiliateButton({
  calculator,
  partner,
  href,
  children,
}: AffiliateButtonProps) {
  function handleClick() {
    trackEvent("affiliate_click", {
      calculator,
      partner,
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      onClick={handleClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}