'use client';

import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { mainnet, sepolia } from '@reown/appkit/networks';
import { ReactNode } from 'react';

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!;

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_PROJECT_ID in .env.local");
}

const metadata = {
  name: 'Time Vault',
  description: 'Lock up your ERC-20 tokens for a set period of time',
  url: 'https://timevaultlock.netlify.app/',
  icons: ['']
};

// Initialize AppKit only once
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [mainnet, sepolia],
  defaultNetwork: sepolia,
  projectId,
  features: { analytics: true, socials: false, email: false }
});

interface AppKitProviderProps {
  children: ReactNode;
}

// ✅ Ensure this is a valid Client Component
export function AppKitProvider({ children }: AppKitProviderProps) {
  return <>{children}</>;
}

export default AppKitProvider; // ✅ Ensure it is properly exported
