"use client";

import { BrowserProvider, ethers } from "ethers";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore"; // Firestore retrieval
import { whiteListABI, whiteListAddress, createVaultABI, createVaultWithSafetyABI, timeDecayCreateVaultABI} from "../../../web3/constants";
import { db } from "@/lib/firebase"; // Firestore reference
import { Analytics } from "firebase/analytics";
import Link from "next/link";
import { useCallback } from "react";

const contractABI = whiteListABI.abi;
const contractAddress = whiteListAddress;
const createvaultABI = createVaultABI.abi;
const createvaultwithsafetyABI = createVaultWithSafetyABI.abi;
const timedecaycreatevaultABI = timeDecayCreateVaultABI.abi;


const HasPaidWhiteLabelSection = ({ vaults, getEthBalance }: { vaults: any[], getEthBalance: Function }) => {
    const [selectedVault, setSelectedVault] = useState<any | null>(null);
    const [depositType, setDepositType] = useState<string>("ETH");
    const [amount, setAmount] = useState<string>("");
    const [tokenAddress, setTokenAddress] = useState<string>("");
    const [balance, setBalance] = useState<string | null>(null);
    const [showText, setShowText] = useState(true);

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
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        alert("Please enter a valid amount to deposit.");
        return;
    }

    if (depositType === "Token" && !tokenAddress) {
        alert("Please enter a token address.");
        return;
    }

    console.log(`Depositing ${amount} ${depositType === "ETH" ? "ETH" : `Token ${tokenAddress}`} to Vault`);
    console.log(`Vault Name ${selectedVault.vaultTypeName}`);
    console.log(selectedVault);

    
        try {
            if (window.ethereum) {
                console.log("Preparing to send tx");
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                let contract;
                if (selectedVault.vaultTypeName === "createVault") {
                contract = new ethers.Contract(selectedVault.vaultAddress, createvaultABI, signer);
                } else if (selectedVault.vaultTypeName === "createVaultWithSafety") {
                contract = new ethers.Contract(selectedVault.vaultAddress, createvaultwithsafetyABI, signer);
                } else {
                contract = new ethers.Contract(selectedVault.vaultAddress, timedecaycreatevaultABI, signer);
                }
                console.log("Contract Instance Created");

                if (depositType === "ETH") {
                    console.log("Tx Sending");
                    const owner = await contract.getOwner();
                    console.log(owner);
                    const tx = await contract.depositETHToVault({
                        value: ethers.parseEther(amount.toString()),
                    });
                    console.log("ETH Deposit successful:", tx);
                    await tx.wait();
                } else {
                    // ✅ Correct ERC-20 ABI
                    const erc20ABI = [
                        "function approve(address spender, uint256 amount) returns (bool)",
                        "function allowance(address owner, address spender) view returns (uint256)",
                        "function decimals() view returns (uint8)" // ✅ Ensure decimals() is included
                    ];

                    // ✅ Initialize token contract **before calling decimals**
                    const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);

                    // ✅ Fetch token decimals dynamically
                    const decimals = await tokenContract.decimals();
                    console.log(`Token Decimals: ${decimals}`);

                    // ✅ Convert user input to token format
                    const Tokenamount = ethers.parseUnits(amount.toString(), decimals);
                    console.log(`Raw Token Amount (wei): ${Tokenamount.toString()}`);

                    // ✅ Allowance Check
                    const ownerAddress = await signer.getAddress();
                    const spenderAddress = contract.target;

                    const allowance = await tokenContract.allowance(ownerAddress, spenderAddress);
                    console.log(`Current allowance: ${ethers.formatUnits(allowance, decimals)} tokens`);

                    // ✅ Only request approval if allowance is insufficient
                    if (BigInt(allowance) < BigInt(Tokenamount)) {
                        console.log(`Insufficient allowance. Requesting approval for ${ethers.formatUnits(Tokenamount, decimals)} tokens...`);

                        // ✅ Send approval transaction
                        const approvalTx = await tokenContract.approve(spenderAddress, Tokenamount);
                        console.log("Approval transaction sent:", approvalTx.hash);
                        await approvalTx.wait();
                        console.log("Approval confirmed!");
                    } else {
                        console.log("Already approved. Proceeding with deposit.");
                    }

                    // ✅ Deposit Token After Approval
                    const depositTx = await contract.depositTokenToVault(tokenAddress, Tokenamount);
                    console.log("Token Deposit successful:", depositTx);
                    await depositTx.wait();
                }
            }
        } catch (error) {
            console.error("Deposit error:", error);
        }
    
};



