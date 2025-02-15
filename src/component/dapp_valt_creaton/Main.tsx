"use client";

import { ethers } from "ethers";
import { useState, useEffect, useCallback, useMemo } from "react";
import { vaultdeployerABI, vaultdeployerAddress, whiteListABI, whiteListAddress } from "../../../web3/constants";
import { db } from "@/lib/firebase"; // Import Firestore instance
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions

import { useRouter } from "next/navigation"; // Import Next.js router


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
    {loading ? <span>Deploying... 🔄</span> : "Deploy Your Vault"}
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
    const [account, setAccount] = useState<string | null>(null);
    const [displayMessage, setDisplayMessage] = useState<string>("Login To View your vaults below");
    const [hasPaidWhiteLabel, setHasPaidWhiteLabel] = useState<boolean | null>(null);
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  

    // **Lazy Initialize Provider**
    useEffect(() => {
        if (window.ethereum) {
            setProvider(new ethers.BrowserProvider(window.ethereum));
        }
    }, []);

    const checkVaultStatus = useCallback(async () => {
        if (!provider) return;
        try {
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const result = await contract.searchWhiteList(address);
            setHasPaidWhiteLabel(!!result);

            setDisplayMessage(!!result ? "Choose the duration or set a custom durationg alongside the vault type" : "Pay A One Off Fee Of 0.0014 ETH To Create Your First Vault");
        } catch (error) {
            console.error("Error checking vault status:", error);
        }
    }, [provider]);

    const autoConnectToMetaMask = useCallback(async () => {
        if (!provider) return;
        try {
            const accounts = await provider.send("eth_accounts", []);
            if (accounts.length > 0) {
                setAccount(accounts[0]);
                await checkVaultStatus();
            } else {
                setDisplayMessage("Login To View your vaults below");
            }
        } catch (error) {
            console.error("Error automatically connecting to MetaMask:", error);
            setDisplayMessage("Login To View your vaults below");
        }
    }, [provider, checkVaultStatus]);


const createVault = useCallback(async (_vaultduration: number, _vaulttype: number) => {
    if (!account || !provider) {
        alert("Please connect your wallet first.");
        return;
    }

    setLoading(true); // Start loading spinner

    try {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(vaultFactoryContractAddress, vaultFactoryContractABI, signer);

        // Call contract function to deploy the vault
        const tx = await contract.deployVault(_vaultduration, _vaulttype, account);
        const receipt = await tx.wait(); // Wait for transaction confirmation

        // ✅ Use Interface to decode logs in Ethers v6
        const iface = new ethers.Interface(vaultFactoryContractABI);

        let vaultDeployedEvent: ethers.LogDescription | null = null;
        for (const log of receipt.logs) {
            try {
                const parsedLog = iface.parseLog(log);
                if (parsedLog && parsedLog.name === "VaultDeployed") {
                    vaultDeployedEvent = parsedLog;
                    break;
                }
            } catch (err) {
                continue;
            }
        }

        if (!vaultDeployedEvent) {
            console.error("VaultDeployed event not found in transaction logs.");
            setLoading(false);
            return;
        }

        // 🔹 Convert `BigInt` to `number`
        const args = vaultDeployedEvent.args as unknown as [string, string, BigInt];
        const [newVaultAddress, vaultTypeName, unlockTimeBigInt] = args;
        const unlockTime = Number(unlockTimeBigInt);

        console.log("Vault deployed at:", newVaultAddress);
        console.log("Vault Type Name:", vaultTypeName);
        console.log("Unlock Time:", new Date(unlockTime * 1000).toLocaleString());

    const vaultRef = doc(db, "user_wallet", await signer.getAddress(), "vaults", newVaultAddress);
    await setDoc(vaultRef, {
    signer: await signer.getAddress(),
    vaultAddress: newVaultAddress,
    vaultTypeName: vaultTypeName,
    unlockTime: unlockTime.toString(),
    createdAt: new Date().toISOString(),
});



        console.log("Vault data stored in Firestore.");

        // ✅ Redirect to `/vault`
        router.push("/vault");

    } catch (error) {
        console.error("Error creating vault:", error);
    } finally {
        setLoading(false); // Stop loading spinner
    }
}, [account, provider, router]);

    const addToWhiteList = useCallback(async () => {
        if (!account || !provider) {
            alert("Please connect your wallet first.");
            return;
        }
        try {
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
    }, [account, provider]);

useEffect(() => {
    const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length > 0) {
            setAccount(accounts[0]);
            await checkVaultStatus();
        } else {
            setAccount(null);
            setHasPaidWhiteLabel(null);
            setDisplayMessage("Login To View your vaults below");
            localStorage.removeItem("connectedAccount");
        }
    };

    if (window.ethereum) {
        window.ethereum?.on?.("accountsChanged", handleAccountsChanged);
        autoConnectToMetaMask();

        return () => {
            window.ethereum?.removeListener?.("accountsChanged", handleAccountsChanged);
        };
    }
}, [autoConnectToMetaMask, checkVaultStatus]);


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
                                <p>Checking vault status...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;
