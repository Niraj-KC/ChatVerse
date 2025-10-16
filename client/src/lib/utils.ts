import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const apiBaseUrl = "http://34.93.216.234:4000/api/v1";
export const socketBaseURL = "http://34.93.216.234:4000";

