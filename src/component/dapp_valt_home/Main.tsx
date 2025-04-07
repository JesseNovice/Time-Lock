"use client";

import { BrowserProvider, ethers, Eip1193Provider } from "ethers";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore retrieval
import { whiteListABI, whiteListAddress, createVaultABI, createVaultWithSafetyABI, timeDecayCreateVaultABI} from "../../../web3/constants";
import { db } from "@/lib/firebase"; // Firestore & analytics reference
import Link from "next/link";
import { useCallback } from "react";
import "@/assets/css/main.css"; // Import your global styles
import { logEvent, Analytics } from "firebase/analytics";
import { getAnalyticsInstance } from "@/lib/firebase"; // Import the new getter function
import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit/react"; // Import the correct hooks and types


const contractABI = whiteListABI.abi;
const contractAddress = whiteListAddress;
const createvaultABI = createVaultABI.abi;
const createvaultwithsafetyABI = createVaultWithSafetyABI.abi;
const timedecaycreatevaultABI = timeDecayCreateVaultABI.abi;

const HasPaidWhiteLabelSection = ({ vaults, getEthBalance, analytics }: { vaults: any[], getEthBalance: Function, analytics: Analytics | null }) => {
    const [selectedVault, setSelectedVault] = useState<any | null>(null);
    const [depositType, setDepositType] = useState<string>("ETH");
    const [amount, setAmount] = useState<string>("");
    const [tokenAddress, setTokenAddress] = useState<string>("");
    const [balance, setBalance] = useState<string | null>(null);
    const [showText, setShowText] = useState(true);
    const { open } = useAppKit();
    const { walletProvider } = useAppKitProvider<Eip1193Provider>('eip155');
    const { address, isConnected } = useAppKitAccount();

    useEffect(() => {
        if (selectedVault) {
            const fetchBalance = async () => {
                const fetchedBalance = await getEthBalance(selectedVault);
                setBalance(fetchedBalance);
            };
            fetchBalance();
        }
    }, [selectedVault, getEthBalance]);

    const handleDeposit = async () => {
        if (!isConnected || !address || !walletProvider) {
            alert("Please connect your wallet first.");
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert("Please enter a valid amount to deposit.");
            return;
        }

        if (depositType === "Token" && !tokenAddress) {
            alert("Please enter a token address.");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(walletProvider);
            const signer = await provider.getSigner();
            
            let contract;
            if (selectedVault.vaultTypeName === "createVault") {
                contract = new ethers.Contract(selectedVault.vaultAddress, createvaultABI, signer);
            } else if (selectedVault.vaultTypeName === "createVaultWithSafety") {
                contract = new ethers.Contract(selectedVault.vaultAddress, createvaultwithsafetyABI, signer);
            } else {
                contract = new ethers.Contract(selectedVault.vaultAddress, timedecaycreatevaultABI, signer);
            }

            if (depositType === "ETH") {
                const tx = await contract.depositETHToVault({
                    value: ethers.parseEther(amount),
                });
                await tx.wait();
                
                if (analytics) {
                    logEvent(analytics, 'eth_deposited', {
                        amount: amount,
                        vault_address: selectedVault.vaultAddress
                    });
                }
            } else {
                const erc20ABI = [
                    "function approve(address spender, uint256 amount) returns (bool)",
                    "function allowance(address owner, address spender) view returns (uint256)",
                    "function decimals() view returns (uint8)"
                ];

                const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);
                const decimals = await tokenContract.decimals();
                const tokenAmount = ethers.parseUnits(amount, decimals);

                const allowance = await tokenContract.allowance(address, contract.target);
                if (BigInt(allowance) < BigInt(tokenAmount)) {
                    const approveTx = await tokenContract.approve(contract.target, tokenAmount);
                    await approveTx.wait();
                }

                const tx = await contract.depositTokenToVault(tokenAddress, tokenAmount);
                await tx.wait();

                if (analytics) {
                    logEvent(analytics, 'token_deposited', {
                        amount: amount,
                        token_address: tokenAddress,
                        vault_address: selectedVault.vaultAddress
                    });
                }
            }

            // Refresh the balance
            const newBalance = await getEthBalance(selectedVault);
            setBalance(newBalance);
        } catch (error) {
            console.error("Deposit error:", error);
            alert("Error making deposit. Please check the console for details.");
        }
    };

    const handleWithdraw = async () => {
        if (!isConnected || !address || !walletProvider) {
            alert("Please connect your wallet first.");
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert("Please enter a valid amount to withdraw.");
            return;
        }

        if (depositType === "Token" && !tokenAddress) {
            alert("Please enter a token address.");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(walletProvider);
            const signer = await provider.getSigner();
            let contract;
            
            if (selectedVault.vaultTypeName === "createVault") {
                contract = new ethers.Contract(selectedVault.vaultAddress, createvaultABI, signer);
            } else if (selectedVault.vaultTypeName === "createVaultWithSafety") {
                contract = new ethers.Contract(selectedVault.vaultAddress, createvaultwithsafetyABI, signer);
            } else {
                contract = new ethers.Contract(selectedVault.vaultAddress, timedecaycreatevaultABI, signer);
            }

            if (depositType === "ETH") {
                const tx = await contract.withdrawETHFromVault(ethers.parseEther(amount));
                await tx.wait();
                
                if (analytics) {
                    logEvent(analytics, 'eth_withdrawn', {
                        amount: amount,
                        vault_address: selectedVault.vaultAddress
                    });
                }
            } else {
                const erc20ABI = ["function decimals() view returns (uint8)"];
                const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);
                const decimals = await tokenContract.decimals();
                const tokenAmount = ethers.parseUnits(amount, decimals);

                const tx = await contract.withdrawTokens(tokenAddress, tokenAmount);
                await tx.wait();

                if (analytics) {
                    logEvent(analytics, 'token_withdrawn', {
                        amount: amount,
                        token_address: tokenAddress,
                        vault_address: selectedVault.vaultAddress
                    });
                }
            }

            // Refresh the balance
            const newBalance = await getEthBalance(selectedVault);
            setBalance(newBalance);
        } catch (error) {
            console.error("Withdrawal error:", error);
            alert("Error making withdrawal. Please check the console for details.");
        }
    };

    const handleEmergencyWithdraw = async () => {
        if (!isConnected || !address || !walletProvider) {
            alert("Please connect your wallet first.");
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert("Please enter a valid amount to withdraw.");
            return;
        }

        if (depositType === "Token" && !tokenAddress) {
            alert("Please enter a token address.");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(walletProvider);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(selectedVault.vaultAddress, createvaultwithsafetyABI, signer);

            if (depositType === "ETH") {
                // Reset unlock time first
                const resetTx = await contract.resetUnlockTime(0);
                await resetTx.wait();

                // Then withdraw
                const withdrawTx = await contract.withdrawETHFromVault(ethers.parseEther(amount));
                await withdrawTx.wait();

                if (analytics) {
                    logEvent(analytics, 'emergency_eth_withdrawn', {
                        amount: amount,
                        vault_address: selectedVault.vaultAddress
                    });
                }
            } else {
                const erc20ABI = ["function decimals() view returns (uint8)"];
                const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);
                const decimals = await tokenContract.decimals();
                const tokenAmount = ethers.parseUnits(amount, decimals);

                // Reset unlock time first
                const resetTx = await contract.resetUnlockTime(0);
                await resetTx.wait();

                // Then withdraw tokens
                const withdrawTx = await contract.withdrawTokens(tokenAddress, tokenAmount);
                await withdrawTx.wait();

                if (analytics) {
                    logEvent(analytics, 'emergency_token_withdrawn', {
                        amount: amount,
                        token_address: tokenAddress,
                        vault_address: selectedVault.vaultAddress
                    });
                }
            }

            // Refresh the balance
            const newBalance = await getEthBalance(selectedVault);
            setBalance(newBalance);
        } catch (error) {
            console.error("Emergency withdrawal error:", error);
            alert("Error making emergency withdrawal. Please check the console for details.");
        }
    };

    const handleClick = () => {
        setSelectedVault(null); // Reset the selected vault
    };

    const hideText = () => {
        setShowText((prev) => !prev);
    };

    return (
        <div>
            <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Your Vaults:</h2>
            <br />
            {showText && (
                <h3 id="details-text" style={{ fontSize: "20px", marginBottom: "20px" }}>
                    Click the address for details and deposits + withdraws
                </h3>
            )}
            {selectedVault ? (
                <div>
                    <h3 style={{ fontSize: "20px", marginBottom: "15px" }}>Vault Details</h3>
                    <p><strong>Vault ID:</strong> {selectedVault.vaultAddress}</p>
                    <p><strong>Lock Period:</strong> {selectedVault.unlockTime} days</p>
                    <p><strong>Balance:</strong> {balance !== null ? `${balance} ETH` : "Loading..."}</p> 
                    <p><strong>Vault Type:</strong> {selectedVault.vaultTypeName || "Unknown"}</p>

                    {/* Input Section */}
                    <div style={{ marginTop: "20px", padding: "15px", background: "#111", borderRadius: "8px" }}>
                        <h4 style={{ marginBottom: "10px" }}>Deposit / Withdraw</h4>
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ marginRight: "10px" }}>
                                <input
                                    type="radio"
                                    value="ETH"
                                    checked={depositType === "ETH"}
                                    onChange={(e) => setDepositType(e.target.value)}
                                    style={{ marginRight: "5px" }}
                                />
                                ETH
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="Token"
                                    checked={depositType === "Token"}
                                    onChange={(e) => setDepositType(e.target.value)}
                                    style={{ marginRight: "5px" }}
                                />
                                Token
                            </label>
                        </div>

                        {depositType === "Token" && (
                            <div style={{ marginBottom: "20px" }}>
                                <input
                                    type="text"
                                    value={tokenAddress}
                                    onChange={(e) => setTokenAddress(e.target.value)}
                                    placeholder="Token Address"
                                    style={{
                                        padding: "8px",
                                        marginRight: "10px",
                                        borderRadius: "4px",
                                        border: "1px solid #ccc"
                                    }}
                                />
                            </div>
                        )}

                        <div style={{ marginBottom: "20px" }}>
                            <input
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder={`Amount in ${depositType}`}
                                style={{
                                    padding: "8px",
                                    marginRight: "10px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc"
                                }}
                            />
                        </div>

                        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                            <button
                                onClick={handleDeposit}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}
                            >
                                Deposit
                            </button>

                            <button
                                onClick={handleWithdraw}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#f44336",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}
                            >
                                Withdraw
                            </button>

                            <button
                                onClick={handleClick}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#2196F3",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}
                            >
                                Back
                            </button>
                        </div>
                    </div>

                    <br />
                    <br />
                    {selectedVault.vaultTypeName === "createVaultWithSafety" && (
                                <button 
                            onClick={handleEmergencyWithdraw} 
                            style={{
                                backgroundColor: "red",
                                color: "#000",
                                padding: "12px 20px",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "16px",
                                fontWeight: "bold",
                            }}
                        >
                            Emergency Withdraw From Contract
                        </button> 
                        )}
                </div>
            ) : (
                vaults.length > 0 ? (
                    <div className="table-responsive">
                    <table
                        className="table custom-table" 
                    >
                        <thead>
                            <tr style={{ 
                                background: "linear-gradient(90deg, #3273DC, #3BB28E)",
                                color: "#ffffff"
                            }}>
                                <th style={{ padding: "12px", border: "1px solid #444", textAlign: "left" }}>Vault ID</th>
                                <th style={{ padding: "12px", border: "1px solid #444", textAlign: "left" }}>Lock Period</th>
                                <th style={{ padding: "12px", border: "1px solid #444", textAlign: "left" }}>Vault Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vaults.map((vault, index) => (
                                <tr 
                                    key={vault.id} 
                                    style={{ backgroundColor: index % 2 === 0 ? "#222" : "#333", color: "#ffffff", cursor: "pointer" }}
                                    onClick={() => {
                                    setSelectedVault(vault);
                                    hideText();
                                    }}
                                >
                                    <td style={{ padding: "12px", border: "1px solid #444", textDecoration: "underline", color: "#3BB28E" }}>
                                        {vault.vaultAddress.substring(0, 6)}...{vault.vaultAddress.slice(-4)}
                                    </td>
                                    <td style={{ padding: "12px", border: "1px solid #444" }}>{vault.unlockTime} days</td>
                                    <td style={{ padding: "12px", border: "1px solid #444" }}>
                                        {vault.vaultTypeName || "Unknown"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   <Link className="btn btn-primary" href="/create">Create A New Vault</Link>
                   </div>
                ) : (
                    <section>
                    <p>No vaults found.</p>
                    <br />
                    <Link className="btn btn-primary" href="/create">Create Your First Vault</Link>
                    </section>
                )
            )}
        </div>
    );
};

