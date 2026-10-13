import {
  FiClock,
  FiMessageCircle,
  FiSmartphone,
  FiDollarSign,
  FiTool,
} from "react-icons/fi";

const REASONS = [
  {
    icon: <FiClock aria-hidden="true" />,
    title: "Fast Delivery",
    desc: "Most websites are delivered within 7–14 days. No endless delays, no excuses.",
  },
  {
    icon: <FiMessageCircle aria-hidden="true" />,
    title: "Direct Communication",
    desc: "You talk directly with the team — no middlemen, no confusion, just clarity.",
  },
  {
    icon: <FiSmartphone aria-hidden="true" />,
    title: "Mobile-First Design",
    desc: "Every website we build looks perfect on all screens — phone, tablet, desktop.",
  },
  {
    icon: <FiDollarSign aria-hidden="true" />,
    title: "Transparent Pricing",
    desc: "No hidden charges. You know exactly what you're paying for before we start.",
  },
  {
    icon: <FiTool aria-hidden="true" />,
    title: "Ongoing Support",
    desc: "30 days free support after launch, plus affordable maintenance plans.",
  },
];

const METRICS = [
  { label: "Client Satisfaction", val: "98%", width: "98%" },
  { label: "On-Time Delivery",    val: "95%", width: "95%" },
  { label: "SEO Success Rate",    val: "88%", width: "88%" },
  { label: "Repeat Clients",      val: "80%", width: "80%" },
];

export default function WhyUs() {
  return (
    <section className="c3-section c3-why" id="why">
      <div className="c3-section-label">Why C3Tech</div>
      <h2 className="c3-h2">
        The Smart Choice for
        <br />
        Your Digital Growth
      </h2>

      <div className="c3-why-grid">
        {/* Reasons list */}
        <div className="c3-why-list">
          {REASONS.map((r) => (
            <div className="c3-why-item" key={r.title}>
              <div className="c3-why-icon" aria-hidden="true">{r.icon}</div>
              <div>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Results visual */}
        <div className="c3-why-visual">
          <div className="c3-why-visual-title">Our Results Speak</div>
          {METRICS.map((m) => (
            <div className="c3-why-metric" key={m.label}>
              <div className="c3-wm-label">{m.label}</div>
              <div className="c3-wm-bar-wrap">
                <div className="c3-wm-bar" style={{ width: m.width }} />
              </div>
              <div className="c3-wm-val">{m.val}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
