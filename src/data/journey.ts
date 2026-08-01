export type JourneyStep = {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
};

export const journey: JourneyStep[] = [
  {
    id: "software-developer",
    title: "Software Developer",
    organization: "Personal & Academic Projects",
    date: "2026 — Present",
    description: "Developing real-world software projects using Java, Spring Boot, React, databases, and AI technologies, while building practical experience in full-stack and backend development."
  },
  {
    id: "cse",
    title: "Computer Science Engineering Student",
    organization: "Sri Krishna College of Engineering and Technology (SKCET)",
    date: "2024 — Present",
    description: "Pursuing a Bachelor's degree in Computer Science and Engineering, while developing strong foundations in Java, C++, Python, data structures, algorithms, databases, React.js, and Spring Boot. Actively building projects and exploring emerging technologies."
  },
  {
    id: "projects-hackathons",
    title: "Projects, Hackathons & Technical Growth",
    organization: "Personal & Academic",
    date: "2025 — Present",
    description: "Developing practical software projects including an E-Commerce Website, Transportation Route Optimization API, Credit Card Reward Maximizer, Journal Paper Analyser, and Single File Programming projects. Participated in Smart India Hackathon and other technical events, gaining experience in problem-solving, teamwork, and building technology-driven solutions."
  },
  {
    id: "higher-secondary",
    title: "Higher Secondary Education",
    organization: "Dr. Chanderlekha Memorial Matric Higher Secondary School",
    date: "2024 — 2025",
    description: "Completed higher secondary education with a focus on academics and developed an early interest in computer science, programming, and technology."
  },
  {
    id: "secondary",
    title: "Secondary Education",
    organization: "Eklavya Model Residential School",
    date: "2022 — 2024",
    description: "Completed secondary education while building a strong academic foundation and developing an interest in technology and problem-solving."
  }
];

export type Achievement = {
  id: string;
  event: string;
  role: string;
  problem: string;
  stack: string[];
  outcome: string;
};

export const achievements: Achievement[] = [
  {
    id: "suraksha-cyber-hackathon-2",
    event: "SuRaksha Cyber Hackathon 2.0",
    role: "Hackathon Participant",
    problem: "Participated in a cybersecurity-focused hackathon, exploring practical approaches to security challenges and applying software engineering concepts in a time-bound environment.",
    stack: ["Cybersecurity", "Problem Solving", "Teamwork"],
    outcome: "Strengthened collaborative problem-solving and rapid solution development under competitive conditions.",
  },
  {
    id: "msme-hackathon-6",
    event: "MSME Hackathon 6.0",
    role: "Hackathon Participant",
    problem: "Participated in an innovation-focused hackathon aimed at developing technology-driven solutions for real-world industry and business challenges.",
    stack: ["Innovation", "Software Development", "Teamwork"],
    outcome: "Gained experience in rapid prototyping, idea validation, and designing practical technology solutions.",
  },
  {
    id: "nitt-national-hackathon",
    event: "NITT National Level Hackathon",
    role: "Hackathon Participant",
    problem: "Participated in a national-level hackathon, applying software engineering, AI/ML concepts, and problem-solving skills to develop solutions within a limited timeframe.",
    stack: ["AI / ML", "Problem Solving", "Teamwork"],
    outcome: "Built experience working collaboratively, exploring technical solutions, and delivering under competitive time constraints.",
  },
  {
    id: "smart-india-hackathon",
    event: "Smart India Hackathon",
    role: "Hackathon Participant",
    problem: "Participated in Smart India Hackathon, working on technology-driven problem solving and gaining experience in collaborative innovation.",
    stack: ["Problem Solving", "Innovation", "Teamwork"],
    outcome: "Developed practical experience in understanding real-world problems and working toward technology-based solutions.",
  },
];
