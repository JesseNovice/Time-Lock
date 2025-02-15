import Image, { StaticImageData } from "next/image"
import Link from "next/link"

import brand_1 from "@/assets/img/brand/brand_01.png"
import brand_2 from "@/assets/img/brand/brand_02.png"
import brand_3 from "@/assets/img/brand/brand_03.png"
import brand_4 from "@/assets/img/brand/brand_04.png"
import brand_5 from "@/assets/img/brand/brand_05.png"
import brand_6 from "@/assets/img/brand/brand_06.png"
import brand_7 from "@/assets/img/brand/brand_07.png"
import brand_8 from "@/assets/img/brand/brand_08.png"
import brand_9 from "@/assets/img/brand/brand_09.png"
import brand_10 from "@/assets/img/brand/brand_10.png"
import brand_11 from "@/assets/img/brand/brand_11.png"
import brand_12 from "@/assets/img/brand/brand_12.png"

const brand_data: StaticImageData[] = [brand_1, brand_2, brand_3, brand_4, brand_5, brand_6, brand_7, brand_8, brand_9, brand_10, brand_11, brand_12];

const Brand = () => {
   return (
      <section className="brand brand__sec-bg pb-90 pos-rel" style={{ backgroundImage: `url(/assets/img/bg/brand_bg.png)` }}>
         <div className="container">
            <div className="brand__wrap pos-rel">
               <div className="brand__bg"></div>
               <div className="sec-title style2 text-center mb-50">
                  <h2 className="sec-title__title text-50 mb-25">Our Partners</h2>
                  <p>Discover Our Trusted Blockchain Partners</p>
               </div>
               <div className="brand__item-wrap">
                  {brand_data.map((item, i) => (
                     <div key={i} className="brand__single">
                        <Link href="#!"><Image src={item} alt="" /></Link>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

   )
}

export default Brand
