export const whiteListAddress = "0x1dCD1f1353089441f02B1Ce5e917e2fdbb97d30C";

export const whiteListABI = {
  abi: [
    {
      type: "fallback",
      stateMutability: "payable",
    },
    {
      type: "receive",
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "PaymentAddress",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "addWhiteList",
      inputs: [
        {
          name: "_address",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "removeWhiteList",
      inputs: [
        {
          name: "_address",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "searchWhiteList",
      inputs: [
        {
          name: "_address",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "whiteListed",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "withdraw",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
  ],
};

export const vaultdeployerAddress = "0xc0491d235ae1d54f75f55952789986c73558cb21";

export const vaultdeployerABI = {"abi":[{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"_whiteListContract","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"deployVault","inputs":[{"name":"unlockTime","type":"uint256","internalType":"uint256"},{"name":"vaultType","type":"uint256","internalType":"uint256"},{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"whiteListContract","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract IwhiteListContract"}],"stateMutability":"view"},{"type":"event","name":"VaultDeployed","inputs":[{"name":"vaultAddress","type":"address","indexed":true,"internalType":"address"},{"name":"vaultType","type":"string","indexed":false,"internalType":"string"},{"name":"unlockTime","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false}]};

export const timeDecayCreateVaultABI = {"abi":[{"type":"constructor","inputs":[{"name":"_unlockTime","type":"uint256","internalType":"uint256"},{"name":"_owner","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"DepositMultipleTokens","inputs":[{"name":"_tokenAddresses","type":"address[]","internalType":"address[]"},{"name":"_tokenAmounts","type":"uint256[]","internalType":"uint256[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"WithdrawMultipleTokens","inputs":[{"name":"_tokenAddresses","type":"address[]","internalType":"address[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"depositETHToVault","inputs":[],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"depositTokenToVault","inputs":[{"name":"_tokenAddress","type":"address","internalType":"address"},{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getAvaliablePercentage","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"getBalanceOfETH","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getBalanceOfToken","inputs":[{"name":"_tokenAddress","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getOwner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"getUnlockTime","inputs":[],"outputs":[{"name":"daysRemaining","type":"uint256","internalType":"uint256"},{"name":"hoursRemaining","type":"uint256","internalType":"uint256"},{"name":"minutesRemaining","type":"uint256","internalType":"uint256"},{"name":"secondsRemaining","type":"uint256","internalType":"uint256"},{"name":"currentblocktime","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"i_Owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"unlockTime","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"withdrawETHFromVault","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"withdrawToken","inputs":[{"name":"_tokenAddress","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"}]};

export const createVaultWithSafetyABI = {"abi":[{"type":"constructor","inputs":[{"name":"_unlockTime","type":"uint256","internalType":"uint256"},{"name":"_owner","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"DepositMultipleTokens","inputs":[{"name":"_tokenAddresses","type":"address[]","internalType":"address[]"},{"name":"_tokenAmounts","type":"uint256[]","internalType":"uint256[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"depositETHToVault","inputs":[],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"depositTokenToVault","inputs":[{"name":"_tokenAddress","type":"address","internalType":"address"},{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getBalanceOfETH","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getBalanceOfToken","inputs":[{"name":"_tokenAddress","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getOwner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"getUnlockTime","inputs":[],"outputs":[{"name":"daysRemaining","type":"uint256","internalType":"uint256"},{"name":"hoursRemaining","type":"uint256","internalType":"uint256"},{"name":"minutesRemaining","type":"uint256","internalType":"uint256"},{"name":"secondsRemaining","type":"uint256","internalType":"uint256"},{"name":"currentblocktime","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"i_Owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"resetUnlockTime","inputs":[{"name":"_unlockTime","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"unlockTime","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"withdrawETHFromVault","inputs":[{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"withdrawMultipleTokens","inputs":[{"name":"_tokenAddresses","type":"address[]","internalType":"address[]"},{"name":"_tokenAmounts","type":"uint256[]","internalType":"uint256[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"withdrawTokens","inputs":[{"name":"_tokenAddress","type":"address","internalType":"address"},{"name":"_tokenAmount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"}]};

export const createVaultABI = {"abi":[{"type":"constructor","inputs":[{"name":"_unlockTime","type":"uint256","internalType":"uint256"},{"name":"_owner","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"DepositMultipleTokens","inputs":[{"name":"_tokenAddresses","type":"address[]","internalType":"address[]"},{"name":"_tokenAmounts","type":"uint256[]","internalType":"uint256[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"depositETHToVault","inputs":[],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"depositTokenToVault","inputs":[{"name":"_tokenAddress","type":"address","internalType":"address"},{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getBalanceOfETH","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getBalanceOfToken","inputs":[{"name":"_tokenAddress","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getOwner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"getUnlockTime","inputs":[],"outputs":[{"name":"daysRemaining","type":"uint256","internalType":"uint256"},{"name":"hoursRemaining","type":"uint256","internalType":"uint256"},{"name":"minutesRemaining","type":"uint256","internalType":"uint256"},{"name":"secondsRemaining","type":"uint256","internalType":"uint256"},{"name":"currentblocktime","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"i_Owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"unlockTime","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"withdrawETHFromVault","inputs":[{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"withdrawMultipleTokens","inputs":[{"name":"_tokenAddresses","type":"address[]","internalType":"address[]"},{"name":"_tokenAmounts","type":"uint256[]","internalType":"uint256[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"withdrawTokens","inputs":[{"name":"_tokenAddress","type":"address","internalType":"address"},{"name":"_tokenAmount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"}]};