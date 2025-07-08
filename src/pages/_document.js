import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Add your custom fonts here */}
        <link
          href="https://fonts.googleapis.com"
          rel="preconnect"
        />
        <link
          href="https://fonts.gstatic.com"
          rel="preconnect"
          crossOrigin="anonymous"
        />
        {/* Add any other custom fonts you're using in your application */}
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-11499755334"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-11499755334');
</script>


      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
