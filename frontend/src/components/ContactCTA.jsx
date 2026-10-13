import { FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const INFO = [
  { label: "Location",      val: "Varanasi, Uttar Pradesh" },
  { label: "Response Time", val: "Within 2 Hours" },
  { label: "Working Hours", val: "Mon – Sat, 9am – 8pm" },
  { label: "Email",         val: "C3tech.official@gmail.com" },
];

export default function ContactCTA() {
  return (
    <section className="c3-contact-cta" id="contact">
      <div
        className="c3-section-label"
        style={{ color: "var(--accent2)", textAlign: "center" }}
      >
        Let's Work Together
      </div>

      <h2 className="c3-h2">
        Ready to Grow Your
        <br />
        Business Online?
      </h2>

      <p className="c3-section-sub">
        Get a free consultation and custom quote. We'll respond within 2 hours
        — promise.
      </p>

      <div className="c3-contact-actions">
        <a
          href="https://wa.me/918505960012?text=Hi%20C3Tech%2C%20I%20want%20to%20discuss%20my%20project!"
          className="c3-btn-wa"
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp aria-hidden="true" />
          Chat on WhatsApp
        </a>
        <a href="mailto:c3Tech.official@gmail.com" className="c3-btn-outline-white">
          <FiMail aria-hidden="true" />
          Email Us
        </a>
      </div>

      <div className="c3-contact-info">
        {INFO.map((ci) => (
          <div className="c3-ci-item" key={ci.label}>
            <div className="c3-ci-label">{ci.label}</div>
            <div className="c3-ci-val">{ci.val}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
