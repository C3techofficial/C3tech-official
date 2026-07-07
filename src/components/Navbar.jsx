import logo from "../assets/c3tech-logo.png";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Navbar() {
  return (
    <nav className="c3-nav">
      {/* Logo */}
      <a
        className="c3-nav-logo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img
          src={logo}
          alt="C3Tech Logo"
          className="c3-logo"
        />
        <span>C3<span>Tech</span></span>
      </a>

      {/* Navigation Links */}
      <ul className="c3-nav-links">
        <li>
          <a onClick={() => scrollTo("services")}>Services</a>
        </li>
        <li>
          <a onClick={() => scrollTo("portfolio")}>Portfolio</a>
        </li>
        <li>
          <a onClick={() => scrollTo("process")}>Process</a>
        </li>
        <li>
          <a onClick={() => scrollTo("testimonials")}>Reviews</a>
        </li>
        <li>
          <a
            onClick={() => scrollTo("contact")}
            className="c3-nav-cta"
          >
            Get a Quote
          </a>
        </li>
      </ul>
    </nav>
  );
}