const NotPaidWhiteLabelSection = ({ addToWhiteList }: { addToWhiteList: () => void }) => (


    <button className="btn btn-primary" onClick={addToWhiteList}>
        Pay One Time Fee Of 0.0014 ETH
    </button>
    
);

const Main = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [vaults, setVaults] = useState<any[]>([]); // Store vault data
    const [displayMessage, setDisplayMessage] = useState<string>("Login To View your vaults below");
    const [hasPaidWhiteLabel, setHasPaidWhiteLabel] = useState<boolean | null>(null);
    const { address, isConnected } = useAppKitAccount(); // Hook to access account data and connection status
    const { walletProvider } = useAppKitProvider<Eip1193Provider>("eip155");
    const [analytics, setAnalytics] = useState<Analytics | null>(null);

  // Fetch analytics safely
  useEffect(() => {
    const fetchAnalytics = async () => {
      const instance = await getAnalyticsInstance();
      if (instance) setAnalytics(instance);
    };

    fetchAnalytics();
  }, []);

const getEthBalance = useCallback(async (vault: { vaultAddress: string; vaultTypeName?: string }) => {
    try {
        if (!walletProvider) {
            console.error("No wallet provider available");
            return "0";
        }

        // Create a proper ethers provider
        const provider = new BrowserProvider(walletProvider);
        const balance = await provider.getBalance(vault.vaultAddress);
        return ethers.formatEther(balance);
    } catch (error) {
        console.error("Error getting vault balance:", error);
        return "0";
    }
}, [walletProvider]);

