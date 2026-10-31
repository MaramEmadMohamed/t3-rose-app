import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import {
  deletePushSubscription,
  getPushStatus,
  getVapidPublicKey,
  savePushSubscription,
  type PushStatus,
} from "@/lib/api/push";
import { isAuthenticated } from "@/lib/auth/access-token";
import {
  getBrowserPushState,
  PushPermissionDeniedError,
  subscribeBrowserToPush,
  type BrowserPushState,
} from "@/lib/push/browser-push";

// "hidden": push can't be offered (logged out, or not configured on the server).
// "disabled": push can be turned on. "enabled": this browser is subscribed.
export type PushOptInStatus =
  | "loading"
  | "hidden"
  | "unsupported"
  | "denied"
  | "disabled"
  | "enabled";

export const pushKeys = {
  all: ["push"] as const,
  browser: () => [...pushKeys.all, "browser"] as const,
  vapidKey: () => [...pushKeys.all, "vapid-key"] as const,
  status: () => [...pushKeys.all, "status"] as const,
};

type PushOptInInputs = {
  isLoggedIn: boolean;
  isLoading: boolean;
  isServerUnavailable: boolean;
  browserState: BrowserPushState | undefined;
};

// The browser permission and the app subscription are two different things:
// "denied" comes from the browser, "enabled" needs a real subscription too.
function getPushOptInStatus({
  isLoggedIn,
  isLoading,
  isServerUnavailable,
  browserState,
}: PushOptInInputs): PushOptInStatus {
  if (!isLoggedIn || isServerUnavailable) return "hidden";
  if (isLoading || !browserState) return "loading";
  if (!browserState.isSupported) return "unsupported";
  if (browserState.permission === "denied") return "denied";
  if (browserState.permission === "granted" && browserState.subscription) {
    return "enabled";
  }
  return "disabled";
}

function isPushConfigured(serverStatus: PushStatus | undefined) {
  return serverStatus?.pushConfigured !== false;
}

// Everything the opt-in needs to know: browser state, server key and status.
function usePushOptInState() {
  // Query
  const isLoggedIn = isAuthenticated();
  const browserState = useQuery({
    queryKey: pushKeys.browser(),
    queryFn: getBrowserPushState,
    enabled: isLoggedIn,
  });
  const vapidKey = useQuery({
    queryKey: pushKeys.vapidKey(),
    queryFn: getVapidPublicKey,
    enabled: isLoggedIn,
    staleTime: Infinity,
  });
  const serverStatus = useQuery({
    queryKey: pushKeys.status(),
    queryFn: getPushStatus,
    enabled: isLoggedIn,
  });

  // Variables
  const status = getPushOptInStatus({
    isLoggedIn,
    isLoading: browserState.isPending || vapidKey.isPending || serverStatus.isPending,
    isServerUnavailable: vapidKey.isError || !isPushConfigured(serverStatus.data),
    browserState: browserState.data,
  });

  return {
    status,
    vapidPublicKey: vapidKey.data,
    subscription: browserState.data?.subscription ?? null,
  };
}

export function usePushNotifications() {
  // Translation
  const t = useTranslations("Push");

  // Context
  const queryClient = useQueryClient();

  // Custom hooks
  const { status, vapidPublicKey, subscription } = usePushOptInState();

  // Mutation
  const enablePush = useMutation({
    mutationFn: async (publicKey: string) => {
      const newSubscription = await subscribeBrowserToPush(publicKey);

      try {
        await savePushSubscription(newSubscription.toJSON());
      } catch (error) {
        // Keep the browser and the server in sync: no server copy, no subscription.
        await newSubscription.unsubscribe();
        throw error;
      }
    },
    onSuccess: () => toast.success(t("enabledToast")),
    onError: (error) =>
      toast.error(
        error instanceof PushPermissionDeniedError
          ? t("deniedToast")
          : t("errorToast"),
      ),
    onSettled: refreshPushState,
  });

  const disablePush = useMutation({
    mutationFn: async (currentSubscription: PushSubscription) => {
      await deletePushSubscription(currentSubscription.endpoint);
      await currentSubscription.unsubscribe();
    },
    onSuccess: () => toast.success(t("disabledToast")),
    onError: () => toast.error(t("errorToast")),
    onSettled: refreshPushState,
  });

  // Functions
  function refreshPushState() {
    return queryClient.invalidateQueries({ queryKey: pushKeys.all });
  }

  function enable() {
    if (vapidPublicKey) enablePush.mutate(vapidPublicKey);
  }

  function disable() {
    if (subscription) disablePush.mutate(subscription);
  }

  return {
    status,
    enable,
    disable,
    isUpdating: enablePush.isPending || disablePush.isPending,
  };
}
