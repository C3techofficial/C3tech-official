import { useState } from "react";

const CONTACT_DETAILS = [
  { icon: "📍", label: "Location",      val: "Varanasi, Uttar Pradesh" },
  { icon: "💬", label: "WhatsApp",      val: "+91 8505960012" },
  { icon: "📧", label: "Email",         val: "c3Tech.official@gmail.com" },
  { icon: "⏰", label: "Working Hours", val: "Mon – Sat, 9am – 8pm" },
];

const INITIAL_FORM = {
  name: "", phone: "", email: "", service: "", budget: "", message: "",
};

export default function ContactForm() {
  const [form, setForm]           = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.service) {
      alert("Please fill in your Name, Phone, and Service selection.");
      return;
    }
    setSubmitted(true);
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
        {/* ── Info panel ── */}
        <div className="c3-cform-info">
          <h3>We'd love to hear from you</h3>
          <p>
            Fill out the form and our team will get back to you within 4hours.
            Or just message us directly on WhatsApp for an instant reply.
          </p>
          <div className="c3-cform-details">
            {CONTACT_DETAILS.map((d) => (
              <div className="c3-cform-detail-item" key={d.label}>
                <div className="c3-cdi-icon">{d.icon}</div>
                <div>
                  <div className="c3-cdi-label">{d.label}</div>
                  <div className="c3-cdi-val">{d.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Form box ── */}
        <div className="c3-cform-box">
          {!submitted ? (
            <>
              <div className="c3-cform-row">
                <div className="c3-cform-group">
                  <label>Your Name *</label>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange} placeholder="Rahul Kumar"
                  />
                </div>
                <div className="c3-cform-group">
                  <label>Phone / WhatsApp *</label>
                  <input
                    type="tel" name="phone" value={form.phone}
                    onChange={handleChange} placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="c3-cform-group">
                <label>Email Address</label>
                <input
                  type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="rahul@example.com"
                />
              </div>

              <div className="c3-cform-group">
                <label>Service You're Interested In *</label>
                <select name="service" value={form.service} onChange={handleChange}>
                  <option value="" disabled>Select a service…</option>
                  <option>Website Design &amp; Development</option>
                  <option>Personal Portfolio Website</option>
                  <option>Digital Marketing (SEO / Ads)</option>
                  <option>Social Media Management</option>
                  <option>Full Package (Website + Marketing)</option>
                  <option>Not Sure – Need Guidance</option>
                </select>
              </div>

              <div className="c3-cform-group">
                <label>Approximate Budget</label>
                <select name="budget" value={form.budget} onChange={handleChange}>
                  <option value="" disabled>Select a range…</option>
                  <option>Under ₹5,000</option>
                  <option>₹5,000 – ₹15,000</option>
                  <option>₹15,000 – ₹50,000</option>
                  <option>₹50,000+</option>
                  <option>Not Sure</option>
                </select>
              </div>

              <div className="c3-cform-group">
                <label>Tell Us About Your Project</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Describe your business, what you need, and any specific requirements…"
                />
              </div>

              <button className="c3-cform-submit" onClick={handleSubmit}>
                Send Message 🚀
              </button>
              <p className="c3-cform-note">We'll reply within 2 hours · No spam, ever</p>
            </>
          ) : (
            <div className="c3-cform-success">
              <div className="c3-cform-success-icon">✅</div>
              <h4>Message Received!</h4>
              <p>
                Thank you! We'll get back to you within 2 hours.
                <br />
                For faster response, WhatsApp us directly.
              </p>
              <a
                href="https://wa.me/918505960012?text=Hi%20C3Tech!"
                className="c3-btn-wa"
                style={{ display: "inline-flex", marginTop: "1.5rem" }}
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
