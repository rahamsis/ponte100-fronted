
/* eslint-disable */

// lib/utils/cn.ts
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge" // opcional si usas Tailwind

export function cn(...inputs: any[]) {
  return twMerge(clsx(...inputs))
}
