"use client";
import Image from "next/image";
import Link from "next/link";
import MobileMenus from "./MobileMenu";

import logo from "/public/New_Logo.png"
import HeaderSidebar from "./HeaderSidebar";


const Sidebar = ({ isActive, setIsActive, Sidebar, style_1, style_2 }: any) => {

    return (
        <>
            <aside className={`slide-bar ${Sidebar} ${isActive ? "show" : ""}`}>
                <div className="close-mobile-menu">
                    <a onClick={() => setIsActive(false)} className="tx-close" style={{ cursor: "pointer" }}></a>
                </div>
                <nav className="side-mobile-menu">
                    <Link className="header__logo mb-30" href="#!">
                        <Image src={logo} alt="Logo" width={150} height={50} />
                    </Link>
                    <div className="header-mobile-search">
                        <form role="search" method="get" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" placeholder="Search Keywords" />
                            <button type="submit"><i className="ti-search"></i></button>
                        </form>
                    </div>
                    <HeaderSidebar setIsActive={setIsActive} /> : <MobileMenus setIsActive={setIsActive} />
                </nav>
            </aside>
            <div onClick={() => setIsActive(false)} className={`body-overlay ${isActive ? "active" : ""}`}></div>
        </>
    )
}

export default Sidebar