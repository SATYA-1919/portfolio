export const profile = {
  name: "Satyaki Tirumal",
  role: "Full-Stack & Mobile Developer",
  tagline: "I build full-stack web platforms, native mobile apps, and AI-powered tools — from placement portals to autonomous satellite planners.",
  location: "Hyderabad, India",
  email: "satya.19.2004@gmail.com",
  phone: "+91 99497 50581",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/SATYA-1919",
    linkedin: "https://linkedin.com/in/satyaki-tirumal-541b98283",
  },
};

export const stats = [
  { value: "6+", label: "Shipped projects" },
  { value: "8+", label: "Languages" },
  { value: "2", label: "Hackathon wins/finals" },
  { value: "3", label: "Platforms: web, mobile, cloud" },
];

export const about = {
  heading: "About me",
  body: [
    "I'm a B.Tech student in Electronics & Computer Engineering at Mahindra University, Hyderabad, who loves turning ambitious ideas into shipped products. My work spans full-stack web apps with Next.js and React, native Android in Kotlin, cross-platform apps with Flutter, and AI features powered by LLMs.",
    "Recently I architected UniShip — a university placement platform with a proctored assessment portal, an in-browser code editor running a Dockerized compiler on an HPC cluster, and Groq-powered auto-grading. I also build for the edge: at the TakeMe2Space hackathon I wrote an autonomous attitude-control planner for Earth-observation satellites using SGP4 propagation inside a Basilisk simulation.",
  ],
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
  /** Optional screenshot in /public/projects/<slug>.jpg|png. Falls back to a
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
    blurb: "Full-stack university placement platform — web + mobile, three user roles.",
    description:
      "Architected a placement platform spanning a Next.js web app and a Flutter mobile app for students, university admins and super admins. Built a proctored online assessment portal with an in-browser code editor and live invigilation dashboard, running a Dockerized compiler on the college's HPC cluster. Integrated the Groq API (Llama 3.3 70B) for auto-grading and an AI resume builder with ATS scoring and PDF export. Three-tier RBAC with Firebase Auth + Firestore and real-time sync.",
    tags: ["Next.js", "React", "Flutter", "Firebase", "Groq", "TypeScript", "Tailwind"],
    year: "2025 – Present",
    featured: true,
    accent: "#6d5cff",
    live: "https://my-app-phi-wine-87.vercel.app",
    image: "/projects/uniship.png",
    frame: "screen",
  },
  {
    slug: "smart-leads",
    title: "Smart Leads Dashboard",
    category: "Full-Stack · Dashboard",
    icon: "leads",
    blurb: "Full-stack lead-management system with JWT auth and role-based access.",
    description:
      "Engineered a lead-management system with JWT authentication, bcrypt password hashing, and Admin / Sales User roles. Added server-side search, filtering, pagination, and admin-only CSV export. Containerized the stack with Docker Compose and deployed to Render.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Docker", "JWT"],
    year: "2025",
    github: "https://github.com/SATYA-1919/Smart-Leads-Dashboard",
    featured: true,
    accent: "#6d5cff",
    image: "/projects/smart-leads.png",
    frame: "screen",
  },
  {
    slug: "oceanx",
    title: "OceanX Grocery App",
    category: "Native Android",
    icon: "grocery",
    blurb: "Native Android grocery-delivery app modeled on Blinkit.",
    description:
      "Developed a native Android grocery-delivery app with a categorized product catalog and a real-time cart with live quantity updates. Built fast client-side search and filtering with a streamlined checkout flow, keeping the UI smooth and responsive.",
    tags: ["Kotlin", "Java", "Android Studio", "XML"],
    year: "2025",
    github: "https://github.com/SATYA-1919/OceanxGroceryApp",
    accent: "#6d5cff",
    image: "/projects/oceanx.jpg",
    frame: "phone",
  },
  {
    slug: "task-manager",
    title: "Flutter Task Manager",
    category: "Cross-Platform App",
    icon: "tasks",
    blurb: "Cross-platform task manager with real-time Firestore sync.",
    description:
      "Built a cross-platform task manager with full CRUD, real-time Firestore sync, and a motivational-quotes feed from a third-party REST API. Applied Material 3 design, form validation, and Firestore composite indexing to keep tasks sorted and the app responsive.",
    tags: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "REST API"],
    year: "2025",
    github: "https://github.com/SATYA-1919/task-manager-app",
    accent: "#6d5cff",
    image: "/projects/task-manager.jpg",
    frame: "phone",
  },
  {
    slug: "satellite",
    title: "Autonomous Satellite Planner",
    category: "Python · Hackathon",
    icon: "satellite",
    blurb: "Imaging & attitude-control planner for Earth-observation satellites.",
    description:
      "TakeMe2Space Hackathon (Lost in Space track). Built an autonomous Python imaging and attitude-control planner using Inertial-Hold TSP and Mosaic Tiling scheduling to improve coverage and efficiency. Modeled accurate satellite paths with SGP4 orbital propagation inside a Basilisk simulation.",
    tags: ["Python", "SGP4", "Basilisk", "Optimization"],
    year: "2025",
    accent: "#6d5cff",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "Dart", "Python", "Java", "Kotlin", "HTML", "CSS"] },
  { group: "Frontend & Mobile", items: ["React", "Next.js", "Tailwind CSS", "Flutter"] },
  { group: "Backend & Databases", items: ["Node.js", "Express.js", "Firebase", "Firestore", "MongoDB", "REST APIs"] },
  { group: "Deployment & Tools", items: ["Docker", "Vercel", "Render", "Railway", "Git / GitHub", "Android Studio"] },
];

export const marqueeSkills = [
  "TypeScript", "Next.js", "React", "Flutter", "Node.js", "Firebase",
  "MongoDB", "Docker", "Python", "Kotlin", "Tailwind CSS", "Groq AI",
  "Express", "Dart", "Java", "Vercel",
];

export const timeline = [
  {
    title: "B.Tech, Electronics & Computer Engineering",
    org: "Mahindra University, Hyderabad",
    period: "Aug 2023 – Present",
    kind: "education",
    points: ["Building full-stack, mobile and AI projects alongside coursework."],
  },
  {
    title: "IoT & Robotics Training Program",
    org: "TechnooK × Cognizance'24, IIT Roorkee",
    period: "Jul 2024 – Aug 2024",
    kind: "experience",
    points: ["Hands-on training in IoT sensor integration and robotics automation under IIT Roorkee's Cognizance programme."],
  },
  {
    title: "Intermediate (Class XII)",
    org: "FIITJEE Jr. College, Miyapur, Hyderabad",
    period: "Jun 2021 – May 2023",
    kind: "education",
    points: [],
  },
];

export const repos = [
  {
    name: "Smart-Leads-Dashboard",
    description: "Full-stack lead-management system — JWT auth, RBAC, CSV export, Docker.",
    language: "TypeScript",
    color: "#3178c6",
    url: "https://github.com/SATYA-1919/Smart-Leads-Dashboard",
    live: "https://smart-leads-dashboard-omega-gold.vercel.app",
  },
  {
    name: "project1",
    description: "Web project built with TypeScript, deployed on Vercel.",
    language: "TypeScript",
    color: "#3178c6",
    url: "https://github.com/SATYA-1919/project1",
    live: "https://project1-two-alpha-33.vercel.app",
  },
  {
    name: "web",
    description: "TypeScript web app deployed on Vercel.",
    language: "TypeScript",
    color: "#3178c6",
    url: "https://github.com/SATYA-1919/web",
    live: "https://web-gamma-rose-87.vercel.app",
  },
  {
    name: "profile1",
    description: "Personal site experiment styled with CSS.",
    language: "CSS",
    color: "#563d7c",
    url: "https://github.com/SATYA-1919/profile1",
    live: "https://sweching.vercel.app",
  },
  {
    name: "task-manager-app",
    description: "Cross-platform Flutter task manager with real-time Firestore sync.",
    language: "Dart",
    color: "#00b4ab",
    url: "https://github.com/SATYA-1919/task-manager-app",
  },
  {
    name: "OceanxGroceryApp",
    description: "Native Android grocery-delivery app modeled on Blinkit.",
    language: "Kotlin",
    color: "#a97bff",
    url: "https://github.com/SATYA-1919/OceanxGroceryApp",
  },
];

export const githubStats = [
  { num: "7", label: "repositories" },
  { num: "10", label: "followers" },
  { num: "4+", label: "languages" },
];

// Profile-card (github.md) data — modeled on the GitHub README hero design.
export const ghProfile = {
  handle: "SATYA-1919",
  location: "Hyderabad, India",
  headline: "Full-stack · App Development",
  subhead: "Electronics & Computer Engineering",
  contributions: 236,
  activeDays: 53,
  longestStreak: 5,
  publicRepos: 6,
  additions: 16427,
  deletions: 4717,
  languages: [
    { name: "TypeScript", pct: 52.5, color: "#4a9eff" },
    { name: "Dart", pct: 15.4, color: "#2dd4bf" },
    { name: "CSS", pct: 11.9, color: "#f472b6" },
    { name: "HTML", pct: 7.4, color: "#fb923c" },
    { name: "Kotlin", pct: 6.7, color: "#b07cff" },
    { name: "other", pct: 6.0, color: "#6b7280" },
  ],
};

export const achievements = [
  {
    title: "TakeMe2Space Hackathon",
    detail: "Autonomous Satellite Control Developer — Lost in Space Track",
    year: "2025",
  },
  {
    title: "LAM Research Lab Hackathon",
    detail: "Semi-finalist — All-India Level",
    year: "2025",
  },
];
