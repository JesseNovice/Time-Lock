import { StaticImageData } from "next/image";

import demo_1 from "@/assets/img/demo/demo-1.jpg"

interface MenuItem {
    id: number;
    page: string;
    title: string;
    link: string;
    has_dropdown: boolean;
    mega_menu?: boolean;
    sub_menus?: {
        link: string;
        title: string;
        demo_pic?: StaticImageData;
    }[];
}[];

const menu_data: MenuItem[] = [

    {
        id: 1,
        page: "home_1",
        has_dropdown: false,
        title: "Home",
        link: "/#",
        mega_menu: false,
        sub_menus: [
            { link: "/", title: "Blockchain", demo_pic: demo_1 },
        ],
    },
    {
        id: 2,
        page: "home_1",
        has_dropdown: false,
        title: "Types Of Vaults",
        link: "/#features",
    },
    {
        id: 3,
        page: "home_1",
        has_dropdown: false,
        title: "Team",
        link: "/#team",
    },
    {
        id: 4,
        page: "home_1",
        has_dropdown: false,
        title: "Roadmap",
        link: "/#roadmap",
    },
        {
        id: 5,
        page: "home_1",
        has_dropdown: false,
        title: "FAQs",
        link: "/#FAQs",
    },
            {
        id: 5,
        page: "home_1",
        has_dropdown: false,
        title: "Dapp",
        link: "/vault",
    },
    


   
];
export default menu_data;
