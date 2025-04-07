import Image from "next/image";

import icon_1 from "@/assets/img/icon/rm_icon.png";

interface DataType {
   id: number;
   title: JSX.Element;
   list: string[];
}[];

const roadmap_data: DataType[] = [
   {
      id: 1,
      title: (<>Stage 1 <br /> Q1 & Q2 - 2025</>),
      list: ["Create beta version of dapp", "Begin testing", "Refine dapp", "Security Audit"],
   },
   {
      id: 2,
      title: (<>Stage 2 <br /> Q2 & Q3 - 2025</>),
      list: ["Mainnet Launch", "Smart Contract Upgrade", "Marketing Begins", "Community Weekly Feedback Sessions", "Roadmap Review"],
   },
   {
      id: 3,
      title: (<>Stage 3 <br /> Q3 & Q4 - 2025</>),
      list: ["Team Expasions", " Potential Network- Sol / BSC"],
   },
   {
      id: 4,
      title: (<>Stage 4 <br /> Q4 - 2025 & Q1 = 2026</>),
      list: [ "To Be Confirmed from Our Community Feedback & Roadmap Reviews"],
   },
]

const Roadmap = () => {
   return (
      <section id="roadmap" className="roadmap pb-20 pt-20 mb-20">
         <div className="container">
            <div className="sec-title style2 text-center mb-60">
               <h2 className="sec-title__title text-50 mb-25">Roadmap</h2>
               <p>We are dedicated to building a purposeful dapp for the community so this roadmap may change to reflect the needs of our users</p>
            </div>
            <div className="roadmap__list pos-rel">
               {roadmap_data.map((item) => (
                  <div key={item.id} className="roadmap__list-box">
                     <div className="roadmap__list-inner">
                        <div className="icon">
                           <Image src={icon_1} alt="" />
                        </div>
                        <h3>{item.title}</h3>
                        <ul className="list-unstyled">
                           {item.list.map((list, i) => (
                              <li key={i}>{list}</li>
                           ))}
                        </ul>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Roadmap
