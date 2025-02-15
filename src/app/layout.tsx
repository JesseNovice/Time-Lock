import "../styles/index.scss"

const isDev = process.env.NODE_ENV === 'development'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <head>
        <meta name="description" content="Time Vault is a secure, decenralized and affordable dapp that allows users to lock up their funds in your own smart contract for a predetermined time. Currently built for the ethereum network." />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Titillium+Web:wght@400;600;700&display=swap" />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
