import { requestApi } from "./api-client";

type NewsletterSubscription = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type SubscribeToNewsletterResponse = {
  status: boolean;
  code: number;
  payload: {
    subscription: NewsletterSubscription;
  };
};

export function subscribeToNewsletter(email: string) {
  return requestApi<SubscribeToNewsletterResponse>("/api/subscriptions", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
