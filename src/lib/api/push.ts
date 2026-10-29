import { apiRequest } from "./api-client";

type VapidPublicKeyResponse = {
  payload: {
    publicKey: string;
  };
};

export type PushStatus = {
  pushConfigured: boolean;
  subscriptionCount: number;
  unreadCount: number;
};

type PushStatusResponse = {
  payload: PushStatus;
};

const PUSH_PATH = "/api/notifications";

// Public endpoint. A 404 means push is not configured on the server.
export async function getVapidPublicKey() {
  const response = await apiRequest<VapidPublicKeyResponse>(
    `${PUSH_PATH}/vapid-public-key`,
  );
  return response.payload.publicKey;
}

export async function getPushStatus() {
  const response = await apiRequest<PushStatusResponse>(`${PUSH_PATH}/push-status`);
  return response.payload;
}

// The API upserts by endpoint, so sending the same subscription twice is safe.
export function savePushSubscription(subscription: PushSubscriptionJSON) {
  return apiRequest(`${PUSH_PATH}/subscriptions`, {
    method: "POST",
    body: JSON.stringify(subscription),
  });
}

export function removePushSubscription(endpoint: string) {
  return apiRequest(`${PUSH_PATH}/subscriptions`, {
    method: "DELETE",
    body: JSON.stringify({ endpoint }),
  });
}
