"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import NavMenu from "./Menu/NavMenu";
import Sidebar from "./Menu/Sidebar";
import UseSticky from "@/component/hooks/UseSticky";
import logo_1 from "@/assets/img/logo/c24f83f8-814e-4d43-912e-4adc6154a01b.png";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react"; // Import the correct hooks

const Header = () => {
    const { sticky } = UseSticky();
    const [isActive, setIsActive] = useState(false);
    const { open, close } = useAppKit(); // Hook to control the modal
    const { address, isConnected } = useAppKitAccount(); // Hook to access account data and connection status
    const [isAppKitReady, setIsAppKitReady] = useState(false);
    
    let appKit;

    try {
        appKit = useAppKit(); // Catch error if called too soon
    } catch (error) {
        console.warn("AppKit not ready yet.");
    }

    useEffect(() => {
        setIsAppKitReady(true);
    }, []);

    if (!isAppKitReady || !appKit) return null; // Prevents useAppKit error

    const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (isConnected) {
            // Logic to disconnect the wallet
            // You may need to implement this based on Reown's AppKit capabilities
        } else {
            open(); // Open the wallet connection modal
        }
    };

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
                                        onClick={handleButtonClick}
                                    >
                                        <span>
                                            <i className="fas fa-user"></i>
                                            {isConnected && address
                                                ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
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
