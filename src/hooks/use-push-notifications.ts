import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import {
  getPushStatus,
  getVapidPublicKey,
  removePushSubscription,
  savePushSubscription,
  type PushStatus,
} from "@/lib/api/push";
import {
  getBrowserPushState,
  PushPermissionDeniedError,
  subscribeBrowserToPush,
  type BrowserPushState,
} from "@/lib/push/browser-push";

import { useIsAuthenticated } from "./use-is-authenticated";

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
  isAuthenticated: boolean;
  isLoading: boolean;
  isServerUnavailable: boolean;
  browserState: BrowserPushState | undefined;
};

// The browser permission and the app subscription are two different things:
// "denied" comes from the browser, "enabled" needs a real subscription too.
function getPushOptInStatus({
  isAuthenticated,
  isLoading,
  isServerUnavailable,
  browserState,
}: PushOptInInputs): PushOptInStatus {
  if (!isAuthenticated || isServerUnavailable) return "hidden";
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

export function usePushNotifications() {
  // Translation
  const t = useTranslations("Push");

  // Context
  const queryClient = useQueryClient();

  // Custom hooks
  const isAuthenticated = useIsAuthenticated();

  // Query
  const browserState = useQuery({
    queryKey: pushKeys.browser(),
    queryFn: getBrowserPushState,
    enabled: isAuthenticated,
  });
  const vapidKey = useQuery({
    queryKey: pushKeys.vapidKey(),
    queryFn: getVapidPublicKey,
    enabled: isAuthenticated,
    staleTime: Infinity,
  });
  const serverStatus = useQuery({
    queryKey: pushKeys.status(),
    queryFn: getPushStatus,
    enabled: isAuthenticated,
  });

  // Mutation
  const enablePush = useMutation({
    mutationFn: async (vapidPublicKey: string) => {
      const subscription = await subscribeBrowserToPush(vapidPublicKey);

      try {
        await savePushSubscription(subscription.toJSON());
      } catch (error) {
        // Keep the browser and the server in sync: no server copy, no subscription.
        await subscription.unsubscribe();
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
    mutationFn: async (subscription: PushSubscription) => {
      await removePushSubscription(subscription.endpoint);
      await subscription.unsubscribe();
    },
    onSuccess: () => toast.success(t("disabledToast")),
    onError: () => toast.error(t("errorToast")),
    onSettled: refreshPushState,
  });

  // Variables
  const status = getPushOptInStatus({
    isAuthenticated,
    isLoading: browserState.isPending || vapidKey.isPending || serverStatus.isPending,
    isServerUnavailable: vapidKey.isError || !isPushConfigured(serverStatus.data),
    browserState: browserState.data,
  });

  // Functions
  function refreshPushState() {
    return queryClient.invalidateQueries({ queryKey: pushKeys.all });
  }

  function enable() {
    if (vapidKey.data) enablePush.mutate(vapidKey.data);
  }

  function disable() {
    const subscription = browserState.data?.subscription;
    if (subscription) disablePush.mutate(subscription);
  }

  return {
    status,
    enable,
    disable,
    isUpdating: enablePush.isPending || disablePush.isPending,
  };
}
