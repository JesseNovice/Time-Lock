declare module 'wowjs' {
  const WOW: any;
  export default WOW;
}

interface Window {
    ethereum?: MetaMaskEthereumProvider;
}

interface MetaMaskEthereumProvider {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: Array<any> }) => Promise<any>;
    on?: (eventName: string, callback: (...args: any[]) => void) => void;
    removeListener?: (eventName: string, callback: (...args: any[]) => void) => void;
}

