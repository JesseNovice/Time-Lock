"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import menu_data from "@/component/data/MenuData";
import { BrowserProvider, ethers } from "ethers";



const MobileMenus = ({ setIsActive }: any) => {
    const [navTitle, setNavTitle] = useState("");
    const currentRoute = usePathname();

     const [account, setAccount] = useState<string | null>(null);

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

    const isMenuItemActive = (menuLink: any) => {
        return currentRoute === menuLink;
    };

    const isSubMenuItemActive = (subMenuLink: any) => {
        return currentRoute === subMenuLink;
    };

    const closeSidebar = () => {
        setIsActive(false);
    };

    //openMobileMenu
    const openMobileMenu = (menu: any) => {
        if (navTitle === menu) {
            setNavTitle("");
        } else {
            setNavTitle(menu);
        }
    };

    return (
        <>
            <ul id="mobile-menu-active">
                {menu_data.filter((items) => items.page === "home_1").map((menu, i) => (
                    <React.Fragment key={i}>
                        {menu.has_dropdown && (
                            <li onClick={() => openMobileMenu(menu.title)} className={`${menu.has_dropdown ? "dropdown" : ""}`}>
                                <Link href={menu.link}
                                    className={` ${(isMenuItemActive(menu.link) || (menu.sub_menus && menu.sub_menus.some((sub_m) => sub_m.link && isSubMenuItemActive(sub_m.link)))) ? "active" : ""}`}>
                                    <span>{menu.title}</span>
                                </Link>
                                <div
                                    className={`dropdown-btn ${navTitle === menu.title ? "open" : ""}`}
                                    onClick={() => openMobileMenu(menu.title)} >
                                    <i className={`${navTitle === menu.title ? "fas fa-angle-down" : "fas fa-angle-down"}`}></i>
                                </div>
                                {menu.sub_menus && menu.sub_menus.length > 0 && (
                                    <ul className="sub-menu" style={{ display: navTitle === menu.title ? "block" : "none" }}>
                                        {menu.sub_menus.map((sub, index) => (
                                            <li key={index}>
                                                <Link href={sub.link}
                                                    className={sub.link && isSubMenuItemActive(sub.link) ? "active" : ""}>
                                                    {sub.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        )}
                        {!menu.has_dropdown && (
                            <li onClick={closeSidebar} >
                                <Link href={menu.link} className={`${currentRoute === menu.link ? "active" : ""}`}>
                                    {menu.title}
                                </Link>
                            </li>
                        )}
                    </React.Fragment>
                ))}

                {/* ✅ Added Login Button Here */}
                <li>
                    <Link className="blc-btn blc-btn--white"
                    href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            connectToMetaMask(); // Calls your MetaMask login function
                        }}
    style={{
        padding: "10px 18px",
        background: "linear-gradient(black, black) padding-box, linear-gradient(90deg, #3273DC, #3BB28E) border-box",
        fontSize: "14px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        border: "none", // ✅ Remove all borders
        boxShadow: "none", // ✅ Remove any shadow effects
        outline: "none", // ✅ Remove outline highlights
    }}
                    >
                        <i className="fas fa-user"></i>
                        {account
                        ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
                        : "LOGIN"}
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default MobileMenus;
