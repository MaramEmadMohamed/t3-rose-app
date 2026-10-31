"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import { ApiError } from "@/lib/api/api-client";

const MAX_QUERY_RETRIES = 3;
const FIRST_SERVER_ERROR_STATUS = 500;

// Retrying a client error (like 401 or 404) gives the same answer, so only
// network and server errors are retried.
function shouldRetryQuery(failureCount: number, error: Error) {
  const isClientError =
    error instanceof ApiError && error.status < FIRST_SERVER_ERROR_STATUS;

  return !isClientError && failureCount < MAX_QUERY_RETRIES;
}

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: shouldRetryQuery },
    },
  });
}

export function QueryProvider({ children }: { children: ReactNode }) {
  // State
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
