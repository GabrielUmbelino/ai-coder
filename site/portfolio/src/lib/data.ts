export const profile = {
  name: "Gabriel Umbelino",
  fullName: "Gabriel Ferreira Umbelino",
  role: "Senior Software Engineer",
  company: "Upsiide — Dig Insights",
  location: "Curitiba, PR — Brazil",
  tagline: "I build interfaces that make complex data feel obvious.",
  email: "gabriel.f.umbelino@gmail.com",
  phone: "+55 (41) 99227-2958",
  linkedin: "https://www.linkedin.com/in/gfumbelino",
  github: "https://github.com/GabrielUmbelino",
  cv: "/gabriel-umbelino-cv.pdf",
  intro: [
    "For more than a decade I've been shipping software for the web — from e-commerce storefronts in Curitiba to a global diagnostics platform at Volvo, to the market-research product used by enterprise brands at Upsiide.",
    "Today I'm a Senior Software Engineer and front-end specialist at Dig Insights, where I design and maintain the React systems behind Upsiide's analytics experience. My work sits where engineering rigour meets product intuition: architecture that scales, interfaces people actually enjoy.",
    "I've led teams as a Tech Lead, built component libraries adopted across multiple products, and worked with distributed teams across South America and Europe. I care about clean code, clear communication, and shipping things that hold up.",
  ],
  stats: [
    { value: "13+", label: "Years shipping" },
    { value: "10", label: "Roles held" },
    { value: "3", label: "Continents shipped to" },
    { value: "5", label: "Frameworks in prod" },
  ],
};

export type Job = {
  company: string;
  role: string;
  period: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
  current?: boolean;
};

export const jobs: Job[] = [
  {
    company: "Dig Insights",
    role: "Senior Software Engineer",
    period: "Nov 2021 — Present",
    start: "2021",
    end: "Now",
    location: "Toronto, Canada — Remote",
    summary:
      "Front-end specialist on Upsiide, a SaaS market-research platform used by global consumer brands.",
    highlights: [
      "Architect and maintain robust React.js solutions across the product surface.",
      "Build dynamic, intuitive interfaces that turn raw survey data into accurate market analysis.",
      "Partner across product and design to support strategic, data-driven decision-making.",
    ],
    stack: ["React", "TypeScript", "Node.js", "GraphQL", "SQL"],
    current: true,
  },
  {
    company: "Medprev",
    role: "Tech Lead",
    period: "Aug 2021 — Nov 2021",
    start: "2021",
    end: "2021",
    location: "Curitiba, Brazil",
    summary:
      "Led the development and restructuring of the system architecture for a healthcare platform.",
    highlights: [
      "Coordinated technical efforts across the engineering team.",
      "Re-architected core services with Vue.js, Node.js and SQL.",
      "Shipped solutions that improved performance and data management for medical applications.",
    ],
    stack: ["Vue.js", "Node.js", "SQL", "Architecture"],
  },
  {
    company: "Medprev",
    role: "Front-end Developer",
    period: "Mar 2021 — Nov 2021",
    start: "2021",
    end: "2021",
    location: "Curitiba, Brazil",
    summary:
      "Delivered multiple products for the medical sector inside a fast-moving health-tech team.",
    highlights: [
      "Built and maintained a Vue.js component library adopted across several applications.",
      "Drove consistency and development efficiency through shared design primitives.",
    ],
    stack: ["Vue.js", "Design Systems", "JavaScript"],
  },
  {
    company: "EPAM Systems",
    role: "Front-end Engineer",
    period: "Jan 2020 — Feb 2021",
    start: "2020",
    end: "2021",
    location: "Katowice, Poland",
    summary:
      "Consulted on a variety of enterprise engagements for one of the world's largest engineering firms.",
    highlights: [
      "Delivered features across Angular and React.js codebases.",
      "Built Node.js services supporting client-facing applications.",
      "Worked embedded in international, multi-timezone delivery teams.",
    ],
    stack: ["React", "Angular", "Node.js"],
  },
  {
    company: "Volvo Trucks",
    role: "Front-end Consultant",
    period: "Jul 2019 — Jan 2020",
    start: "2019",
    end: "2020",
    location: "Curitiba, Brazil",
    summary:
      "Worked on the global diagnostic service platform for Volvo's truck fleet operations.",
    highlights: [
      "Created Node.js microservices with continuous integration and automated testing.",
      "Developed reusable web components using Polymer 3.",
      "Collaborated with a global team spanning South America and Europe.",
    ],
    stack: ["Node.js", "Polymer 3", "CI/CD", "Testing"],
  },
  {
    company: "Hilab",
    role: "Front-End Developer",
    period: "Mar 2018 — Apr 2019",
    start: "2018",
    end: "2019",
    location: "Curitiba, Brazil",
    summary:
      "Built web interfaces for a health-tech lab pioneering remote blood analysis.",
    highlights: [
      "Developed product interfaces in Vue and Angular.",
      "Created REST APIs with Node.js and Express.",
      "Managed GitHub repositories and release workflows.",
    ],
    stack: ["Vue", "Angular", "Express", "Git"],
  },
  {
    company: "IANDev Sistemas",
    role: "Full Stack Developer",
    period: "Nov 2016 — Mar 2018",
    start: "2016",
    end: "2018",
    location: "Curitiba, Brazil",
    summary:
      "Data processing and reporting systems built for business decision-making.",
    highlights: [
      "Constructed single-page applications and JavaScript dashboards.",
      "Built, validated and audited ETL pipelines.",
      "Integrated third-party systems via SQL queries and REST web services.",
    ],
    stack: ["JavaScript", "SQL", "ETL", "Dashboards"],
  },
  {
    company: "Reweb",
    role: "Web Developer",
    period: "Nov 2015 — Nov 2016",
    start: "2015",
    end: "2016",
    location: "Curitiba, Brazil",
    summary: "E-commerce engineering and enablement for retail clients.",
    highlights: [
      "Created responsive storefront layouts on the Ciashop framework.",
      "Built JavaScript plugins and payment platform integrations.",
      "Ran training sessions for retailers, marketing teams and developers.",
    ],
    stack: ["JavaScript", "CSS", "E-commerce"],
  },
  {
    company: "E-GrupoMidia",
    role: "Web Developer",
    period: "Sep 2013 — Oct 2015",
    start: "2013",
    end: "2015",
    location: "Curitiba, Brazil",
    summary: "Websites and online stores for a portfolio of regional brands.",
    highlights: [
      "Developed WordPress sites, plugins and custom themes.",
      "Crafted e-commerce layouts in HTML, CSS and JavaScript.",
      "Implemented payment platform integrations.",
    ],
    stack: ["WordPress", "PHP", "HTML/CSS"],
  },
  {
    company: "NJB Engenharia",
    role: "Programming Trainee",
    period: "Nov 2012 — Aug 2013",
    start: "2012",
    end: "2013",
    location: "Curitiba, Brazil",
    summary: "Where it started — first professional lines of markup and style.",
    highlights: ["Developed interfaces in HTML and CSS."],
    stack: ["HTML", "CSS"],
  },
];

