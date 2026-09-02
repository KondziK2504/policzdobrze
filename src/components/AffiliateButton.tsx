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
  function handleClick(
    event: React.MouseEvent<HTMLAnchorElement>,
  ) {
    event.preventDefault();

    trackEvent("affiliate_click", {
      calculator,
      partner,
    });

    window.setTimeout(() => {
      window.open(
        href,
        "_blank",
        "noopener,noreferrer",
      );
    }, 300);
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      rel="nofollow sponsored noopener"
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}