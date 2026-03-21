import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBlockBar(value: number, max: number, length: number = 5): { filled: number; empty: number } {
  const filled = Math.min(Math.round((value / max) * length), length);
  return { filled, empty: length - filled };
}
