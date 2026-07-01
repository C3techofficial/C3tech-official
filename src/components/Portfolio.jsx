import theWedsImg from "../thewedsmemories.png";
import evCafeImg from "../theevcafe.png";

const PROJECTS = [
  {
    title: "The Weds Memories",
    category: "Wedding Photography & Cinematography",
    description:
      "A premium wedding photography and cinematography website featuring elegant galleries, storytelling experiences, and enquiry forms.",
    tech: ["React", "Responsive Design", "UI/UX"],
    image: theWedsImg,
    live: "https://www.thewedsmemories.com",
  },
  {
    title: "The EV Cafe",
    category: "Electric Vehicle Community Platform",
    description:
      "India's premium EV charging and wellness café platform with modern design, responsive experience, and interactive sections.",
    tech: ["React", "Modern UI", "Responsive Design"],
    image: evCafeImg,
    live: "https://www.theevcafe.com",
  },
];

export default function Portfolio() {
  return (
    <section className="c3-section portfolio-section" id="portfolio">
      <div className="c3-section-header">
        <span className="c3-section-label">
          Our Work
        </span>

        <h2 className="c3-h2">
          Featured Projects
        </h2>

        <p className="c3-section-sub">
          Real-world websites designed and developed by
          C3Tech for businesses and brands.
        </p>
      </div>

      <div className="portfolio-grid">
        {PROJECTS.map((project) => (
          <div
            className="portfolio-card"
            key={project.title}
          >
            <div className="portfolio-image">
              <img
                src={project.image}
                alt={project.title}
              />
            </div>

            <div className="portfolio-content">
              <p className="portfolio-category">
                {project.category}
              </p>

              <h3>{project.title}</h3>

              <p className="portfolio-description">
                {project.description}
              </p>

              <div className="portfolio-tech">
                {project.tech.map((item) => (
                  <span key={item}>
                    {item}
                  </span>
                ))}
              </div>

              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="portfolio-btn"
              >
                View Live Website →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}