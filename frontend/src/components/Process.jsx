const STEPS = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "We understand your business, goals, and target audience in a free consultation.",
  },
  {
    num: "02",
    title: "Design & Plan",
    desc: "We present a design mockup and project plan for your approval before we build.",
  },
  {
    num: "03",
    title: "Build & Review",
    desc: "We develop your website and share it for review — with unlimited revisions.",
  },
  {
    num: "04",
    title: "Launch & Support",
    desc: "We go live and provide 30-day free support post launch.",
  },
];

export default function Process() {
  return (
    <section className="c3-section c3-process" id="process">
      <div className="c3-section-label">How It Works</div>
      <h2 className="c3-h2">
        From Idea to Launch
        <br />
        in 4 Simple Steps
      </h2>
      <p className="c3-section-sub">
        A clear, transparent process so you always know what's happening with
        your project.
      </p>

      <div className="c3-process-steps">
        {STEPS.map((s) => (
          <div className="c3-process-step" key={s.num}>
            <div className="c3-ps-num">{s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
