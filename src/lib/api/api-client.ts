import { getAccessToken } from "@/lib/auth/access-token";
import { API_BASE_URL } from "@/lib/constants/api";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type ApiErrorBody = {
  message?: string;
};

async function readErrorMessage(response: Response) {
  try {
    const errorBody: ApiErrorBody = await response.json();
    return errorBody.message ?? response.statusText;
  } catch {
    return response.statusText;
  }
}

export async function apiRequest<TResponse>(
  path: string,
  init?: RequestInit,
): Promise<TResponse> {
  const accessToken = getAccessToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(await readErrorMessage(response), response.status);
  }

  return response.json();
}
