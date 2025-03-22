"use client";

import Image from "next/image"
import Link from "next/link"
import { logEvent, Analytics } from "firebase/analytics";
import { getAnalyticsInstance } from "@/lib/firebase"; // Import the new getter function
import { useEffect, useState } from "react";


import icon_1 from "@/assets/img/icon/sc.svg"

const Hero = () => {
   const [analytics, setAnalytics] = useState<Analytics | null>(null);


     useEffect(() => {
    getAnalyticsInstance().then((instance) => {
      if (instance) setAnalytics(instance);
    });
  }, []);

 const handleClick = () => {
    if (analytics) {
      logEvent(analytics, "goal_completion", { name: "lever_puzzle" });
    }
  };

   return (
      <section className="hero hero__blockchain pos-rel bg_img" style={{ backgroundImage: `url(assets/img/bg/blockchain_hero_bg.png)` }}>
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-7">
                  <div className="blockchain-hero__content">
                     <h1 className="title text-80 mb-35 -tracking-2/4">Create A Time Locked Vault To Store Your Crypto</h1>

                     <p className="mb-50 text-20 leading-30">Store your crypto in a locked vault of up to 1,000 days<br /> No more paper hands or emotional sells.</p>
                     <div className="btns">
                        <Link className="blc-btn" href="/vault" onClick={handleClick}>launch app</Link>
                        <Link className="blc-btn blc-btn--white" href="#features">view types of vaults</Link>
                     </div>
                  </div>
               </div>
               <div className="col-lg-5">
                  <div className="hero__blockchain-icon pos-rel">
                     <div className="icon ul_li icon--1 absolute">
                        <span className="text-white mr-5">Secure & Safe</span>
                        <Image src={icon_1} alt="" />
                     </div>
                     <div className="icon ul_li icon--2 absolute">
                        <span className="text-white mr-5">Low Fees</span>
                        <Image src={icon_1} alt="" />
                     </div>
                     <div className="icon ul_li icon--3 absolute">
                        <span className="text-white mr-5">Decentralized</span>
                        <Image src={icon_1} alt="" />
                     </div>
                     <div className="icon ul_li icon--4 absolute">
                        <Image src={icon_1} alt="" />
                        <span className="text-white ml-5">Community Focused</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Hero
