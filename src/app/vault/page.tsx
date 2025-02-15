import Vault from "@/component/dapp_valt_home";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Time Vault - Your personal vault for ERC-20 tokens and ethereum",
};
const index = () => {
  return (
    <Wrapper>
      <Vault />
    </Wrapper>
  )
}

export default index