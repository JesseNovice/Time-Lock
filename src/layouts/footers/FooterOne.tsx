"use client"
import Link from "next/link"
import Image from "next/image"


const FooterOne = () => {
   return (
      <footer className="site-footer footer__blockchain pos-rel pt-95 bg_img" style={{backgroundImage:`url(/assets/img/bg/footer_bg2.jpg)`}}>
         <div className="container">
            <div className="row mt-none-30 pb-70">
               <div className="col-lg-2 col-md-6 col-sm-6 mt-30">
                  <div className="footer__widget">
                     <h3>legal</h3>
                     <ul className="footer__widget-links list-unstyled">
                        <li><Link href="#!">Privacy Policy</Link></li>
                        <li><Link href="#!">Terms & Use</Link></li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="footer__copyright-blc ul_li_between">
               <div className="footer__copyright-text mt-15">
                  Copyright © 2025 Time Vault. All rights reserved.
               </div>
               <ul className="footer__social ul_li mt-15">
                  <li><Link href="#!"><i className="fab fa-twitter"></i></Link></li>
                  <li><Link href="#!"><i className="fab fa-telegram-plane"></i></Link></li>

               </ul>
            </div>
         </div>
      </footer>
   )
}

export default FooterOne