export const education = [
  {
    school: "FIAP",
    degree: "Postgraduate — Software Architecture",
    period: "2024 — 2025",
  },
  {
    school: "FACEAR",
    degree: "Technologist — Systems Analysis & Development",
    period: "2012 — 2016",
  },
];

export const certifications = [
  "React — The Complete Guide (Hooks, Router, Redux)",
  "Clean Code",
  "Node.js — REST APIs with Express & MongoDB",
  "Kubernetes — Pods, Services & ConfigMaps",
  "Vue JS 2 — The Complete Guide (Router & Vuex)",
];

export const skillGroups = [
  {
    title: "Front-end",
    items: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Polymer"],
  },
  {
    title: "Back-end",
    items: ["Node.js", "Express", "REST APIs", "GraphQL", "MongoDB", "SQL"],
  },
  {
    title: "Platform",
    items: ["Kubernetes", "CI/CD", "Automated Testing", "Git", "ETL"],
  },
  {
    title: "Craft",
    items: ["Design Systems", "Clean Code", "Architecture", "Tech Leadership", "Scrum"],
  },
];

export const marquee = [
  "React", "TypeScript", "Node.js", "Next.js", "Vue.js", "Angular",
  "GraphQL", "SQL", "Kubernetes", "Design Systems", "Clean Code", "Scrum",
];

export const projects = [
  {
    title: "Upsiide Analytics",
    kind: "Product Engineering",
    blurb:
      "Interfaces that turn millions of survey responses into decisions global brands can act on.",
    tags: ["React", "Data Viz", "SaaS"],
  },
  {
    title: "Component Library",
    kind: "Design Systems",
    blurb:
      "A Vue component library adopted across multiple products — one language, many surfaces.",
    tags: ["Vue", "Tokens", "Docs"],
  },
  {
    title: "Diagnostics Platform",
    kind: "Enterprise Scale",
    blurb:
      "Microservices and web components powering global truck-fleet diagnostics at Volvo.",
    tags: ["Node.js", "Polymer", "CI/CD"],
  },
  {
    title: "Next Up",
    kind: "In the workshop",
    blurb:
      "Open-source experiments and writing on front-end architecture. Landing here soon.",
    tags: ["Coming soon"],
  },
];

export const nav = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "capabilities", label: "Capabilities" },
  { id: "work", label: "Work" },
  { id: "twin", label: "Ask AI" },
  { id: "contact", label: "Contact" },
];
