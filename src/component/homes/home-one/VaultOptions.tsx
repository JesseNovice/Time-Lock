import Image, { StaticImageData } from "next/image";
import icon_1 from "@/assets/img/icon/up_01.svg";
import icon_2 from "@/assets/img/icon/up_02.svg";
import icon_3 from "@/assets/img/icon/up_02.svg";
import check from "@/assets/img/icon/check_badge.svg";

interface DataType {
  id: number;
  title: string;
  icon: StaticImageData;
  list: {
    title: string;
    desc: string;
  }[];
}

const user_option_data: DataType[] = [
  {
    id: 1,
    title: "Time Locked Vault",
    icon: icon_1,
    list: [
      { title: "Locked Securely", desc: "Lock away your funds securely for a fixed time." },
      { title: "Unlocks At A Pre Set Time", desc: "Choose a time that suits you for the vault to be accessible." },
      { title: "Perfect For", desc: "People & companies who want to keep funds locked away such as tax from trades or long-term holds." },
    ],
  },
  {
    id: 2,
    title: "Flexi Time Locked Vault",
    icon: icon_2,
    list: [
      { title: "Flexible Security", desc: "Lock your funds while keeping an emergency withdrawal option available." },
      { title: "Emergency Withdrawals", desc: "Access your funds early under predefined conditions if needed." },
      { title: "Perfect For", desc: "Traders and investors who want security but need flexibility in case of unexpected financial needs." },
    ],
  },
  {
    id: 3,
    title: "Vesting Distribution",
    icon: icon_3,
    list: [
      { title: "Gradual Release", desc: "Funds are distributed over time instead of all at once." },
      { title: "Custom Vesting Schedules", desc: "Set specific timeframes for funds to be unlocked incrementally." },
      { title: "Perfect For", desc: "Companies managing token distributions, employee incentives, or structured investment plans." },
    ],
  },
];

const UserOption = () => {
  return (
    <section className="py-5 text-white bg-black" id="features">
      <div className="container text-center">
        <h2 className="display-5 fw-bold mb-3">Three Types of Vaults</h2>
        <p className="text-light mb-5">
          Our dapp is designed for individuals in mind but can be used commercially.
        </p>

        <div className="row justify-content-center g-4">
          {user_option_data.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6 d-flex justify-content-center">
              <div className="vault-card-box w-100">
                <div className="vault-card-inner p-4 h-100 text-start">
                  <div className="vault-card-title mb-3 text-cyan fw-bold">
                    {item.title}
                  </div>
                  <ul className="list-unstyled mb-0">
                    {item.list.map((list, i) => (
                      <li key={i} className="mb-3 d-flex">
                        <Image src={check} alt="Check" width={20} height={20} className="me-2 mt-1" />
                        <div>
                          <div className="fw-semibold text-white">{list.title}</div>
                          <div className="text-light small">{list.desc}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserOption;
