import "../styles/index.scss"
import AppKitProvider from "../../context/appkit"
import GoogleAds from "../components/GoogleAds"

const isDev = process.env.NODE_ENV === 'development'

export const metadata = {
  title: 'Time Vault',
  description: 'Lock up your ERC-20 tokens for a set period of time',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <head>
        <GoogleAds />
        <meta name="description" content="Time Vault is a secure, decenralized and affordable dapp that allows users to lock up their funds in your own smart contract for a predetermined time. Currently built for the ethereum network." />
        <link rel="icon" href="/New_Logo.png" sizes="any" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Titillium+Web:wght@400;600;700&display=swap" />
      </head>
      <body suppressHydrationWarning={true}>
        <AppKitProvider>
          {children}
        </AppKitProvider>
      </body>
    </html>
  );
}
