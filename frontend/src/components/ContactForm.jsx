import { useState } from "react";
import { FiClock, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const CONTACT_DETAILS = [
  { icon: <FiMapPin aria-hidden="true" />, label: "Location", val: "Varanasi, Uttar Pradesh" },
  { icon: <FaWhatsapp aria-hidden="true" />, label: "WhatsApp", val: "+91 8505960012" },
  { icon: <FiMail aria-hidden="true" />, label: "Email", val: "c3Tech.official@gmail.com" },
  { icon: <FiClock aria-hidden="true" />, label: "Working Hours", val: "Mon – Sat, 9am – 8pm" },
];

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  service: "",
  budget: "",
  message: "",
};

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [adminEmailSent, setAdminEmailSent] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.service) {
      setSubmitError("Please fill in your name, phone, email, and service.");
      return;
    }

    setSubmitError("");
    setIsSending(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your message.");
      }

      setAdminEmailSent(result.adminEmailSent);
      setSubmitted(true);
      setForm(INITIAL_FORM);
    } catch (error) {
      setSubmitError(error.message || "Something went wrong while sending your message.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="c3-section c3-contact-form-section" id="contact-form">
      <div className="c3-section-label">Get In Touch</div>
      <h2 className="c3-h2">
        Tell Us About
        <br />
        Your Project
      </h2>

      <div className="c3-cform-grid">
        <div className="c3-cform-info">
          <h3>We'd love to hear from you</h3>
          <p>
            Tell us a little about your project and our team will get back to you
            within two hours. For a quicker conversation, message us on WhatsApp.
          </p>
          <div className="c3-cform-details">
            {CONTACT_DETAILS.map((d) => (
              <div className="c3-cform-detail-item" key={d.label}>
                <div className="c3-cdi-icon" aria-hidden="true">{d.icon}</div>
                <div>
                  <div className="c3-cdi-label">{d.label}</div>
                  <div className="c3-cdi-val">{d.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="c3-cform-box">
          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="c3-cform-row">
                <div className="c3-cform-group">
                  <label htmlFor="c3-contact-name">Your Name *</label>
                  <input
                    type="text"
                    id="c3-contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Rahul Kumar"
                    autoComplete="name"
                  />
                </div>
                <div className="c3-cform-group">
                  <label htmlFor="c3-contact-phone">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    id="c3-contact-phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="c3-cform-group">
                <label htmlFor="c3-contact-email">Email Address *</label>
                <input
                  type="email"
                  id="c3-contact-email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="rahul@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="c3-cform-group">
                <label htmlFor="c3-contact-service">Service You're Interested In *</label>
                <select
                  id="c3-contact-service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a service…
                  </option>
                  <option>Website Design &amp; Development</option>
                  <option>Personal Portfolio Website</option>
                  <option>Digital Marketing (SEO / Ads)</option>
                  <option>Social Media Management</option>
                  <option>Full Package (Website + Marketing)</option>
                  <option>Not Sure – Need Guidance</option>
                </select>
              </div>

              <div className="c3-cform-group">
                <label htmlFor="c3-contact-budget">Approximate Budget</label>
                <select
                  id="c3-contact-budget"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a range…
                  </option>
                  <option>Under ₹5,000</option>
                  <option>₹5,000 – ₹15,000</option>
                  <option>₹15,000 – ₹50,000</option>
                  <option>₹50,000+</option>
                  <option>Not Sure</option>
                </select>
              </div>

              <div className="c3-cform-group">
                <label htmlFor="c3-contact-message">Tell Us About Your Project</label>
                <textarea
                  id="c3-contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your business, what you need, and any specific requirements…"
                />
              </div>

              {submitError && (
                <p className="c3-cform-error" id="c3-contact-error" role="alert">
                  {submitError}
                </p>
              )}

              <button
                className="c3-cform-submit"
                type="submit"
                disabled={isSending}
                aria-busy={isSending}
              >
                {isSending ? "Sending..." : <>Send Message <FiSend aria-hidden="true" /></>}
              </button>
              <p className="c3-cform-note">We'll reply within 2 hours · No spam, ever</p>
            </form>
          ) : (
            <div className="c3-cform-success" role="status" aria-live="polite">
              <div className="c3-cform-success-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none">
                  <rect x="4.5" y="7.5" width="23" height="17" rx="3" />
                  <path d="m6 10 10 8 10-8" />
                </svg>
              </div>
              <p className="c3-cform-success-eyebrow">
                {adminEmailSent ? "INQUIRY RECEIVED" : "MESSAGE SAVED"}
              </p>
              <h4>{adminEmailSent ? "Thanks for reaching out." : "We've saved your message."}</h4>
              <p className="c3-cform-success-copy">
                {adminEmailSent
                  ? "Your project details are with our team. We'll be in touch within two hours."
                  : "Our team couldn't be notified by email. Please contact us directly and we'll be happy to help."}
              </p>
              {!adminEmailSent && (
                <a className="c3-cform-email-link" href="mailto:c3Tech.official@gmail.com">
                  c3Tech.official@gmail.com
                </a>
              )}
              <a
                href="https://wa.me/918505960012?text=Hi%20C3Tech!"
                className="c3-btn-wa c3-cform-success-cta"
                target="_blank"
                rel="noreferrer"
              >
                Chat with us on WhatsApp
              </a>
              <button
                className="c3-cform-reset"
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setAdminEmailSent(true);
                }}
              >
                Send another inquiry
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
