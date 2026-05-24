/**
 * Utility for merging class names.
 * Filters falsy values and joins with a space.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
