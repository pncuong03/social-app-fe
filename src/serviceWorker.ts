import { subcribeWorkerApi, unSubcribeWorkerApi } from "./apis/auth";
import { PUBLIC_KEY } from "./const/env";

function urlBase64(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export const subscribePushNoti = async (registration: ServiceWorkerRegistration): Promise<void> => {
  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64(PUBLIC_KEY),
    });

    await subcribeWorkerApi(subscription);
  } catch (error) {
    console.error("Error during push subscription:", error);
  }
};

export const unSubscribePushNoti = async (registration: ServiceWorkerRegistration): Promise<void> => {
  try {
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();

      await unSubcribeWorkerApi(subscription);
    } else {
      console.warn("No subscription found.");
    }
  } catch (error) {
    console.error("Error during push unsubscription:", error);
  }
};

export function register() {
  if ("serviceWorker" in navigator) {
    const publicUrl = new URL(`${process.env.PUBLIC_URL}`, window.location.href);

    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      navigator.serviceWorker.getRegistration().then((registration) => {
        if (!registration) {
          navigator.serviceWorker.register(swUrl);
        } else {
          console.log("Service Worker is already registered");
        }

        document.addEventListener("visibilitychange", () => {
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: "VISIBILITY_CHANGE",
              visibilityState: document.visibilityState,
            });
          }
        });
      });
    });
  } else {
    console.warn("Service Worker is not supported in this browser.");
  }
}

export function unRegister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister().then(() => {
        console.log("Service Worker unregistered.");
      });
    });
  }
}
