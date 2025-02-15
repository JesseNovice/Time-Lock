import Header from "@/layouts/headers/Header"
import FooterOne from "@/layouts/footers/FooterOne"
import Main from "./Main"

const HomeOne = () => {
  return (
    <div className="home-blockchain">
      <div className="body_wrap">
        <Header />
        <Main />
        <FooterOne />
      </div>
    </div>
  )
}

export default HomeOne
