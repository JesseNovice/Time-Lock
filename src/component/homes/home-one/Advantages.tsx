import Image, { StaticImageData } from "next/image"

import icon_1 from "@/assets/img/icon/badge_active.svg";
import icon_2 from "@/assets/img/icon/badge_deactive.svg";

interface DataType {
   id: number;
   title: string;
   icon: StaticImageData[];
}[];

const advantage_data: DataType[] = [
   {
      id: 1,
      title: "Time Locked Vault",
      icon: [icon_1, icon_2, icon_2, icon_1],
   },
   {
      id: 2,
      title: "Locked Vault With Emergency Withdraw",
      icon: [icon_1, icon_1, icon_2, icon_1],
   },
   {
      id: 3,
      title: "Vesting / Linear Time Locked Vault",
      icon: [icon_1, icon_2, icon_1, icon_1],
   },
]

const Advantages = () => {
   return (
      <section  className="advantages advantages-bg pb-120 pt-100" style={{ backgroundImage: `url(/assets/img/bg/advantages_bg.png)` }}>
         <div className="container">
            <div className="sec-title style2 text-center mb-60">
               <h2 className="sec-title__title text-50 mb-25">See which vault best suits your needs</h2>
            </div>
            <table className="advantages-table table-responsive">
               <thead>
                  <tr>
                     <th>Options</th>
                     <th>Locked For A Fixed Time</th>
                     <th>Emergency Withdraw Function</th>
                     <th>Release Tokens Overtime</th>
                     <th>Accepts ERC-20 & ETH</th>
                  </tr>
               </thead>
               <tbody>
                  {advantage_data.map((item) => (
                     <tr key={item.id}>
                        <td>{item.title}</td>
                        {item.icon.map((icon, i) => (
                           <td key={i}><Image src={icon} alt="" /></td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>
   )
}

export default Advantages
