"use client";
import menu_data from "@/component/data/MenuData";
import Image from "next/image";
import Link from "next/link.js";
import { usePathname } from "next/navigation";

const NavMenu = () => {
    const currentRoute = usePathname();

    const isMenuItemActive = (menuLink: string) => {
        return currentRoute === menuLink;
    };

    const isSubMenuItemActive = (subMenuLink: string) => {
        return currentRoute === subMenuLink;
    };

    return (
        <ul>
            {menu_data.filter((items) => items.page === "home_1").map((menu: any) => (
                <li key={menu.id}
                    className={`${menu.has_dropdown ? "menu-item-has-children" : ""} ${menu.mega_menu ? "has-mega-menu" : ""}`}
                >
                    <Link href={menu.link}
                        className={` ${(isMenuItemActive(menu.link) || (menu.sub_menus && menu.sub_menus.some((sub_m: any) => sub_m.link && isSubMenuItemActive(sub_m.link)))) ? "active" : ""}`}>
                        {menu.title}
                    </Link>

                    {menu.mega_menu && (
                        <>
                            {menu.mega_menu && (
                                <ul className="submenu mega-menu">
                                    <li>
                                        <div className="mega-menu-content mxw_1505">
                                            <div className="row">
                                                {menu.sub_menus.map((sub_m: any, i: any) => (
                                                    <div key={i} className="col col-md-3">
                                                        <div className="demo-pic">
                                                            <Link href={sub_m.link}>
                                                                <Image src={sub_m.demo_pic} alt="" />
                                                            </Link>
                                                        </div>
                                                        <h3>{sub_m.title}</h3>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            )}
                        </>
                    )}

                    {menu.has_dropdown && (
                        <>
                            {menu.sub_menus && (
                                menu.mega_menu ? (
                                    <ul className="submenu mega-menu">
                                        <li>
                                            <div className="mega-menu-content mxw_1505">
                                                <div className="row">
                                                    {menu.sub_menus.map((sub_m: any, i: any) => (
                                                        <div key={i} className="col col-md-3">
                                                            <div className="demo-pic">
                                                                <Link href={sub_m.link}>
                                                                    <Image src={sub_m.demo_pic} alt="" />
                                                                </Link>
                                                            </div>
                                                            <h3>{sub_m.title}</h3>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                ) : (
                                    <ul className="submenu">
                                        {menu.sub_menus.map((sub_m: any, i: any) => (
                                            <li key={i}>
                                                <Link
                                                    href={sub_m.link}
                                                    className={
                                                        sub_m.link && isSubMenuItemActive(sub_m.link) ? "active" : ""}>
                                                    {sub_m.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )
                            )}
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default NavMenu;

