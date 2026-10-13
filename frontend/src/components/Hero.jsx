import logo from "../assets/c3tech-logo.png";
import { FiTrendingUp } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="c3-hero" id="hero">
      <div className="c3-hero-bg" />

      {/* ── Left column ── */}
      <div className="c3-hero-left">
        <div className="c3-hero-badge">
          <span className="c3-badge-dot" />
          Based in Varanasi · Serving across India
        </div>

        <h1 className="c3-h1">
          We Build Brands <em>That</em> Get Found Online
        </h1>

        <p className="c3-hero-sub">
          C3Tech crafts stunning websites and powerful digital marketing
          strategies for startups, portfolios, and private limited companies —
          turning clicks into clients.
        </p>

        <div className="c3-hero-actions">
          <a
            href="https://wa.me/918505960012?text=Hi%20C3Tech%2C%20I%20want%20a%20website!"
            className="c3-btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp aria-hidden="true" />
            Chat on WhatsApp
          </a>
          <a
            className="c3-btn-secondary"
            onClick={() =>
              document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Our Work →
          </a>
        </div>

        <div className="c3-hero-stats">
          {[
            { num: "50+",  label: "Projects Delivered" },
            { num: "3x",   label: "Avg. Traffic Growth" },
            { num: "100%", label: "Client Satisfaction" },
          ].map((s) => (
            <div key={s.label}>
              <div className="c3-stat-num">{s.num}</div>
              <div className="c3-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right column – card stack ── */}
      <div className="c3-hero-right">
        <div className="c3-hero-card-stack">
          {/* Main card */}
          <div className="c3-hcard c3-hcard-main">
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
 <div style={{ textAlign: "center" }}>
  <img
    src={logo}
    alt="C3Tech Logo"
    style={{
      width: "170px",
      maxWidth: "100%",
      height: "auto",
      objectFit: "contain",
      marginBottom: "16px",
      filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.25))",
    }}
  />

  <div
  style={{
  width: "170px",
  height: "auto",
  objectFit: "contain",
  marginBottom: "16px",
  filter: "drop-shadow(0 15px 30px rgba(212,175,55,.45))",
  transition: "transform .4s ease",
}}
/>
</div>
            </div>
            <div className="c3-hcard-main-inner">
              <div className="c3-hcard-tag">Upcoming Project</div>
              <div className="c3-hcard-title">
                Divyam
                <br />
                Astrology · Guidance · Insights
              </div>
              <div className="c3-hcard-sub">Website + SEO + Google Ads</div>
            </div>
          </div>

          {/* Overlay card */}
          <div className="c3-hcard c3-hcard-overlay">
            <div className="c3-hcard-icon" aria-hidden="true">
              <FiTrendingUp />
            </div>
            <div className="c3-hcard-overlay-title">Digital Marketing</div>
            <div className="c3-hcard-overlay-sub">SEO · Ads · Social Media</div>
          </div>

          {/* Bottom stat card */}
          <div className="c3-hcard c3-hcard-bottom">
            <div className="c3-hcard-bottom-num">98%</div>
            <div className="c3-hcard-bottom-text">
              Client
              <br />
              Retention
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
