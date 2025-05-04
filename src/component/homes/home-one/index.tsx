import FooterOne from "@/layouts/footers/FooterOne"
import About from "./About"
import Advantages from "./Advantages"
import FaqArea from "./FaqArea"
import Hero from "./Hero"
import Roadmap from "./Roadmap"
import Security from "./Security"
import UserOption from "./VaultOptions"
import Header from "@/layouts/headers/Header"


const HomeOne = () => {
  return (
    <div className="home-blockchain">
      <div className="body_wrap">
        <Header />
        <Hero />
        <About />
        <UserOption />
        <Security />
        <Roadmap />
        <FaqArea />
        <FooterOne />
      </div>
    </div>
  )
}

export default HomeOne
