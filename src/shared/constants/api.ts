export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://rose-app.elevate-bootcamp.cloud";

export const HTTP_STATUS = {
  CONFLICT: 409,
} as const;
