import React from 'react'
interface DataType {
  id: number;
  page: string;
  title: string;
  desc: string;
}[];

const faq_data: DataType[] = [
   {
      id: 1,
      page:"home_1",
      title: "What is Time Vault?",
      desc: "Time Vault uses smart contracts for individual and commmercial use, to enable users to create a locked wallet not accessible for a timeframe they choose. THis allows users to store ERC-20 tokens securly for a set time frame.",
   },
   {
      id: 2,
      page:"home_1",
      title: "How is Time Vault Secure?",
      desc: "Time Vault has undergone a full auditing process by industry leading professionals to ensure it is secure and safe for users to use.",
   },
   {
      id: 3,
      page:"home_1",
      title: "How much does it cost?",
      desc: "We charge a one off fee of 0.0014 ETH which is around $5 as of writing this. We charge such a low fee as we want everyone to be able to use our services and benefit.",
   },
   {
      id: 4,
      page:"home_1",
      title: "How Can I Get Started with Time Vault?",
      desc: "Simply click the login and you'll be prompted to sign a transaction to verify the wallet ownership (this is gasless). Then you'll be directed to a vault page where you'll be able to view or create vaults as needed.",
   },
   {
      id: 5,
      page:"home_1",
      title: "What Are Some Real-World Use Cases of Time Vault?",
      desc: "Time Vault allows you to store funds in varous different vaults, however common examples include, a forced savings account in USDT / USDC, a vesting contract for releasing team tokesn slowly overtime or a complete dedication to your conviiction coins or project by locking them away for a logn period of time.",
   },
]
const FaqArea = () => {
  return (
    <section className="faq pb-75" id='FAQs'>
      <div className="container">
        <div className="sec-title style2 text-center mb-40">
          <h2 className="sec-title__title text-50 mb-25">Frequently Asked Questions</h2>
          <p>Have questions? We have answers!</p>
        </div>
        <div className="faq__blockchain">
          <div className="accordion_box clearfix accordion" id="accordionOne">
            {faq_data.map((item) => (
              <div key={item.id} className={`block accordion-item  ${item.id === 1 ? "" : "collapsed"}`} id={`heading${item.id}`}>
                <button className={`acc-btn accordion-button ${item.id === 1 ? "" : "collapsed"}`} type='button'
                  data-bs-toggle="collapse" data-bs-target={`#collapse${item.id}`} aria-expanded="true"
                  aria-controls={`collapse${item.id}`}>
                  {item.title}
                  <span className="arrow"><span></span></span>
                </button>
                <div id={`collapse${item.id}`} className={`accordion-collapse collapse ${item.id === 1 ? "show" : ""}`}
                  data-bs-parent="#accordionOne">
                  <div className="content accordion-body">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FaqArea
