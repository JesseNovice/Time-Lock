import Image, { StaticImageData } from "next/image";

import icon_1 from "@/assets/img/icon/s_01.svg";
import icon_2 from "@/assets/img/icon/s_02.svg";
import icon_3 from "@/assets/img/icon/s_03.svg";
import icon_4 from "@/assets/img/icon/s_04.svg";

import icon_5 from "@/assets/img/icon/s_icon.png";
import circle_1 from "@/assets/img/shape/s_circle_1.png";
import circle_2 from "@/assets/img/shape/s_circle_2.png";
import circle_3 from "@/assets/img/shape/s_circle_3.png";
import circle_4 from "@/assets/img/shape/s_circle_4.png";

interface DataType {
   id: number;
   icon: StaticImageData;
   title: string;
   desc: string;
}[];

const solution_data: DataType[] = [
   {
      id: 1,
      icon: icon_1,
      title: "Blockchain Protocol Support",
      desc: "Our supports different blockchain protocols, such as Ethereum",
   },
   {
      id: 2,
      icon: icon_2,
      title: "Analytics and Monitoring",
      desc: "Comprehensive analytics and monitoring tools are included",
   },
   {
      id: 3,
      icon: icon_3,
      title: "Security Measures",
      desc: "Robust security features and cryptographic protocols",
   },
   {
      id: 4,
      icon: icon_4,
      title: "Governance Mechanisms",
      desc: "Some platforms provide built-in governance features",
   },
];

const Solution = () => {
   return (
      <section className="solution pt-10 pb-70 p-relative z-index-1">
         <div className="container" >
            <div className="row align-items-center">
               <div className="col-lg-6">
                  <div className="solution__content wow fadeInLeft">
                     <div className="sec-title style2 mb-60">
                        <h2 className="sec-title__title text-50 mb-25">Our Best Blockchain <br /> Solution Platform</h2>
                        <p>A blockchain solution platform is a comprehensive software or <br /> infrastructure that enables businesses and developers to build,</p>
                     </div>
                     <ul className="solution__list list-unstyled">
                        {solution_data.map((item) => (
                           <li className="z-index-1" key={item.id}>
                              <div className="icon">
                                 <Image src={item.icon} alt="" />
                              </div>
                              <h4>{item.title}</h4>
                              <p>{item.desc}</p>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="solution__img pos-rel wow fadeInRight" data-wow-delay="100ms">
                     <Image src={circle_1} alt="" />
                     <div className="solution__img-sml">
                        <div className="circle circle--1">
                           <div data-parallax='{"x" : -60}'>
                              <Image src={circle_2} alt="" />
                           </div>
                        </div>
                        <div className="circle circle--2">
                           <div data-parallax='{"x" : 60}'>
                              <Image src={circle_3} alt="" />
                           </div>
                        </div>
                        <div className="circle circle--3">
                           <div data-parallax='{"y" : -60}'>
                              <Image src={circle_4} alt="" />
                           </div>
                        </div>
                     </div>
                     <div className="solution__icon">
                        <Image src={icon_5} alt="" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Solution
