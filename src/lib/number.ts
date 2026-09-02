export function parseNumber(value: string): number {
  if (!value) {
    return 0;
  }

  const normalized = value
    .trim()
    .replace(/\s/g, "")
    .replace(",", ".");

  const number = Number(normalized);

  return Number.isFinite(number) ? number : 0;
}