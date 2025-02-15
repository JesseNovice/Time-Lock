import Image from "next/image"

import shape_1 from "@/assets/img/shape/b_shape1.png"

import icon_1 from "@/assets/img/icon/bi_01.png"
import icon_2 from "@/assets/img/icon/bi_02.png"
import icon_3 from "@/assets/img/icon/bi_03.png"
import icon_4 from "@/assets/img/icon/bi_04.png"
import Link from "next/link"

const Breadcrumb = ({ title, page_title }: any) => {
   return (
      <section className="breadcrumb pos-rel">
         <div className="container">
            <div className="breadcrumb__content">
               <h2 className="breadcrumb__title">{title}</h2>
               <ul className="bread-crumb clearfix ul_li_center">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item">{page_title}</li>
               </ul>
            </div>
         </div>
         <div className="breadcrumb__shape">
            <Image src={shape_1} alt="" />
         </div>
         <div className="breadcrumb__icon">
            <div className="icon icon--1">
               <div data-parallax='{"y" : 80}'>
                  <Image src={icon_1} alt="" />
               </div>
            </div>
            <div className="icon icon--2">
               <div data-parallax='{"x" : -90}'>
                  <Image src={icon_2} alt="" />
               </div>
            </div>
            <div className="icon icon--3">
               <div data-parallax='{"y" : -80}'>
                  <Image src={icon_3} alt="" />
               </div>
            </div>
            <div className="icon icon--4">
               <div data-parallax='{"x" : 90}'>
                  <Image src={icon_4} alt="" />
               </div>
            </div>
         </div>
      </section>
   )
}

export default Breadcrumb
