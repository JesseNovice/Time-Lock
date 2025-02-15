"use client"
import { useState, useEffect } from "react";
import UseSticky from "../hooks/UseSticky";
import { IoIosArrowRoundUp } from "react-icons/io";

const ScrollToTop = () => {
   const { sticky }: { sticky: boolean } = UseSticky();
   const [showScroll, setShowScroll] = useState(false);

   // Define checkScrollTop outside useEffect
   const checkScrollTop = () => {
      if (window.pageYOffset > 400) {
         setShowScroll(true);
      } else {
         setShowScroll(false);
      }
   };

   useEffect(() => {
      window.addEventListener("scroll", checkScrollTop);
      return () => window.removeEventListener("scroll", checkScrollTop);
   }, []); // ✅ No missing dependencies

   const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   return (
      <>
         <div onClick={scrollTop} className={`progress-wrap style-2 ${sticky ? "active-progress" : ""}`}>
            <IoIosArrowRoundUp />
         </div>
      </>
   );
};

export default ScrollToTop;
