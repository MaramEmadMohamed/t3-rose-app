// Rose App service worker: shows Web Push notifications and opens the
// right page when one is clicked, even if the site is closed.

const DEFAULT_TITLE = "Rose";
const DEFAULT_ICON = "/images/logo.png";
const DEFAULT_PATH = "/";

function readPushData(event) {
  if (!event.data) return {};

  try {
    return event.data.json();
  } catch {
    return { message: event.data.text() };
  }
}

// Only same-origin links are opened, so a push can never send the user
// to another website.
function toSafeUrl(link) {
  const url = new URL(link || DEFAULT_PATH, self.location.origin);
  return url.origin === self.location.origin
    ? url.href
    : new URL(DEFAULT_PATH, self.location.origin).href;
}

self.addEventListener("push", (event) => {
  const data = readPushData(event);

  event.waitUntil(
    self.registration.showNotification(data.title || DEFAULT_TITLE, {
      body: data.message || data.body || "",
      icon: data.icon || DEFAULT_ICON,
      data: { url: toSafeUrl(data.link || data.url) },
    }),
  );
});

async function focusOrOpenWindow(targetUrl) {
  const windowClients = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });

  const matchingClient = windowClients.find((client) => client.url === targetUrl);
  if (matchingClient) return matchingClient.focus();

  const appClient = windowClients.find((client) => "navigate" in client);
  if (appClient) {
    await appClient.focus();
    return appClient.navigate(targetUrl);
  }

  return self.clients.openWindow(targetUrl);
}

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(focusOrOpenWindow(toSafeUrl(event.notification.data?.url)));
});
