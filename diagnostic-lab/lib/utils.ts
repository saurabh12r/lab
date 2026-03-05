/**
 * Shared utilities. API-ready: add formatters, validators, etc.
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
