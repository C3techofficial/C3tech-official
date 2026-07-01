import {
  FaCode,
  FaLaptopCode,
  FaBullhorn,
} from "react-icons/fa";

const SERVICES = [
  {
    num: "01",
    icon: <FaCode />,
    title: "Website Design & Development",
    desc:
      "Custom-designed websites for businesses, startups, and institutions. Fast, mobile-friendly, and built to convert visitors into customers.",
    tags: [
      "Business Sites",
      "Landing Pages",
      "E-commerce",
      "Pvt. Ltd. Sites",
    ],
    price: "₹7,999",
  },
  {
    num: "02",
    icon: <FaLaptopCode />,
    title: "Personal Portfolio Websites",
    desc:
      "Showcase your skills, work, and achievements with a stunning personal portfolio. Perfect for freelancers, professionals, and job seekers.",
    tags: [
      "Freelancers",
      "Designers",
      "Developers",
      "Professionals",
    ],
    price: "₹3,999",
  },
  {
    num: "03",
    icon: <FaBullhorn />,
    title: "Digital Marketing",
    desc:
      "Grow your audience and increase sales with targeted SEO, Google Ads, Meta Ads, and social media management that delivers real results.",
    tags: [
      "SEO",
      "Google Ads",
      "Meta Ads",
      "Social Media",
    ],
    price: "₹5,999/mo",
  },
];

export default function Services() {
  const handleQuote = (serviceName) => {
    localStorage.setItem(
      "selectedService",
      serviceName
    );

    const contactSection =
      document.getElementById("contact-form");

    contactSection?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      className="c3-section c3-services"
      id="services"
    >
      <div className="c3-services-header">
        <div>
          <span className="c3-section-label">
            What We Do
          </span>

          <h2 className="c3-h2">
            Services Designed
            <br />
            to Grow Your Business
          </h2>
        </div>

        <p className="c3-section-sub">
          End-to-end digital solutions from design to
          marketing — everything you need, under one roof.
        </p>
      </div>

      <div className="c3-services-grid">
        {SERVICES.map((service) => (
          <div
            className="c3-service-card"
            key={service.num}
          >
            <div className="c3-card-top">
              <span className="c3-sc-num">
                {service.num}
              </span>

              <div className="c3-sc-icon">
                {service.icon}
              </div>
            </div>

            <h3 className="c3-sc-h3">
              {service.title}
            </h3>

            <p className="c3-sc-p">
              {service.desc}
            </p>

            <div className="c3-sc-tags">
              {service.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="c3-sc-price">
              <small>Starting from</small>
              <h4>{service.price}</h4>
            </div>

            <button
              className="c3-btn"
              onClick={() =>
                handleQuote(service.title)
              }
            >
              Get Quote →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
