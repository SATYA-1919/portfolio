export const profile = {
  name: "Satyaki Tirumal",
  role: "Full-Stack & Mobile Developer",
  tagline:
    "I build full-stack web platforms, native mobile apps, and AI-powered tools — from placement portals to autonomous satellite planners.",
  location: "Hyderabad, India",
  email: "satya.19.2004@gmail.com",
  phone: "+91 99497 50581",
  resumeUrl: "/resume.pdf",
  siteUrl: "https://satyaki-tirumal.vercel.app",
  socials: {
    github: "https://github.com/SATYA-1919",
    linkedin: "https://linkedin.com/in/satyaki-tirumal-541b98283",
  },
};

export type ProjectIcon =
  | "graduation"
  | "leads"
  | "grocery"
  | "tasks"
  | "satellite";

export type Project = {
  slug: string;
  title: string;
  category: string;
  icon: ProjectIcon;
  blurb: string;
  description: string;
  tags: string[];
  year: string;
  github?: string;
  live?: string;
  featured?: boolean;
  accent: string;
  /** Optional screenshot in /public/projects/<slug>.webp. Falls back to a
   *  generative cover if the file is missing (handled in ProjectShowcase). */
  image?: string;
  /** "phone" renders the screenshot in a device frame; "screen" fills the card. */
  frame?: "phone" | "screen";
};

export const projects: Project[] = [
  {
    slug: "uniship",
    title: "UniShip",
    category: "Full-Stack Platform",
    icon: "graduation",
    blurb:
      "University placement platform with proctored assessments, an in-browser code editor, and AI-graded submissions — web + mobile.",
    description:
      "Architected a placement platform spanning a Next.js web app and a Flutter mobile app for students, university admins and super admins. Built a proctored online assessment portal with an in-browser code editor and live invigilation dashboard, running a Dockerized compiler on the college's HPC cluster. Integrated the Groq API (Llama 3.3 70B) for auto-grading and an AI resume builder with ATS scoring and PDF export. Three-tier RBAC with Firebase Auth + Firestore and real-time sync.",
    tags: ["Next.js", "React", "Flutter", "Firebase", "Groq", "TypeScript", "Tailwind"],
    year: "2025 – Present",
    featured: true,
    accent: "#6d5cff",
    live: "https://my-app-phi-wine-87.vercel.app",
    image: "/projects/uniship.webp",
    frame: "screen",
  },
  {
    slug: "smart-leads",
    title: "Smart Leads Dashboard",
    category: "Full-Stack · Dashboard",
    icon: "leads",
    blurb:
      "Lead management with JWT auth, admin & sales roles, and one-click CSV exports — Dockerized end to end.",
    description:
      "Engineered a lead-management system with JWT authentication, bcrypt password hashing, and Admin / Sales User roles. Added server-side search, filtering, pagination, and admin-only CSV export. Containerized the stack with Docker Compose and deployed to Render.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Docker", "JWT"],
    year: "2025",
    github: "https://github.com/SATYA-1919/Smart-Leads-Dashboard",
    featured: true,
    accent: "#6d5cff",
    image: "/projects/smart-leads.webp",
    frame: "screen",
  },
  {
    slug: "oceanx",
    title: "Grocery App",
    category: "Native Android",
    icon: "grocery",
    blurb:
      "Native Android grocery delivery — a live cart with instant quantity updates, fast search, and a streamlined checkout.",
    description:
      "Developed a native Android grocery-delivery app with a categorized product catalog and a real-time cart with live quantity updates. Built fast client-side search and filtering with a streamlined checkout flow, keeping the UI smooth and responsive.",
    tags: ["Kotlin", "Java", "Android Studio", "XML"],
    year: "2025",
    github: "https://github.com/SATYA-1919/OceanxGroceryApp",
    accent: "#6d5cff",
    image: "/projects/oceanx.webp",
    frame: "phone",
  },
  {
    slug: "task-manager",
    title: "Task Manager",
    category: "Cross-Platform App",
    icon: "tasks",
    blurb:
      "Cross-platform tasks with real-time Firestore sync, Material 3 design, and a daily motivational-quotes feed.",
    description:
      "Built a cross-platform task manager with full CRUD, real-time Firestore sync, and a motivational-quotes feed from a third-party REST API. Applied Material 3 design, form validation, and Firestore composite indexing to keep tasks sorted and the app responsive.",
    tags: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "REST API"],
    year: "2025",
    github: "https://github.com/SATYA-1919/task-manager-app",
    accent: "#6d5cff",
    image: "/projects/task-manager.webp",
    frame: "phone",
  },
  {
    slug: "satellite",
    title: "Autonomous Satellite Planner",
    category: "Python · Hackathon",
    icon: "satellite",
    blurb:
      "Autonomous imaging & attitude-control planner for Earth-observation satellites — SGP4 orbits inside a Basilisk sim.",
    description:
      "TakeMe2Space Hackathon (Lost in Space track). Built an autonomous Python imaging and attitude-control planner using Inertial-Hold TSP and Mosaic Tiling scheduling to improve coverage and efficiency. Modeled accurate satellite paths with SGP4 orbital propagation inside a Basilisk simulation.",
    tags: ["Python", "SGP4", "Basilisk", "Optimization"],
    year: "2025",
    accent: "#6d5cff",
  },
];

// Kept to the core stack — a shorter ribbon reads stronger than a long one.
export const marqueeSkills = [
  "TypeScript", "Next.js", "React", "Flutter", "Kotlin", "Node.js",
  "Firebase", "MongoDB", "Docker", "Python", "Tailwind CSS", "Groq AI",
];
