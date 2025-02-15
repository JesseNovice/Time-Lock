import HomeOne from "@/component/homes/home-one";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Time Vault - Your personal vault for ERC-20 tokens and ethereum",
};
const index = () => {
  return (
    <Wrapper>
      <HomeOne />
    </Wrapper>
  )
}

export default index