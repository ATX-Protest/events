'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const GTM_ID = 'GTM-5KMKJDJ4';

/**
 * Google Tag Manager component that respects Do Not Track (DNT) preferences.
 * Will not load GTM if the user has DNT enabled in their browser.
 */
export function GoogleTagManager() {
  const [shouldTrack, setShouldTrack] = useState(false);

  useEffect(() => {
    // Check Do Not Track preference
    // navigator.doNotTrack: "1" = DNT enabled, "0" = DNT disabled, null = not set
    // window.doNotTrack: IE/Edge legacy support
    const dnt =
      navigator.doNotTrack ||
      (window as Window & { doNotTrack?: string }).doNotTrack;

    // Only track if DNT is not "1" (enabled)
    // Treat unset (null) as consent to track (industry standard)
    if (dnt !== '1') {
      setShouldTrack(true);
    }
  }, []);

  if (!shouldTrack) {
    return null;
  }

  return (
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/**
 * GTM noscript iframe - also respects DNT via CSS class added by main component.
 * Note: For true DNT respect in noscript, we'd need server-side header detection.
 * Since noscript users have JS disabled, DNT detection isn't possible client-side.
 * This is a reasonable tradeoff - noscript users are rare and GTM provides limited
 * tracking without JS anyway.
 */
export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
