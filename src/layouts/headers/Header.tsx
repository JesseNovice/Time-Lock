"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import NavMenu from "./Menu/NavMenu";
import Sidebar from "./Menu/Sidebar";
import UseSticky from "@/component/hooks/UseSticky";
import { ethers } from "ethers";
import logo_1 from "@/assets/img/logo/c24f83f8-814e-4d43-912e-4adc6154a01b.png";

const Header = () => {
    const { sticky } = UseSticky();
    const [isActive, setIsActive] = useState<boolean>(false);
    const [account, setAccount] = useState<string | null>(null);

    const autoConnectToMetaMask = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_accounts", []);

                // If MetaMask has accounts connected, set the account
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    localStorage.setItem("connectedAccount", accounts[0]);
                } else {
                    // If no accounts are connected, clear any previously stored account
                    setAccount(null);
                    localStorage.removeItem("connectedAccount");
                }
            }
        } catch (error) {
            console.error("Error automatically connecting to MetaMask:", error);
        }
    };

    useEffect(() => {
        autoConnectToMetaMask();
    }, []);

    const connectToMetaMask = async () => {
        try {
            // If already connected, disconnect
            if (account) {
                setAccount(null);
                localStorage.removeItem("connectedAccount");
                console.log("Disconnected from MetaMask");
                return;
            }

            // Check if MetaMask is installed
            if (window.ethereum == null) {
                alert("MetaMask is not installed. Please install it to connect.");
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            if (accounts.length === 0) {
                alert("No account connected. Please connect your account in MetaMask.");
                return;
            }

            const userAddress = accounts[0];
            setAccount(userAddress);
            localStorage.setItem("connectedAccount", userAddress);
            console.log("Connected account:", userAddress);

            // Switch to the Sepolia network
            const network = await provider.getNetwork();
            if (network.chainId !== BigInt(11155111)) {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: "0xAA36A7" }], // Sepolia chain ID
                });
            }
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    };

useEffect(() => {
    if (typeof window !== "undefined") {
        const ethereum = window.ethereum; // Store ethereum reference

        if (ethereum) {
            const handleAccountsChanged = (accounts: string[]) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    localStorage.setItem("connectedAccount", accounts[0]);
                    console.log("Account changed:", accounts[0]);
                } else {
                    setAccount(null);
                    localStorage.removeItem("connectedAccount");
                    console.log("Disconnected from MetaMask");
                }
            };

            ethereum.on?.("accountsChanged", handleAccountsChanged);

            // Clean up the event listener on unmount
            return () => {
                ethereum.removeListener?.("accountsChanged", handleAccountsChanged);
            };
        }
    }
}, []);


    return (
        <>
            <header className="site-header header--transparent blockchain-header" id="header">
                <div id="sticky-header" className={`header__main-wrap stricky ${sticky ? "sticky-menu" : ""}`}>
                    <div className="container-fluid">
                        <div className="header__main ul_li_between">
                            <div className="header__left ul_li">
                                <div className="header__logo">
                                    <Link href="/">
                                        <Image src={logo_1} alt="Logo" />
                                    </Link>
                                </div>
                            </div>
                            <div className="main-menu__wrap ul_li navbar navbar-expand-lg">
                                <nav className="main-menu collapse navbar-collapse">
                                    <NavMenu />
                                </nav>
                            </div>

                            <div className="header__action ul_li">
                                <div className="d-lg-none">
                                    <a
                                        onClick={() => setIsActive(true)}
                                        className="header__bar hamburger_menu"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="header__bar-icon">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </a>
                                </div>
                                <div className="blockchain-header__account">
                                    <a
                                        className="blc-btn"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            connectToMetaMask();
                                        }}
                                    >
                                        <span>
                                            <i className="fas fa-user"></i>
                                            {account
                                                ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
                                                : "LOGIN"}
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Sidebar isActive={isActive} setIsActive={setIsActive} Sidebar="slide-bar-blockchain" />
        </>
    );
};

export default Header;