const fetchVaults = useCallback(async (userAddress: string) => {
    if (!userAddress) {
        console.log("No user address provided");
        setVaults([]);
        return;
    }

    try {
        console.log("Fetching vaults for address:", userAddress);
        const vaultsRef = collection(db, "vaults");
        
        // Convert address to lowercase for consistent comparison
        const normalizedAddress = userAddress.toLowerCase();
        console.log("Normalized address for query:", normalizedAddress);
        
        const q = query(
            vaultsRef,
            where("owner", "==", normalizedAddress)
        );

        console.log("Executing Firestore query...");
        const querySnapshot = await getDocs(q);
        console.log("Query completed. Documents found:", querySnapshot.size);

        const userVaults = [];
        
        for (const doc of querySnapshot.docs) {
            const data = doc.data();
            console.log("Processing vault document:", doc.id, data);
            
            try {
                // Get the vault balance with proper typing
                const balance = await getEthBalance({
                    vaultAddress: data.vaultAddress,
                    vaultTypeName: data.vaultTypeName
                });
                console.log("Vault balance fetched:", balance, "for vault:", data.vaultAddress);
                
                userVaults.push({
                    id: doc.id,
                    ...data,
                    balance,
                    vaultAddress: data.vaultAddress,
                    vaultTypeName: data.vaultTypeName,
                    unlockTime: data.unlockTime,
                    owner: data.owner,
                    network: data.network
                });
            } catch (balanceError) {
                console.error("Error fetching balance for vault:", data.vaultAddress, balanceError);
                // Still include the vault but with 0 balance
                userVaults.push({
                    id: doc.id,
                    ...data,
                    balance: "0",
                    vaultAddress: data.vaultAddress,
                    vaultTypeName: data.vaultTypeName,
                    unlockTime: data.unlockTime,
                    owner: data.owner,
                    network: data.network
                });
            }
        }

        console.log("Final processed vaults:", userVaults);
        setVaults(userVaults);

        if (analytics) {
            logEvent(analytics, 'vaults_fetched', {
                user_address: normalizedAddress,
                vault_count: userVaults.length
            });
        }
    } catch (error) {
        console.error("Error fetching vaults:", error);
        if (error instanceof Error) {
            console.error("Error details:", {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
        }
        setVaults([]);
    }
}, [analytics, getEthBalance]);



const checkVaultStatus = useCallback(async () => {
    if (!walletProvider || !address) return;
    
    try {
        const provider = new ethers.BrowserProvider(walletProvider);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const result = await contract.searchWhiteList(address);
        setHasPaidWhiteLabel(!!result);
        setDisplayMessage(!!result ? "View your vaults below" : "Pay A One Off Fee Of 0.0014 ETH To Create Your First Vault");

        if (result) {
            await fetchVaults(address);
        }
    } catch (error) {
        console.error("Error checking vault status:", error);
    }
}, [address, fetchVaults]);

useEffect(() => {
    if (isConnected && address && walletProvider) {
        checkVaultStatus();
    } else {
        setHasPaidWhiteLabel(null);
        setVaults([]);
        setDisplayMessage("Login To View your vaults below");
    }
}, [isConnected, address, walletProvider, checkVaultStatus]);

const addToWhiteList = async () => {
    if (!isConnected || !address || !walletProvider) {
        alert("Please connect your wallet first.");
        return;
    }

    try {
        const provider = new ethers.BrowserProvider(walletProvider);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const tx = await contract.addWhiteList(address, {
            value: ethers.parseEther("0.0014"),
        });
        await tx.wait();

        setHasPaidWhiteLabel(true);
        setDisplayMessage("Added to whitelist successfully! View your vaults below.");
        await fetchVaults(address);

        if (analytics) {
            logEvent(analytics, 'whitelist_added', {
                user_address: address
            });
        }
    } catch (error) {
        console.error("Error adding to whitelist:", error);
        alert("Error adding to whitelist. Please check the console for details.");
    }
};

    return (
        <section
            className="hero hero__blockchain pos-rel bg_img"
            style={{ backgroundImage: `url(assets/img/bg/blockchain_hero_bg.png)` }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="blockchain-hero__content">
                            <h1 className="title text-80 mb-35 -tracking-2/4">{displayMessage}</h1>
                            <p className="mb-50 text-20 leading-30">
                                Store your crypto in a locked vault of up to 1,000 days
                                <br /> No more paper hands or emotional sells.
                            </p>

                            {hasPaidWhiteLabel === true ? (
                                <HasPaidWhiteLabelSection vaults={vaults} getEthBalance={getEthBalance} analytics={analytics} />
                            ) : hasPaidWhiteLabel === false ? (
                                <NotPaidWhiteLabelSection addToWhiteList={addToWhiteList} />
                            ) : (
                <Link className="blc-btn blc-btn--white" href="#" onClick={(e) => {
    e.preventDefault(); // Ensures no unwanted navigation
    console.log("🔄 Clicking Login button...");

    try {
        if (isConnected) {
            console.log("✅ Wallet already connected:", address);
        } else {
            console.log("🔄 Opening WalletConnect modal...");
            open(); // Opens WalletConnect
        }
    } catch (error) {
        console.error("❌ Error opening WalletConnect:", error);
    }
}}>
    {isConnected ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}` : "Login"}
                </Link>


                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;
