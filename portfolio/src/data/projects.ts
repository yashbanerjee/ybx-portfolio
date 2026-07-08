export interface Project {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  role: string;
  tags: string[];
  accent: string;
  accentSoft: string;
}

export const projects: Project[] = [
  {
    id: "pulse",
    index: "01",
    title: "Pulse Health",
    tagline: "Making preventive care feel personal",
    description:
      "A health companion app that turns raw biometric data into a daily narrative. I led end-to-end design — from research with 40+ patients to a design system shipped across iOS and Android.",
    year: "2025",
    role: "Lead Product Designer",
    tags: ["Mobile App", "Design System", "Health Tech"],
    accent: "#c6f24e",
    accentSoft: "rgba(198, 242, 78, 0.14)",
  },
  {
    id: "orbit",
    index: "02",
    title: "Orbit Finance",
    tagline: "Investing, without the intimidation",
    description:
      "A fintech platform reimagined for first-time investors. I designed the onboarding narrative and data-viz language that lifted activation by 38% and cut drop-off in half.",
    year: "2024",
    role: "Senior Product Designer",
    tags: ["Fintech", "Data Viz", "Web Platform"],
    accent: "#7c5cff",
    accentSoft: "rgba(124, 92, 255, 0.16)",
  },
  {
    id: "terra",
    index: "03",
    title: "Terra Marketplace",
    tagline: "Commerce that celebrates craft",
    description:
      "An artisan marketplace connecting makers with conscious buyers. I built the visual identity, storytelling-first product pages, and a seller toolkit used by 2,000+ creators.",
    year: "2024",
    role: "Product Designer",
    tags: ["E-commerce", "Branding", "Marketplace"],
    accent: "#ff6b4a",
    accentSoft: "rgba(255, 107, 74, 0.15)",
  },
  {
    id: "nimbus",
    index: "04",
    title: "Nimbus OS",
    tagline: "A calmer way to run your team",
    description:
      "A workspace operating system for distributed teams. I designed the spatial navigation model and motion language that makes switching contexts feel effortless.",
    year: "2023",
    role: "Product Designer",
    tags: ["SaaS", "Interaction Design", "Motion"],
    accent: "#5cc8ff",
    accentSoft: "rgba(92, 200, 255, 0.15)",
  },
];
