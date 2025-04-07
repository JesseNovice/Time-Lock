import Image from "next/image"

import shape_1 from "@/assets/img/about/about_shape1.png";
import shape_2 from "@/assets/img/about/about_shape2.png";
import shape_3 from "@/assets/img/about/about_shape3.png";
import icon_1 from "@/assets/img/icon/syber_icon.svg";
import icon_2 from "@/assets/img/icon/ul_icon.svg"

const list_data: string[] = ["Locked For Up To 1,000 Days", "Accepts All ERC-20 Tokens", "Three Options To Suit Your Needs", "One Time Fee For Use"];

const About = () => {
   return (
      <section className="blc-about pb-20 pt-20 mb-20">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-6">
                  <div className="z-index-1 blc-about__img pos-rel text-center  wow fadeInLeft">
                     <Image src={shape_1} alt="" />
                     <div className="shape shape--1">
                        <div data-parallax='{"y" : 60}'>
                           <Image src={shape_2} alt="" />
                        </div>
                     </div>
                     <div className="shape shape--2">
                        <div data-parallax='{"y" : -60}'>
                           <Image src={shape_3} alt="" />
                        </div>
                     </div>
                     <div className="icon">
                        <Image src={icon_1} alt="" />
                     </div>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="blc-about__content wow fadeInRight" data-wow-delay="100ms">
                     <div className="sec-title style2 mb-40">
                        <h2 className="sec-title__title text-50 mb-25">Create a vault inaccessible to your current self for your future self</h2><br />
                        <p>With our time locked vaults, you can store etherum and erc-20 tokens <br /> you beleive in for a set time frame. Save yourself from the paperhanded version of yourself. <br /><br /> Start a time locked vault today.</p>
                     </div>
                     <ul className="blc-about__list ul_li mt-none-20">
                        {list_data.map((list, i) => (
                           <li key={i}><Image src={icon_2} alt="" />{list}</li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default About
