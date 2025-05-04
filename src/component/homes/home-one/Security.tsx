
import security_data from "@/component/data/SecurityData";

const getIconClass = (title: string): string => {
  switch (title) {
    case "You Own Your Smart Contract":
      return "fas fa-wallet";
    case "Your Funds Are Never Held By Us":
      return "fas fa-shield-alt";
    case "Your Funds Are Never Pooled":
      return "fas fa-layer-group";
    case "We Are Planning On Getting Full Audits":
      return "fas fa-file-alt";
    default:
      return "fas fa-shield-alt";
  }
};

const Security = () => {
  return (
    <section
      id="security"
      className="py-5 text-white"
      style={{ backgroundImage: "url(/assets/img/bg/team_sec_bg.png)", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="container text-center">
        <h2 className="display-5 fw-bold mb-3">Our Security Protocols</h2>
        <p className="text-light mb-5">
          We&apos;ve created a system that is secure and transparent
        </p>

        <div className="row gy-4">
          {security_data
            .filter((item) => item.page === "home_1")
            .map((item) => (
              <div className="col-md-6 col-lg-3" key={item.id}>
                <div className="p-4 h-100 bg-dark rounded shadow text-center">
                  <i className={`${getIconClass(item.title)} fa-2x mb-3 text-primary`}></i>
                  <h5 className="fw-semibold mb-2">{item.title}</h5>
                  <p className="text-muted small">{item.designation}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Security;
