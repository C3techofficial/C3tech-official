import { useEffect } from "react";
import "./styles/global.css";

import Navbar      from "./components/Navbar";
import Hero        from "./components/Hero";
import Services    from "./components/Services";
import Portfolio   from "./components/Portfolio";
import Process     from "./components/Process";
import Testimonials from "./components/Testimonials";
import WhyUs       from "./components/WhyUs";
import ContactForm from "./components/ContactForm";
import ContactCTA  from "./components/ContactCTA";
import Footer      from "./components/Footer";

export default function App() {
  useEffect(() => {
    const selector = [
      ".c3-section-label",
      ".c3-h2",
      ".c3-section-sub",
      ".c3-services-header",
      ".c3-service-card",
      ".portfolio-card",
      ".c3-process-step",
      ".c3-tcard",
      ".c3-why-item",
      ".c3-why-visual",
      ".c3-cform-info",
      ".c3-cform-box",
      ".c3-contact-actions",
      ".c3-contact-info",
      ".c3-footer > *",
    ].join(", ");
    const targets = document.querySelectorAll(selector);

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("c3-reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("c3-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );

    document.documentElement.classList.add("c3-motion-ready");
    targets.forEach((target, index) => {
      target.classList.add("c3-reveal");
      target.style.setProperty("--reveal-delay", `${(index % 4) * 85}ms`);
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("c3-motion-ready");
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <Testimonials />
      <WhyUs />
      <ContactForm />
      <ContactCTA />
      <Footer />
    </>
  );
}
