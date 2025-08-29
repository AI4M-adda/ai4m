import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function groupBy(array: any[], key: string) {
  if (array.length <= 0 || !key) return {};
  return array.reduce((result, currentValue) => {
    result[currentValue[key] || "N/A"] = [
      ...(result[currentValue[key]] || []),
      currentValue,
    ];
    return result;
  }, {});
}
