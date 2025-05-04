import { StaticImageData } from "next/image";

import thumb_2 from "@/assets/img/team/Untitled design.png"
import thumb_3 from "@/assets/img/team/Man Shadow.png"

import home_3thumb_1 from "@/assets/img/team/img_01.png"
import home_3thumb_2 from "@/assets/img/team/img_02.png"
import home_3thumb_3 from "@/assets/img/team/img_03.png"
import home_3thumb_4 from "@/assets/img/team/img_04.png"

interface DataType {
   id: number;
   page: string;
   title: string;
   designation: string;
}[];

const security_data: DataType[] = [
      {
      id: 1,
      page: "home_1",
      title: "You Own Your Smart Contract",
      designation: "With our system, you own your wallet/smart contract to ensure safety",
   },
         {
      id: 2,
      page: "home_1",
      title: "Your Funds Are Never Held By Us",
      designation: "The funds are never held by us or a third party",
   },
         {
      id: 3,
      page: "home_1",
      title: "Your Funds Are Never Pooled",
      designation: "We do not pool funds for staking etc so your funds are never at risk",
   },
         {
      id: 4,
      page: "home_1",
      title: "We Are Planning On Getting Full Audits",
      designation: "The smart contracts will be fully audited by reputable auditors",
   },

];

export default security_data;