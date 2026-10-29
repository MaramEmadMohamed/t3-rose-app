// Until the login ticket is done, development uses a test user token that
// each developer puts in .env.local (see .env.example). It is only read in
// development, so it can never end up in a production build.
const TEST_USER_TOKEN =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_TEST_USER_TOKEN
    : undefined;

// TODO: return the logged-in user's token once the login ticket stores it.
// Every authenticated API call reads the token from here, so this is the
// only place that needs to change when login is ready.
export function getAccessToken(): string | null {
  return TEST_USER_TOKEN || null;
}
