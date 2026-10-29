// TODO: return the logged-in user's JWT once the login ticket stores it.
// Every authenticated API call reads the token from here, so this is the
// only place that needs to change when login is ready.
export function getAccessToken(): string | null {
  return null;
}
