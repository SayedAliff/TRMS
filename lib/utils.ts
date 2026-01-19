import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind class merging utility (UI only)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert camelCase object keys to snake_case (for backend payloads)
export function toSnakeCaseObj(
  obj: Record<string, any>
): Record<string, any> {
  if (typeof obj !== "object" || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(toSnakeCaseObj);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
      typeof v === "object" && v !== null ? toSnakeCaseObj(v) : v,
    ])
  );
}

// Format date to YYYY-MM-DD (for backend)
export function formatDate(date: Date | string): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().slice(0, 10);
}
