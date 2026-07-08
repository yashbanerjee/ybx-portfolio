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
    id: "c12",
    index: "01",
    title: "C12 AI",
    tagline: "Investing in crypto, minus the chaos",
    description:
      "An AI-driven crypto trading and investment platform for Asia and the Middle East. I partner with product managers on strategy and market analysis, and design trading experiences that make complex investing feel clear and confident.",
    year: "2024–Now",
    role: "Sr. Product Designer — Cyberspeed Group",
    tags: ["Crypto Exchange", "AI", "Trading Platform"],
    accent: "#6c4cf1",
    accentSoft: "#ece7ff",
  },
  {
    id: "cop28",
    index: "02",
    title: "COP28 · UNFCCC",
    tagline: "Digital platforms for a global climate summit",
    description:
      "The UN Climate Change Conference's mobile and web platforms, used by delegates worldwide. I led the end-to-end design process — wireframes to live deployment during the event — and was recognised as Star Performer two months running.",
    year: "2023",
    role: "UI/UX Developer, Digital",
    tags: ["Government", "Event Tech", "Mobile & Web"],
    accent: "#65b30e",
    accentSoft: "#eaf6cf",
  },
  {
    id: "fnb",
    index: "03",
    title: "Global F&B Brands",
    tagline: "Refreshing icons for digital-first appetites",
    description:
      "Digital design revamps and brand strategy for Dunkin', Baskin Robbins and Buffalo Wild Wings across KSA, GCC, UAE and Canada — region-aware app and web redesigns on scalable design systems, validated through analytics and A/B testing.",
    year: "2024–25",
    role: "Product Consultant UI/UX",
    tags: ["F&B", "Branding", "Design Systems"],
    accent: "#f4502a",
    accentSoft: "#ffe9e1",
  },
  {
    id: "ekyc",
    index: "04",
    title: "EKYC Biometrics",
    tagline: "Identity verification people can trust",
    description:
      "AI-driven biometric identity systems for Thailand and Vietnam. I design onboarding and verification flows that balance regulatory rigour with a fast, humane user experience.",
    year: "2024–Now",
    role: "Sr. Product Designer — Cyberspeed Group",
    tags: ["Identity & KYC", "Biometrics", "Mobile"],
    accent: "#0e9be9",
    accentSoft: "#e1f2fe",
  },
  {
    id: "dws",
    index: "05",
    title: "Dubai Wedding Symposium",
    tagline: "Event tech with a matchmaking brain",
    description:
      "For Dubai's Department of Economy & Tourism: attendee app, web portal and an AI-powered B2B matchmaking engine with event beacon systems — driving successful business connections throughout the event.",
    year: "2023–24",
    role: "Digital Product Delivery",
    tags: ["Government", "AI Matchmaking", "Event App"],
    accent: "#6c4cf1",
    accentSoft: "#ece7ff",
  },
];