const handleWithdraw = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        alert("Please enter a valid amount to withdraw.");
        return;
    }

    if (depositType === "Token" && !tokenAddress) {
        alert("Please enter a token address.");
        return;
    }

    console.log(`Withdrawing ${amount} ${depositType === "ETH" ? "ETH" : `Token ${tokenAddress}`} from Vault`);
    console.log(`Vault Name ${selectedVault.vaultTypeName}`);
    console.log(selectedVault);

    try {
        if (window.ethereum) {
            console.log("Preparing to send withdrawal transaction");
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            let contract;
            if (selectedVault.vaultTypeName === "createVault") {
                contract = new ethers.Contract(selectedVault.vaultAddress, createvaultABI, signer);
            } else if (selectedVault.vaultTypeName === "createVaultWithSafety") {
                contract = new ethers.Contract(selectedVault.vaultAddress, createvaultwithsafetyABI, signer);
            } else {
                contract = new ethers.Contract(selectedVault.vaultAddress, timedecaycreatevaultABI, signer);
            }
            console.log("Contract Instance Created");

            if (depositType === "ETH") {
                console.log("Sending ETH withdrawal request");
                const tx = await contract.withdrawETHFromVault(ethers.parseEther(amount.toString()));
                console.log("ETH Withdrawal successful:", tx);
                await tx.wait();
            } else {
                // ✅ Correct ERC-20 ABI
                const erc20ABI = [
                    "function balanceOf(address owner) view returns (uint256)",
                    "function decimals() view returns (uint8)"
                ];

                // ✅ Initialize token contract
                const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);

                // ✅ Fetch token decimals dynamically
                const decimals = await tokenContract.decimals();
                console.log(`Token Decimals: ${decimals}`);

                // ✅ Convert user input to token format
                const Tokenamount = ethers.parseUnits(amount.toString(), decimals);
                console.log(`Raw Token Amount (wei): ${Tokenamount.toString()}`);

                // ✅ Withdrawal Transaction
                const withdrawTx = await contract.withdrawTokens(tokenAddress, Tokenamount);
                console.log("Token Withdrawal successful:", withdrawTx);
                await withdrawTx.wait();
            }
        }
    } catch (error) {
        console.error("Withdrawal error:", error);
    }
};



