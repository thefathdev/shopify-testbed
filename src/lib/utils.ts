import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Encodes a Shopify GID to a URL-safe string for use in Next.js params.
 *
 * @param gid - The original Shopify GID to encode.
 * @returns A URL-safe encoded string.
 *
 * @example
 * const encodedGid = encodeShopifyGid('gid:/shopify/Product/7982856273942');
 * // Returns: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc5ODI4NTYyNzM5NDI"
 */
export function encodeShopifyGid(gid: string): string {
  return btoa(gid).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Decodes a URL-safe encoded Shopify GID back to its original form.
 *
 * @param encodedGid - The encoded Shopify GID to decode.
 * @returns The original Shopify GID.
 * @throws Will throw an error if the input is not a valid Base64 encoded string.
 *
 * @example
 * const decodedGid = decodeShopifyGid('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc5ODI4NTYyNzM5NDI');
 * // Returns: "gid:/shopify/Product/7982856273942"
 */
export function decodeShopifyGid(encodedGid: string): string {
  const base64 = encodedGid.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  return atob(base64 + padding);
}
