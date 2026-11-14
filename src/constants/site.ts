export const SITE_URL = "https://fmdigitalai.com";

/** The contact API is reused exactly as it exists today. Do not change the contract. */
export const CONTACT_ENDPOINT = "https://fm-digital-web-api.onrender.com/submit-contact";

export type ServiceId = "agents" | "followup" | "found" | "tools";

export const SERVICE_IDS: ServiceId[] = ["agents", "followup", "found", "tools"];

/** Existing, indexed URLs are preserved 1:1. */
export const SERVICE_PATHS: Record<ServiceId, string> = {
  agents: "/ai-agents",
  followup: "/workflow-automation",
  found: "/bilingual-seo",
  tools: "/custom-software",
};

/** Supporting photography per service (decorative, paired with text). */
export const SERVICE_IMAGES: Record<ServiceId, ImageName> = {
  agents: "office-professional",
  followup: "team-notes",
  found: "shop-owner",
  tools: "owner-laptop",
};

export const CITIES = [
  "Orlando",
  "Kissimmee",
  "Groveland",
  "Clermont",
  "Winter Garden",
  "St. Cloud",
  "Davenport",
  "Leesburg",
  "Apopka",
  "Ocoee",
  "Windermere",
  "Celebration",
];

export type ImageName =
  | "hero-owner"
  | "clinic-doctor"
  | "restaurant-kitchen"
  | "real-estate-home"
  | "office-professional"
  | "barber-local"
  | "team-notes"
  | "studio-team"
  | "shop-owner"
  | "owner-laptop";

export const imageSrc = (name: ImageName, width: 800 | 1600) => `/images/${name}-${width}.webp`;

export const imageSet = (name: ImageName) =>
  `${imageSrc(name, 800)} 800w, ${imageSrc(name, 1600)} 1600w`;

/** Primary navigation: one primary action (the free audit) plus orientation links. */
export const NAV_LINKS = [
  { key: "services", path: "/services" },
  { key: "process", path: "/our-process" },
  { key: "work", path: "/case-studies" },
  { key: "about", path: "/about" },
] as const;