const handleEmergencyWithdraw = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        alert("Please enter a valid amount to withdraw.");
        return;
    }

    if (depositType === "Token" && !tokenAddress) {
        alert("Please enter a token address.");
        return;
    }

    console.log(`Withdrawing ${amount} ${depositType === "ETH" ? "ETH" : `Token ${tokenAddress}`} from Vault`);
    console.log(`Vault Name ${selectedVault.vaultTypeName}`);
    console.log(selectedVault);

    try {
        if (window.ethereum) {
            console.log("Preparing to send withdrawal transaction");
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            let contract = new ethers.Contract(selectedVault.vaultAddress, createvaultwithsafetyABI, signer);

            console.log("Contract Instance Created");

            if (depositType === "ETH") {
                console.log("Resetting withdrawal time");
                const ResetdepositTimetx = await contract.resetUnlockTime(0);
                await ResetdepositTimetx.wait();
                const getResettime = await contract.getUnlockTime();
                console.log(`New unlock time is ,${getResettime}`)
                console.log("Sending ETH withdrawal request");
                const tx = await contract.withdrawETHFromVault(ethers.parseEther(amount.toString()));
                console.log("ETH Withdrawal successful:", tx);
                await tx.wait();
            } else {
                // ✅ Correct ERC-20 ABI
                const erc20ABI = [
                    "function balanceOf(address owner) view returns (uint256)",
                    "function decimals() view returns (uint8)"
                ];

                // ✅ Initialize token contract
                const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);

                // ✅ Fetch token decimals dynamically
                const decimals = await tokenContract.decimals();
                console.log(`Token Decimals: ${decimals}`);

                // ✅ Convert user input to token format
                const Tokenamount = ethers.parseUnits(amount.toString(), decimals);
                console.log(`Raw Token Amount (wei): ${Tokenamount.toString()}`);
                console.log("Resetting withdrawal time");
                const ResetdepositTimetx = await contract.resetUnlockTime(0);
                await ResetdepositTimetx.wait();
                const getResettime = await contract.getUnlockTime();
                console.log(`New unlock time is ,${getResettime}`)
                console.log("Sending ETH withdrawal request");
                
                // ✅ Withdrawal Transaction
                const withdrawTx = await contract.withdrawTokens(tokenAddress, Tokenamount);
                console.log("Token Withdrawal successful:", withdrawTx);
                await withdrawTx.wait();

            }
        }
    } catch (error) {
        console.error("Withdrawal error:", error);
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
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <select
                                value={depositType}
                                onChange={(e) => setDepositType(e.target.value)}
                                style={{
                                    padding: "10px",
                                    backgroundColor: "#222",
                                    color: "#ffffff",
                                    borderRadius: "5px",
                                    border: "1px solid #444",
                                    fontSize: "16px",
                                }}
                            >
                                <option value="ETH">ETH</option>
                                <option value="Token">Token</option>
                            </select>

                            <input
                                type="number"
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                style={{
                                    padding: "10px",
                                    width: "120px",
                                    backgroundColor: "#222",
                                    color: "#ffffff",
                                    borderRadius: "5px",
                                    border: "1px solid #444",
                                    fontSize: "16px",
                                }}
                            />

                            {depositType === "Token" && (
                                <input
                                    type="text"
                                    placeholder="Token Address"
                                    value={tokenAddress}
                                    onChange={(e) => setTokenAddress(e.target.value)}
                                    style={{
                                        padding: "10px",
                                        width: "220px",
                                        backgroundColor: "#222",
                                        color: "#ffffff",
                                        borderRadius: "5px",
                                        border: "1px solid #444",
                                        fontSize: "16px",
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Withdraw & Back Buttons */}
                    <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>


                             <button 
                                onClick={handleDeposit} 
                                style={{
                                    backgroundColor: "#3273DC",
                                    color: "#ffffff",
                                    padding: "12px 20px",
                                    border: "none",
                                    borderRadius: "5px",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    transition: "background 0.3s",
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#285bb5"}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#3273DC"}
                            >
                                Deposit To Contract
                            </button>

                            <button 
                            onClick={handleWithdraw} 
                            style={{
                                backgroundColor: "#ffcc00",
                                color: "#000",
                                padding: "12px 20px",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                transition: "background 0.3s",
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e6b800"}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ffcc00"}
                        >
                            Withdraw From Contract
                        </button>

                        <button 
                            onClick={() => {
                            handleClick();
                            hideText();
                            }}
                            style={{
                                backgroundColor: "#666",
                                color: "#ffffff",
                                padding: "12px 20px",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "16px",
                                cursor: "pointer",
                                transition: "background 0.3s",
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#555"}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#666"}
                        >
                            Back To Vaults
                        </button>
                        
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
                    <div>
                    <table
                        className="table custom-table" 
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            border: "1px solid #444", 
                            color: "#ffffff", 
                            backgroundColor: "#111"
                        }}
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
                                        {vault.vaultAddress}
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

const getEthBalance = useCallback(async (selectedVault: { vaultTypeName: string; vaultAddress: string }) => {
    try {
        if (!window.ethereum) {
            console.error("Ethereum provider not found");
            return "N/A";
        }

        const localProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await localProvider.getSigner();

        let contract;
        if (selectedVault.vaultTypeName === "createVault") {
            contract = new ethers.Contract(selectedVault.vaultAddress, createvaultABI, signer);
        } else if (selectedVault.vaultTypeName === "createVaultWithSafety") {
            contract = new ethers.Contract(selectedVault.vaultAddress, createvaultwithsafetyABI, signer);
        } else {
            contract = new ethers.Contract(selectedVault.vaultAddress, timedecaycreatevaultABI, signer);
        }

        const balance = await contract.getBalanceOfETH();
        const formattedBalance = ethers.formatEther(balance);

        console.log(`ETH Balance for vault (${selectedVault.vaultTypeName}): ${formattedBalance} ETH`);
        return formattedBalance;
    } catch (error) {
        console.error("Error fetching ETH balance:", error);
        return "N/A";
    }
}, []);


const fetchVaults = useCallback(async (userAddress: string) => {
    try {
        const vaultsRef = collection(db, "user_wallet", userAddress, "vaults");
        const querySnapshot = await getDocs(vaultsRef);

        if (querySnapshot.empty) {
            console.log("No vaults found for this user.");
            setVaults([]);
            return;
        }

        let userVaults = querySnapshot.docs.map(doc => {
            const vaultData = doc.data();
            return {
                id: doc.id,
                vaultAddress: vaultData.vaultAddress || "", 
                vaultTypeName: vaultData.vaultTypeName || "Unknown", 
                unlockTime: vaultData.unlockTime || 0, 
            };
        });

        console.log("Retrieved Vaults:", userVaults);

        const balances = await Promise.all(
            userVaults.map(async (vault) => {
                if (vault.vaultAddress && vault.vaultTypeName) {
                    const balance = await getEthBalance(vault);
                    return { ...vault, balance };
                } else {
                    return { ...vault, balance: "N/A" };
                }
            })
        );

        console.log("Updated Vaults with Balances:", balances);
        setVaults(balances);
    } catch (error) {
        console.error("Error fetching vaults:", error);
    }
}, [getEthBalance]);



const checkVaultStatus = useCallback(async (provider: ethers.BrowserProvider) => {
    try {
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address); // Store connected account

        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const result = await contract.searchWhiteList(address);
        setHasPaidWhiteLabel(!!result);

        setDisplayMessage(!!result ? "View your vaults below" : "Pay A One Off Fee Of 0.0014 ETH To Create Your First Vault");

        if (result) {
            await fetchVaults(address); // Fetch vaults if the user is whitelisted
        }
    } catch (error) {
        console.error("Error checking vault status:", error);
    }
}, [fetchVaults]);

const autoConnectToMetaMask = useCallback(async () => {
    try {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_accounts", []);
            if (accounts.length > 0) {
                setAccount(accounts[0]);
                await checkVaultStatus(provider);
            } else {
                setDisplayMessage("Login To View your vaults below");
            }
        }
    } catch (error) {
        console.error("Error automatically connecting to MetaMask:", error);
        setDisplayMessage("Login To View your vaults below");
    }
}, [checkVaultStatus]); 

useEffect(() => {
    const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length > 0 && window.ethereum) {
            setAccount(accounts[0]);
            const provider = new ethers.BrowserProvider(window.ethereum);
            await checkVaultStatus(provider);
        } else {
            setAccount(null);
            setHasPaidWhiteLabel(null);
            setVaults([]); // Clear vaults if the user disconnects
            setDisplayMessage("Login To View your vaults below");
        }
    };

    if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.on?.("accountsChanged", handleAccountsChanged);
        autoConnectToMetaMask();

        return () => {
            window.ethereum?.removeListener?.("accountsChanged", handleAccountsChanged);
        };
    }
}, [autoConnectToMetaMask, checkVaultStatus]); 



    const addToWhiteList = async () => {
        try {
            if (!account) {
                alert("Please connect your wallet first.");
                return;
            }
            if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Add user to whitelist and pay 0.0014 ETH
            await contract.addWhiteList(await signer.getAddress(), {
                value: ethers.parseEther("0.0014"),
            });

            setHasPaidWhiteLabel(true); // Update white label status
            setDisplayMessage("Vault created successfully! View your vaults below.");
            console.log("Vault created successfully");

            // Fetch vaults after user is added to whitelist
            await fetchVaults(account);
        }
        } catch (error) {
            console.error("Error creating vault:", error);
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
                                <HasPaidWhiteLabelSection vaults={vaults} getEthBalance={getEthBalance} />
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
