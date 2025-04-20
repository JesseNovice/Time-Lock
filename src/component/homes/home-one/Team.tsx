import Image from "next/image"

import rating from "@/assets/img/icon/star.svg";
import team_data from "@/component/data/TeamData";

const Team = () => {
   return (
      <section id="team" className="team team__bg pb-20 pt-20 mb-20" style={{backgroundImage:`url(/assets/img/bg/team_sec_bg.png)`}}>
         <div className="container">
            <div className="sec-title style2 text-center mb-60">
               <h2 className="sec-title__title text-50 mb-25">Our Dedicated Team</h2>
               <p>Always ready our team  to help you</p>
            </div>
            <div className="row mt-none-30">
            {team_data.filter((items)=>items.page==="home_1").map((item)=>(
                  <div key={item.id} className="col-xl-3 col-lg-6 col-md-6 mt-30">
                     <div className="team__single text-center pos-rel">
                        <div className="avatar">
                           <Image src={item.thumb} alt="" />
                        </div>
                        <div className="content">
                           <h3>{item.title}</h3>
                           <span>{item.designation}</span>
                        </div>
                        {/* <div className="rating">
                           <Image src={rating} alt="" />5.0
                        </div> */}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Team
