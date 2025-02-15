import Vault_Creation from "@/component/dapp_valt_creaton";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Time Vault - Your personal vault for ERC-20 tokens and ethereum",
};
const index = () => {
  return (
    <Wrapper>
      <Vault_Creation />
    </Wrapper>
  )
}

export default index