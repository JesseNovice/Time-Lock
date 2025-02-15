interface DataType {
   id: number;
   page:string;
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

// home_2

   {
      id: 1,
      page:"home_2",
      title: "How does it work?",
      desc: "Bitcoin mining is the process by which new bitcoins are created and added to the circulating supply. It also serves as the mechanism through which transactions are verified and added to the public ledger known as the blockchain. Here's how it works:",
   },
   {
      id: 2,
      page:"home_2",
      title: "How to withdraw my income?",
      desc: "Withdrawing your Bitcoin mining income involves several steps to ensure the safe and proper transfer of your earnings. Here's a general outline of the process:",
   },
   {
      id: 3,
      page:"home_2",
      title: "Do I need to purchase equipment?",
      desc: "Yes, if you want to engage in Bitcoin mining, you will generally need to purchase specialized equipment known as mining hardware. However, the specifics can vary based on your approach to mining and the current state of the industry. Here are some things to consider:",
   },
   {
      id: 4,
      page:"home_2",
      title: "Can I open multiple accounts in your program?",
      desc: "I am not affiliated with any specific Bitcoin mining program, but I can provide general guidance.",
   },
   {
      id: 5,
      page:"home_2",
      title: "Do you charge withdrawal fees?",
      desc: "I do not charge any fees myself, as I am a text-based AI model developed by OpenAI. However, when it comes to cryptocurrency transactions, including withdrawals from exchanges or wallets, fees can be incurred due to the network's design and the services you are using. Here's a brief explanation:",
   },
   {
      id: 6,
      page:"home_2",
      title: "How does the affiliate program work?",
      desc: "Affiliate programs are marketing strategies that reward individuals or entities (affiliates) for bringing in new customers or users to a business or platform. These programs are quite common in various industries, including the cryptocurrency and blockchain space. However, I do not have access to real-time information, and my knowledge is based on information available up until September 2021. Therefore, I can provide a general overview of how affiliate programs typically work, but you should consult the specific program's terms and conditions for accurate and up-to-date information.",
   },
];

export default faq_data;