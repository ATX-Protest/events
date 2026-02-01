// Service Worker for ATX Protests Push Notifications

self.addEventListener('push', (event) => {
  console.log('[SW] Push event received', event);

  if (!event.data) {
    console.log('[SW] No push data');
    return;
  }

  const handlePush = async () => {
    try {
      const data = event.data.json();
      console.log('[SW] Push data:', data);

      const options = {
        body: data.body || 'New update available',
        icon: data.icon || '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'atx-protests-notification',
        renotify: true,
        data: {
          url: data.url || '/',
        },
      };

      console.log('[SW] Showing notification with options:', options);
      await self.registration.showNotification(data.title || 'ATX Protests', options);
      console.log('[SW] Notification shown successfully');
    } catch (error) {
      console.error('[SW] Error handling push event:', error);
    }
  };

  event.waitUntil(handlePush());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if app is already open
      for (const client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(urlToOpen);
          return client.focus();
        }
      }
      // Open a new window if app is not open
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

self.addEventListener('pushsubscriptionchange', (event) => {
  // Re-subscribe if the subscription expires
  event.waitUntil(
    self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: self.VAPID_PUBLIC_KEY,
      })
      .then((subscription) => {
        // Send new subscription to server
        return fetch('/api/push/resubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            oldEndpoint: event.oldSubscription?.endpoint,
            newSubscription: subscription.toJSON(),
          }),
        });
      })
      .catch((error) => {
        console.error('Error re-subscribing:', error);
      })
  );
});
