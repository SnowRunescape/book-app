import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function moneyFormat(value: number) {
  if (isNaN(Number(value))) {
    throw new Error('Invalid input: not a number');
  }
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
}
