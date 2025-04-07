import Image, { StaticImageData } from "next/image";

import icon_1 from "@/assets/img/icon/up_01.svg";
import icon_2 from "@/assets/img/icon/up_02.svg";
import icon_3 from "@/assets/img/icon/up_02.svg"; // Third unique icon
import middle_icon from "@/assets/img/bg/uo_bg.png";
import check from "@/assets/img/icon/check_badge.svg";

interface DataType {
   id: number;
   title: string;
   icon: StaticImageData;
   list: {
      title: string;
      desc: string;
   }[];
};

const user_option_data: DataType[] = [
   {
      id: 1,
      title: "Time Locked Vault",
      icon: icon_1,
      list: [
          { "title": "Locked Securely", "desc": "Lock away your funds securely for a fixed time." },
          { "title": "Unlocks At A Pre Set Time", "desc": "Choose A Time That Suits You For The VauLt To Be Accessible." },
          { "title": "Perfect For", "desc": "People & Companies Who Want To Keep Funds Locked Away Such As Tax From Trades Or Long Term Holds" },
      ],
   },
   {
      id: 2,
      title: "Flexi Time Locked Vault",
      icon: icon_1,
      list: [
         { title: "Flexible Security", desc: "Lock your funds while keeping an emergency withdrawal option available." },
         { title: "Emergency Withdrawals", desc: "Access your funds early under predefined conditions if needed." },
         { title: "Perfect For", desc: "Traders and investors who want security but need flexibility in case of unexpected financial needs." }
      ],
   },
   {
      id: 3,
      title: "Vesting / Linear Distribution",
      icon: icon_1, 
      list: [
         { title: "Gradual Release", desc: "Funds are distributed over time instead of all at once." },
         { title: "Custom Vesting Schedules", desc: "Set specific timeframes for funds to be unlocked incrementally." },
         { title: "Perfect For", desc: "Companies managing token distributions, employee incentives, or structured investment plans." }
      ],
   },
];

const UserOption = () => {


   return (
      <section className="user-option pb-20 pt-20 mb-20" id="features">
         <div className="container">
            <div className="sec-title style2 text-center mb-20">
               <h2 className="sec-title__title text-50 mb-25">Three Types of Vaults</h2>
               <p>Our dapp is designed for individuals in mind but can be used commercially.</p>
            </div>

<div className="row align-items-center justify-content-center gx-4 gy-4">
   {user_option_data.map((item) => (
<div key={item.id} className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center text-center" style={{ maxWidth: "350px" }}>
   <div className="border rounded p-5 shadow-lg bg-dark">
      <div className="icon pos-rel mb-3">
         <Image src={item.icon} alt={item.title} />
      </div>
      <h3 className="heading">{item.title}</h3>
      <ul className="user-option__list list-unstyled mt-3">
         {item.list.map((list, i) => (
            <li key={i} className="mb-2">
               <span className="me-2"><Image src={check} alt="Check" /></span>
               <h4 className="d-inline">{list.title}</h4>
               <p className="mt-1">{list.desc}</p>
            </li>
         ))}
      </ul>
   </div>
</div>

   ))}
</div>

         </div>
      </section>
   );
};



export default UserOption;
