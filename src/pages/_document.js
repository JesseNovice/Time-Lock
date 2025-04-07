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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
