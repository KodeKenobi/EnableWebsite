export type ProductSlide = {
  title: string;
  items: string[];
  mediaType: "video" | "image";
  mediaSrc: string;
  mediaAlt: string;
  textSide: "left" | "right";
  brandPrefix: string;
  brandSuffix: string;
};

export const productSlides: ProductSlide[] = [
  {
    title: "Alternative Asset Management",
    items: [
      "Hedge Funds",
      "Venture Capital",
      "Private Equity",
      "Credit",
      "Real Estate",
      "FinTech",
    ],
    mediaType: "video",
    mediaSrc: "/videos/products/optimized-video-1.mp4",
    mediaAlt: "Alternative asset management overview",
    textSide: "left",
    brandPrefix: "LIBREMAX",
    brandSuffix: "CAPITAL",
  },
  {
    title: "Connected Experiences",
    items: [
      "Digital Operations",
      "Automation Platforms",
      "Network Intelligence",
      "Cyber Defense",
      "Compliance",
      "Business Analytics",
    ],
    mediaType: "video",
    mediaSrc: "/videos/products/optimized-video-2.mp4",
    mediaAlt: "Connected enterprise products",
    textSide: "right",
    brandPrefix: "ENABLE",
    brandSuffix: "TECHNOLOGIES",
  },
  {
    title: "Cloud Modernization",
    items: [
      "Cloud Architecture",
      "Migration Services",
      "Container Platforms",
      "DevSecOps",
      "Cost Optimization",
      "Observability",
    ],
    mediaType: "video",
    mediaSrc: "/videos/products/optimized-video-1.mp4",
    mediaAlt: "Cloud modernization services",
    textSide: "left",
    brandPrefix: "CLOUD",
    brandSuffix: "FORWARD",
  },
  {
    title: "Data Intelligence",
    items: [
      "Data Engineering",
      "Lakehouse Platforms",
      "Real-Time Pipelines",
      "AI Readiness",
      "BI Dashboards",
      "Data Governance",
    ],
    mediaType: "video",
    mediaSrc: "/videos/products/optimized-video-2.mp4",
    mediaAlt: "Data intelligence platforms",
    textSide: "right",
    brandPrefix: "DATA",
    brandSuffix: "INTELLIGENCE",
  },
  {
    title: "Digital Workplace",
    items: [
      "Employee Portals",
      "Collaboration Hubs",
      "Workflow Automation",
      "Identity Access",
      "Knowledge Systems",
      "Support Integrations",
    ],
    mediaType: "video",
    mediaSrc: "/videos/products/optimized-video-1.mp4",
    mediaAlt: "Digital workplace products",
    textSide: "left",
    brandPrefix: "WORK",
    brandSuffix: "SMARTER",
  },
  {
    title: "Cyber Resilience",
    items: [
      "Threat Detection",
      "SOC Enablement",
      "Vulnerability Management",
      "Incident Response",
      "Risk Scoring",
      "Security Training",
    ],
    mediaType: "video",
    mediaSrc: "/videos/products/optimized-video-2.mp4",
    mediaAlt: "Cyber resilience solutions",
    textSide: "right",
    brandPrefix: "CYBER",
    brandSuffix: "RESILIENCE",
  },
  {
    title: "Platform Engineering",
    items: [
      "Internal Developer Portals",
      "Golden Paths",
      "Reusable Services",
      "Release Automation",
      "Environment Templates",
      "Policy as Code",
    ],
    mediaType: "video",
    mediaSrc: "/videos/products/optimized-video-1.mp4",
    mediaAlt: "Platform engineering stack",
    textSide: "left",
    brandPrefix: "PLATFORM",
    brandSuffix: "ENGINEERING",
  },
  {
    title: "Customer Experience Systems",
    items: [
      "Omnichannel Journeys",
      "CRM Integrations",
      "Personalization",
      "Customer Analytics",
      "Service Automation",
      "Retention Workflows",
    ],
    mediaType: "video",
    mediaSrc: "/videos/products/optimized-video-2.mp4",
    mediaAlt: "Customer experience systems",
    textSide: "right",
    brandPrefix: "CUSTOMER",
    brandSuffix: "EXPERIENCE",
  },
];
