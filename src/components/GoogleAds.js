'use client';
import { useEffect } from 'react';

export default function GoogleAds() {
  useEffect(() => {
    // Create and append the first script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=AW-11499755334';

    // Create and append the second script
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-11499755334');
    `;

    // Append scripts to head
    document.head.appendChild(script1);
    document.head.appendChild(script2);

    // Cleanup function to remove scripts if component unmounts
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
