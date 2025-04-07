import { StaticImageData } from "next/image";

import thumb_2 from "@/assets/img/team/Untitled design.png"
import thumb_3 from "@/assets/img/team/Man Shadow.png"

import home_3thumb_1 from "@/assets/img/team/img_01.png"
import home_3thumb_2 from "@/assets/img/team/img_02.png"
import home_3thumb_3 from "@/assets/img/team/img_03.png"
import home_3thumb_4 from "@/assets/img/team/img_04.png"

interface DataType {
   id: number;
   page: string;
   thumb: StaticImageData;
   title: string;
   designation: string;
}[];

const team_data: DataType[] = [
      {
      id: 1,
      page: "home_1",
      thumb: thumb_2,
      title: "Jesse Lees",
      designation: "Founder & Web3 Architect",
   },
         {
      id: 2,
      page: "home_1",
      thumb: thumb_3,
      title: "Hiring Soon",
      designation: "Community Manager",
   },
         {
      id: 3,
      page: "home_1",
      thumb: thumb_3,
      title: "Hiring Soon",
      designation: "Blockchain Developer",
   },
         {
      id: 4,
      page: "home_1",
      thumb: thumb_3,
      title: "Hiring Soon",
      designation: "Front End Developer",
   },



 

   // home_3

   {
      id: 5,
      page: "home_3",
      thumb: home_3thumb_1,
      title: "Michael Johnson",
      designation: "Developer",
   },
   {
      id: 6,
      page: "home_3",
      thumb: home_3thumb_2,
      title: "Nathaniel Lewis",
      designation: "Founder & CO",
   },
   {
      id: 7,
      page: "home_3",
      thumb: home_3thumb_3,
      title: "Timothy Young",
      designation: "Designer",
   },
   {
      id: 8,
      page: "home_3",
      thumb: home_3thumb_4,
      title: "David Williams",
      designation: "Consultant",
   },
];

export default team_data;