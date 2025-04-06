"use client";

import { ethers, Eip1193Provider } from "ethers";
import { useState, useEffect, useCallback, useMemo } from "react";
import { vaultdeployerABI, vaultdeployerAddress, whiteListABI, whiteListAddress } from "../../../web3/constants";
import { db } from "@/lib/firebase"; // Import Firestore instance
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore functions
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import Next.js router
import "@/assets/css/main.css"; // Import your global styles
import { logEvent, Analytics } from "firebase/analytics";
import { getAnalyticsInstance } from "@/lib/firebase"; // Import the new getter function
import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit/react"; // Import the correct hooks
const { open } = useAppKit(); // Opens WalletConnect modal


// Contract ABIs and addresses
const contractABI = whiteListABI.abi;
const contractAddress = whiteListAddress;
const vaultFactoryContractABI = vaultdeployerABI.abi;
const vaultFactoryContractAddress = vaultdeployerAddress;

const HasPaidWhiteLabelSection = ({ createVault, loading }: { createVault: (_vaultduration: number, _vaulttype: number) => Promise<void>, loading: boolean }) => {
    const [selectedDuration, setSelectedDuration] = useState<number | string>(30); // Default 30 days
    const [customDuration, setCustomDuration] = useState<number | null>(null);
    
    const [selectedType, setSelectedType] = useState<number>(1); // Default Locked Vault

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Use custom input if "Custom" is selected
        const duration = selectedDuration === "custom" && customDuration ? customDuration : Number(selectedDuration);

            console.log(`Attempting To Deploy Contract Type ${selectedType} For ${duration} Days`);

        await createVault(duration, selectedType);

    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Vault Duration Dropdown */}
            <label htmlFor="vault-duration">Select Vault Duration:</label>
            <select 
                id="vault-duration" 
                className="form-control" 
                value={selectedDuration} 
                onChange={(e) => setSelectedDuration(e.target.value)}
            >
                <option value={30}>30 Days</option>
                <option value={60}>60 Days</option>
                <option value={90}>90 Days</option>
                <option value={180}>180 Days</option>
                <option value={365}>365 Days</option>
                <option value="custom">Custom</option> {/* Custom Option */}
            </select>

            {/* Show Custom Input If "Custom" is Selected */}
            {selectedDuration === "custom" && (
                <input 
                    type="number" 
                    className="form-control mt-2"
                    placeholder="Enter custom duration (days)"
                    value={customDuration || ""}
                    onChange={(e) => setCustomDuration(Number(e.target.value))}
                    min={1} // Ensure only positive values
                />
            )}

            <br />

            {/* Vault Type Dropdown */}
            <label htmlFor="vault-type">Select Vault Type:</label>
            <select 
                id="vault-type" 
                className="form-control" 
                value={selectedType} 
                onChange={(e) => setSelectedType(Number(e.target.value))}
            >
                <option value={1}>Locked Vault</option>
                <option value={2}>Locked Vault With Emergency Withdraw</option>
                <option value={3}>Linear Time Decay Locked Vault</option>
            </select>

            <br />

<button type="submit" className="btn btn-primary" disabled={loading}>
    {loading ? <span>Deploying... </span> : "Deploy Your Vault"}
</button>
        </form>
    );
};

// **Payment Section**
const NotPaidWhiteLabelSection = ({ addToWhiteList }: { addToWhiteList: () => void }) => (
    <button className="btn btn-primary" onClick={addToWhiteList}>
        Pay One Time Fee Of 0.0014 ETH
    </button>
);

