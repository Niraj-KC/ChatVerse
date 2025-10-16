import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const apiBaseUrl = "http://127.0.0.1:4000/api/v1";
export const socketBaseURL = "http://127.0.0.1:4000";

