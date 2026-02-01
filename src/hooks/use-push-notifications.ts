'use client';

import { useCallback, useEffect, useState } from 'react';
import { subscribeToPush, unsubscribeFromPush } from '@/app/get-alerts/actions';

export type PushNotificationState =
  | 'loading'
  | 'unsupported'
  | 'ios-needs-install' // iOS Safari - needs to add to home screen
  | 'default'
  | 'granted'
  | 'denied'
  | 'subscribed';

interface UsePushNotificationsResult {
  state: PushNotificationState;
  error: string | null;
  isIOS: boolean;
  isPWA: boolean;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function detectIsIOS(): boolean {
  if (typeof window === 'undefined') return false;

  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

function detectIsPWA(): boolean {
  if (typeof window === 'undefined') return false;

  // Check if running in standalone mode (installed PWA)
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari specific
    ('standalone' in window.navigator && (window.navigator as Navigator & { standalone: boolean }).standalone === true)
  );
}

export function usePushNotifications(): UsePushNotificationsResult {
  const [state, setState] = useState<PushNotificationState>('loading');
  const [error, setError] = useState<string | null>(null);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      const ios = detectIsIOS();
      const pwa = detectIsPWA();
      setIsIOS(ios);
      setIsPWA(pwa);

      // Check basic browser support
      if (typeof window === 'undefined') {
        setState('unsupported');
        return;
      }

      // iOS Safari (not installed as PWA) - needs to add to home screen first
      if (ios && !pwa) {
        setState('ios-needs-install');
        return;
      }

      // Check for service worker and push support
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        setState('unsupported');
        return;
      }

      // Check notification permission
      const permission = Notification.permission;

      if (permission === 'denied') {
        setState('denied');
        return;
      }

      // Register service worker
      try {
        const reg = await navigator.serviceWorker.register('/sw.js');
        setRegistration(reg);

        // Check if already subscribed
        const existingSubscription = await reg.pushManager.getSubscription();
        if (existingSubscription) {
          setState('subscribed');
          return;
        }

        if (permission === 'granted') {
          setState('granted');
        } else {
          setState('default');
        }
      } catch (err) {
        console.error('Service worker registration failed:', err);
        setState('unsupported');
      }
    }

    void checkStatus();
  }, []);

  const subscribe = useCallback(async () => {
    setError(null);

    if (!registration) {
      setError('Service worker not registered');
      return;
    }

    const vapidPublicKey = process.env['NEXT_PUBLIC_VAPID_PUBLIC_KEY'];
    if (!vapidPublicKey) {
      setError('Push notifications are not configured');
      return;
    }

    try {
      // Request notification permission
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setState(permission === 'denied' ? 'denied' : 'default');
        return;
      }

      // Subscribe to push
      const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey.buffer as ArrayBuffer,
      });

      const subscriptionJson = subscription.toJSON();
      if (!subscriptionJson.endpoint || !subscriptionJson.keys) {
        throw new Error('Invalid subscription data');
      }

      // Save to database
      const result = await subscribeToPush({
        endpoint: subscriptionJson.endpoint,
        keys: {
          p256dh: subscriptionJson.keys['p256dh'] ?? '',
          auth: subscriptionJson.keys['auth'] ?? '',
        },
        userAgent: navigator.userAgent,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      setState('subscribed');
    } catch (err) {
      console.error('Subscribe error:', err);
      setError(err instanceof Error ? err.message : 'Failed to subscribe');
    }
  }, [registration]);

  const unsubscribe = useCallback(async () => {
    setError(null);

    if (!registration) {
      setError('Service worker not registered');
      return;
    }

    try {
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        // Remove from database
        await unsubscribeFromPush(subscription.endpoint);
        // Unsubscribe from push service
        await subscription.unsubscribe();
      }

      setState('granted');
    } catch (err) {
      console.error('Unsubscribe error:', err);
      setError(err instanceof Error ? err.message : 'Failed to unsubscribe');
    }
  }, [registration]);

  return { state, error, isIOS, isPWA, subscribe, unsubscribe };
}
