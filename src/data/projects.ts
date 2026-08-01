export type Project = {
  id: string;
  name: string;
  description: string;
  stack: string[];
  github: string;
  demo: string;
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  challenges: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    id: "credit-card-reward-maximizer",
    name: "Credit Card Reward Maximizer",
    description:
      "A Spring Boot backend that helps users pick the credit card that maximizes rewards for a given purchase category.",
    stack: ["Spring Boot", "Hibernate / JPA", "MySQL", "JWT", "Swagger", "Maven"],
    github: "#", // TODO: add repo link
    demo: "#", // TODO: add live demo link if available
    problem:
      "Reward structures vary across cards and categories, making it hard for a user to know which card actually gives the best return on a purchase.",
    solution:
      "A REST API that stores card reward rules and returns the optimal card for a given spend category, secured with JWT-based authentication.",
    architecture:
      "Layered Spring Boot architecture (controller → service → repository) backed by MySQL, with Hibernate/JPA for the persistence layer and Swagger for interactive API documentation.",
    features: [
      "JWT-secured authentication and authorization",
      "Reward-rule engine per card and spend category",
      "Swagger UI for exploring and testing endpoints",
      "Maven-based build and dependency management",
    ],
    challenges:
      "Designing a data model flexible enough to represent very different reward structures (flat cashback, tiered categories, rotating bonuses) without over-complicating the schema.",
    outcome:
      "A working backend service with documented, authenticated endpoints for comparing card rewards by category.",
  },
  {
    id: "stylefashion",
    name: "StyleFashion",
    description:
      "A full-stack e-commerce style front-end for a fashion catalog, backed by a Node.js/Express API and MongoDB.",
    stack: ["React", "HTML/CSS/JavaScript", "Node.js", "Express.js", "MongoDB"],
    github: "#",
    demo: "#",
    problem:
      "Small fashion catalogs need a lightweight, custom storefront rather than a heavyweight, hard-to-customize e-commerce platform.",
    solution:
      "A React front-end consuming a Node.js/Express REST API, with MongoDB storing product, category, and cart data.",
    architecture:
      "Client-server architecture: React SPA on the frontend, Express REST API on the backend, MongoDB as the document store.",
    features: [
      "Product catalog with category browsing",
      "Cart and checkout flow",
      "Responsive layout across devices",
      "REST API for product and order data",
    ],
    challenges:
      "Keeping state management simple on the frontend while the product catalog and cart logic grew more complex.",
    outcome: "A functional catalog-to-cart shopping flow built end-to-end across the MERN-style stack.",
  },
  {
    id: "cloudops-insight",
    name: "CloudOps Insight",
    description:
      "A dashboard for visualizing cloud/DevOps metrics with animated charts and a modern, glassmorphic interface.",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Recharts"],
    github: "#",
    demo: "#",
    problem:
      "Raw infrastructure metrics are hard to read at a glance; teams need a visual layer that surfaces trends quickly.",
    solution:
      "A React + Vite dashboard that renders metrics as interactive Recharts visualizations, animated with Framer Motion.",
    architecture:
      "Component-driven Vite/React app with a dedicated charting layer (Recharts) and Tailwind CSS for a consistent design system.",
    features: [
      "Interactive, animated charts",
      "Tailwind-based design system",
      "Fast Vite dev/build pipeline",
      "Responsive dashboard layout",
    ],
    challenges: "Balancing chart animation richness against rendering performance on larger datasets.",
    outcome: "A responsive metrics dashboard demonstrating a modern React + data-visualization workflow.",
  },
  {
    id: "course-management-system",
    name: "Course Management System",
    description:
      "A full-stack application for managing courses, enrollments, and student records.",
    stack: ["React", "Spring Boot", "MySQL"],
    github: "#",
    demo: "#",
    problem: "Manually tracking course offerings and student enrollment quickly becomes error-prone at scale.",
    solution:
      "A React frontend talking to a Spring Boot REST API, with MySQL storing courses, students, and enrollment records.",
    architecture:
      "Three-tier architecture: React client, Spring Boot REST API, MySQL relational database.",
    features: [
      "Course creation and management",
      "Student enrollment tracking",
      "REST API-driven data flow",
      "Relational schema for courses and students",
    ],
    challenges: "Modeling many-to-many relationships between students and courses cleanly in the schema.",
    outcome: "A working system for creating courses and managing enrollments through a REST API.",
  },
  {
    id: "expense-splitter",
    name: "Expense Splitter",
    description:
      "An application for splitting shared expenses between groups of people, similar to Splitwise.",
    stack: ["React", "Spring Boot", "MySQL"],
    github: "#",
    demo: "#",
    problem: "Splitting shared costs fairly across a group and tracking who owes whom is tedious to do manually.",
    solution:
      "A React frontend and Spring Boot backend that calculates balances between group members based on logged expenses.",
    architecture:
      "React client communicating with a Spring Boot REST API backed by a MySQL database for users, groups, and expenses.",
    features: [
      "Group and expense creation",
      "Automatic balance calculation between members",
      "REST API for expense data",
      "MySQL-backed persistence",
    ],
    challenges: "Getting the balance-settlement math right so debts net out correctly across a group.",
    outcome: "A functioning expense-splitting flow from expense entry to calculated balances.",
  },
  {
    id: "e-commerce-website",
    name: "E-Commerce Website",
    description: "An e-commerce web application focused on a smooth product-discovery and shopping experience.",
    stack: ["React", "JavaScript", "REST APIs", "MongoDB"],
    github: "#",
    demo: "#",
    problem: "Online shoppers need a clear, responsive way to discover products and manage a purchase journey.",
    solution: "A web application that brings catalog browsing, product details, and shopping interactions into one responsive experience.",
    architecture: "Frontend application connected to RESTful services and a database-backed product catalog.",
    features: ["Product browsing", "Responsive user interface", "Product-detail views", "Shopping workflow"],
    challenges: "Keeping the browsing and shopping experience simple while organizing product data cleanly.",
    outcome: "A practical e-commerce build demonstrating end-to-end web application development.",
  },
  {
    id: "transportation-route-optimization-api",
    name: "Transportation Route Optimization API",
    description: "An API-focused project for exploring efficient transportation route planning.",
    stack: ["Java", "Spring Boot", "REST APIs", "Algorithms"],
    github: "#",
    demo: "#",
    problem: "Transportation planning needs efficient route choices when multiple paths and constraints are involved.",
    solution: "A REST API that models route-planning inputs and returns optimized transportation route information.",
    architecture: "Spring Boot service organized into controller, service, and data layers with API endpoints for route queries.",
    features: ["Route-planning API endpoints", "Structured request and response data", "Algorithm-oriented solution design", "RESTful service layer"],
    challenges: "Translating route-optimization logic into clear, reliable API contracts.",
    outcome: "A backend project connecting algorithmic problem solving with real-world transportation use cases.",
  },
  {
    id: "journal-paper-analyser",
    name: "Journal Paper Analyser",
    description: "An AI-oriented project for helping users explore and understand journal-paper content.",
    stack: ["Python", "Machine Learning", "AI", "Text Analysis"],
    github: "#",
    demo: "#",
    problem: "Research papers can be time-consuming to review, especially when readers need to locate essential ideas quickly.",
    solution: "An analysis workflow that helps surface useful information from journal-paper content.",
    architecture: "Text-processing and analysis components organized around document input, content analysis, and result presentation.",
    features: ["Journal-paper content analysis", "AI-oriented text processing", "Focused insight extraction", "Research-support workflow"],
    challenges: "Presenting useful analysis without losing the context and nuance of technical writing.",
    outcome: "An AI/ML exploration project applying software skills to research-document analysis.",
  },
  {
    id: "ecotrace-ai",
    name: "EcoTrace AI",
    description: "An AI-focused project exploring technology-assisted environmental awareness and tracking.",
    stack: ["AI", "Machine Learning", "React", "REST APIs"],
    github: "#",
    demo: "#",
    problem: "Sustainability information is difficult to translate into clear, actionable digital experiences.",
    solution: "A project concept that applies AI-assisted insights to make environmental tracking more accessible.",
    architecture: "A client interface connected to an analysis layer for environmental data and AI-driven insights.",
    features: ["Environmental tracking concept", "AI-assisted insights", "Interactive user interface", "Data-driven workflow"],
    challenges: "Making environmental data understandable and useful for everyday users.",
    outcome: "A project combining AI interests with a real-world sustainability theme.",
  },
  {
    id: "cybersecurity-hackathon-projects",
    name: "Cybersecurity & Hackathon Projects",
    description: "Security-focused prototypes and rapid builds developed through hackathon participation.",
    stack: ["Cybersecurity", "Java", "APIs", "AI / ML"],
    github: "#",
    demo: "#",
    problem: "Hackathons demand fast, practical approaches to complex cybersecurity and technology challenges.",
    solution: "Collaborative prototypes that apply software engineering and problem-solving skills to challenge statements.",
    architecture: "Project architecture varies by challenge, with an emphasis on an achievable prototype and clear data flow.",
    features: ["Rapid prototyping", "Collaborative development", "Security-oriented thinking", "Challenge-driven delivery"],
    challenges: "Prioritizing a useful, demonstrable solution within strict hackathon timelines.",
    outcome: "Hands-on experience turning ideas into working technical prototypes under time pressure.",
  },
];
