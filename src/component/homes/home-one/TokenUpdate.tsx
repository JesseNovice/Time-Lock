interface DataType {
   id: number;
   title: string;
   token_details: {
      name: string;
      token: string;
   }[];
}

const token_data: DataType[] = [
   {
      id: 1,
      title: "Information About Tokens",
      token_details: [
         { name: "Token Name", token: "coindox(ITU)" },
         { name: "Nominal Price", token: "1 ITU =0,025 USD" },
         { name: "Number of Tokens Produced", token: "7 BN ITU" },
         { name: "Unsold Tokens", token: "Burn Smart Contract" },
         { name: "Type of the Token", token: "ERC - 20" },
      ],
   },
   {
      id: 2,
      title: "Terms & Conditions",
      token_details: [
         { name: "Minimum Payment", token: "100 USD" },
         { name: "Maximum Payment in the first 7 days", token: "100 000 USD" },
         { name: "Maximum Payment in the first 7 days", token: "No Limits" },
         { name: "Soft Cap", token: "15 MLN USD" },
         { name: "Hard Cap", token: "75 MLN USD" },
      ],
   },
];
const TokenUpdate = () => {
   return (
      <section className="token-update pb-130">
         <div className="container">
            <div className="sec-title style2 text-center mb-60">
               <h2 className="sec-title__title text-50 mb-25">Live Token Market Updates</h2>
               <p>Stay Informed with Live Data and Analysis</p>
            </div>
            <div className="row mt-none-30">
               {token_data.map((item) => (
                  <div key={item.id} className="col-lg-6 mt-30">
                     <h3 className="token-update__title">{item.title}</h3>
                     <ul className="token-update__data list-unstyled">
                        {item.token_details.map((list, i) => (
                           <li key={i}><span>{list.name}</span><strong>{list.token}</strong></li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default TokenUpdate
