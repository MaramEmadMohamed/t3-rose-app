const SERVICE_WORKER_PATH = "/sw.js";
const BASE64_BLOCK_SIZE = 4;

export type BrowserPushState = {
  isSupported: boolean;
  permission: NotificationPermission;
  subscription: PushSubscription | null;
};

export class PushPermissionDeniedError extends Error {
  constructor() {
    super("Notification permission was not granted");
    this.name = "PushPermissionDeniedError";
  }
}

export function isPushSupported() {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

// The VAPID key comes as base64url text, but the Push API needs raw bytes.
export function decodeBase64Url(base64Url: string) {
  const missingPadding =
    (BASE64_BLOCK_SIZE - (base64Url.length % BASE64_BLOCK_SIZE)) %
    BASE64_BLOCK_SIZE;
  const base64 = (base64Url + "=".repeat(missingPadding))
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);

  return Uint8Array.from(rawData, (character) => character.charCodeAt(0));
}

export function registerServiceWorker() {
  return navigator.serviceWorker.register(SERVICE_WORKER_PATH, {
    scope: "/",
    updateViaCache: "none",
  });
}

// Only reads what the browser already knows. It never registers anything
// and never asks for permission.
export async function getBrowserPushState(): Promise<BrowserPushState> {
  if (!isPushSupported()) {
    return { isSupported: false, permission: "default", subscription: null };
  }

  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = (await registration?.pushManager.getSubscription()) ?? null;

  return {
    isSupported: true,
    permission: Notification.permission,
    subscription,
  };
}

// Asks for permission (only ever called from a button click), then reuses
// the existing subscription or creates a new one.
export async function subscribeBrowserToPush(vapidPublicKey: string) {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") throw new PushPermissionDeniedError();

  const registration = await registerServiceWorker();
  const existingSubscription = await registration.pushManager.getSubscription();
  if (existingSubscription) return existingSubscription;

  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: decodeBase64Url(vapidPublicKey),
  });
}