// **Main Component**
const Main = () => {
    const [loading, setLoading] = useState<boolean>(false); // Track loading state
    const router = useRouter(); // Next.js Router
    const [displayMessage, setDisplayMessage] = useState<string>("Login To View your vaults below");
    const [hasPaidWhiteLabel, setHasPaidWhiteLabel] = useState<boolean | null>(null);
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    const { walletProvider } = useAppKitProvider<Eip1193Provider>('eip155');
    const { open } = useAppKit(); // Opens WalletConnect modal
    const { address, isConnected } = useAppKitAccount(); // Retrieves connected wallet

    const checkVaultStatus = useCallback(async () => {
        if (!walletProvider || !address) return;
        try {
            const provider = new ethers.BrowserProvider(walletProvider);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const result = await contract.searchWhiteList(address);
            setHasPaidWhiteLabel(!!result);
            setDisplayMessage(!!result ? "Choose the duration or set a custom duration alongside the vault type" : "Pay A One Off Fee Of 0.0014 ETH To Create Your First Vault");
        } catch (error) {
            console.error("Error checking vault status:", error);
        }
    }, [walletProvider, address]);

    // Effect to handle connection changes
    useEffect(() => {
        if (isConnected && address && walletProvider) {
            checkVaultStatus();
        } else {
            setHasPaidWhiteLabel(null);
            setDisplayMessage("Login To View your vaults below");
        }
    }, [address, isConnected, walletProvider, checkVaultStatus]);

    // Fetch analytics safely
    useEffect(() => {
        const fetchAnalytics = async () => {
            const instance = await getAnalyticsInstance();
            if (instance) setAnalytics(instance);
        };
        fetchAnalytics();
    }, []);

    const createVault = useCallback(async (_vaultduration: number, _vaulttype: number) => {
        if (!isConnected || !address || !walletProvider) {
            alert("Please connect your wallet first.");
            return;
        }

        setLoading(true); // Start loading spinner

        try {
            const provider = new ethers.BrowserProvider(walletProvider);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(vaultFactoryContractAddress, vaultFactoryContractABI, signer);

            console.log(`Creating vault with duration: ${_vaultduration} days, type: ${_vaulttype}, for address: ${address}`);
            const tx = await contract.deployVault(_vaultduration, _vaulttype, address);
            console.log("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction confirmed:", receipt);

            // Use Interface to decode logs
            const iface = new ethers.Interface(vaultFactoryContractABI);
            let vaultDeployedEvent: ethers.LogDescription | null = null;

            for (const log of receipt.logs) {
                try {
                    const parsedLog = iface.parseLog({
                        topics: log.topics,
                        data: log.data
                    });
                    if (parsedLog && parsedLog.name === "VaultDeployed") {
                        vaultDeployedEvent = parsedLog;
                        break;
                    }
                } catch (err) {
                    continue;
                }
            }

            if (!vaultDeployedEvent) {
                throw new Error("VaultDeployed event not found in transaction logs");
            }

            // Extract data from event
            const [newVaultAddress, vaultTypeName, unlockTimeBigInt] = vaultDeployedEvent.args;
            console.log("New vault deployed!", {
                address: newVaultAddress,
                type: vaultTypeName,
                unlockTime: unlockTimeBigInt.toString()
            });

            // Save to Firestore with correct data structure
            try {
                // First check if the vault already exists
                const vaultRef = doc(db, "vaults", newVaultAddress);
                
                // Log the database reference
                console.log("Firebase config:", {
                    projectId: (db as any)._databaseId?.projectId,
                    databasePath: vaultRef.path
                });

                const vaultData = {
                    vaultAddress: newVaultAddress,
                    owner: address.toLowerCase(),
                    vaultTypeName: _vaulttype === 1 ? "createVault" : 
                                 _vaulttype === 2 ? "createVaultWithSafety" : 
                                 "timeDecayCreateVault",
                    unlockTime: _vaultduration,
                    createdAt: new Date().toISOString(),
                    network: (await provider.getNetwork()).chainId.toString(),
                    lastUpdated: new Date().toISOString()
                };

                console.log("Attempting to save vault data:", JSON.stringify(vaultData, null, 2));
                
                // Try to write to Firestore
                try {
                    await setDoc(vaultRef, vaultData);
                    console.log("✅ Vault data saved successfully to path:", vaultRef.path);
                    
                    // Verify the write
                    const verifyDoc = await getDoc(vaultRef);
                    if (verifyDoc.exists()) {
                        console.log("✅ Verified vault data in Firestore:", verifyDoc.data());
                    } else {
                        console.error("❌ Vault document not found after write!");
                        throw new Error("Vault write verification failed");
                    }
                } catch (writeError) {
                    console.error("❌ Firestore write error:", writeError);
                    if (writeError instanceof Error) {
                        console.error("Write error details:", {
                            name: writeError.name,
                            message: writeError.message,
                            stack: writeError.stack
                        });
                    }
                    throw writeError;
                }

                if (analytics) {
                    logEvent(analytics, 'vault_created', {
                        vault_address: newVaultAddress,
                        vault_type: _vaulttype,
                        duration: _vaultduration,
                        owner: address.toLowerCase()
                    });
                }

                console.log("✅ All vault creation steps completed successfully");
                alert("Vault created successfully!");
                router.push('/vault');
            } catch (error) {
                console.error("❌ Error in vault creation process:", error);
                if (error instanceof Error) {
                    console.error("Error details:", {
                        name: error.name,
                        message: error.message,
                        stack: error.stack
                    });
                }
                alert("Error saving vault data. Please check the console for details.");
            }
        } catch (error) {
            console.error("Error creating vault:", error);
            alert("Error creating vault. Please check the console for details.");
        } finally {
            setLoading(false);
        }
    }, [isConnected, address, walletProvider, analytics, router]);

    const addToWhiteList = useCallback(async () => {
        if (!isConnected || !address || !walletProvider) {
            alert("Please connect your wallet first.");
            return;
        }
        try {
            const provider = new ethers.BrowserProvider(walletProvider);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            await contract.addWhiteList(await signer.getAddress(), {
                value: ethers.parseEther("0.0014"),
            });

            setHasPaidWhiteLabel(true);
            setDisplayMessage("Added to whitelist successfully!");
            console.log("Successfully added to whitelist");
        } catch (error) {
            console.error("Error adding to whitelist:", error);
        }
    }, [isConnected, address, walletProvider]);

    return (
        <section className="hero hero__blockchain pos-rel bg_img" style={{ backgroundImage: `url(assets/img/bg/blockchain_hero_bg.png)` }}>
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
                               <HasPaidWhiteLabelSection createVault={createVault} loading={loading} />
                            ) : hasPaidWhiteLabel === false ? (
                                <NotPaidWhiteLabelSection addToWhiteList={addToWhiteList} />
                            ) : (
                                <Link className="blc-btn blc-btn--white" href="#"onClick={(e) => {
                                e.preventDefault();
                                open();
                                }}
                            >Login</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;
