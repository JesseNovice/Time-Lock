'use client';

import { useEffect } from 'react';

export default function GoogleAdsConversion() {
  useEffect(() => {
    // Create and append the first script
    const script3 = document.createElement('script');
    script3.innerHTML = `
    <!-- Event snippet for Test conversion page -->
 gtag('event', 'conversion', {'send_to': 'AW-11499755334/WkBxCMab_OsaEMauwesq'});
    `;

    // Append scripts to head
    document.head.appendChild(script3);

    // Cleanup function to remove scripts if component unmounts
    return () => {
      document.head.removeChild(script3);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
