interface DataType {
   id: number,
   number: number;
   date: string;
}[];

const token_data: DataType[] = [
   {
      id: 1,
      number: 25,
      date: "Oct 17 - Nov4",
   },
   {
      id: 2,
      number: 20,
      date: "Nov 5 - Dec4",
   },
   {
      id: 3,
      number: 15,
      date: "Dec 26-Jan28",
   },
   {
      id: 4,
      number: 10,
      date: "Jan 17-Feb18",
   },
   {
      id: 5,
      number: 5,
      date: "Feb 16-Mar10",
   },
   {
      id: 6,
      number: 0,
      date: "Mar 11-Apr27",
   },
];

const Token = () => {
   return (
      <section className="token-chat">
         <div className="container">
            <div className="sec-title style2 text-center mb-50">
               <h2 className="sec-title__title text-50 mb-25">30% Bonus Active Now</h2>
               <p>The earlier you invest in CRR, higher bonuses you get</p>
            </div>
            <ul className="token-chat__wrap ul_li_between">
               <li>
                  <div className="token-chat__animation"></div>
                  <span className="number">30%</span>
                  <span className="date">Sep 17-oct 9</span>
               </li>
               {token_data.map((item) => (
                  <li key={item.id}>
                     <span className="number">{item.number}%</span>
                     <span className="date">{item.date}</span>
                  </li>
               ))}
            </ul>
         </div>
      </section>
   )
}

export default Token
