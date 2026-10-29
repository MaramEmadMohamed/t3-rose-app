import { getAccessToken } from "@/lib/auth/access-token";

// Features that belong to a user (notifications, push) only call the API
// when someone is logged in.
export function useIsAuthenticated() {
  return Boolean(getAccessToken());
}
