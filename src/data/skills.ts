export type Skill = {
  id: string;
  name: string;
  category: "Programming & Problem Solving" | "Full-Stack Development" | "Backend Engineering" | "AI & Machine Learning" | "Tools & Testing" | "Innovation & Continuous Learning" | "Beyond the Code";
  connections: string[]; // ids of related skills, drawn as connecting lines
};

export const skills: Skill[] = [
  // Programming & Problem Solving
  { id: "java", name: "Java", category: "Programming & Problem Solving", connections: ["springboot", "dsa", "hibernate"] },
  { id: "cpp", name: "C++", category: "Programming & Problem Solving", connections: ["dsa"] },
  { id: "python", name: "Python", category: "Programming & Problem Solving", connections: ["ml", "ai", "deeplearning", "dsa"] },
  { id: "dsa", name: "Data Structures & Algorithms", category: "Programming & Problem Solving", connections: ["java", "cpp", "python"] },
  
  // Full-Stack Development
  { id: "react", name: "React.js", category: "Full-Stack Development", connections: ["js", "html", "css"] },
  { id: "js", name: "JavaScript", category: "Full-Stack Development", connections: ["react", "html", "node"] },
  { id: "html", name: "HTML", category: "Full-Stack Development", connections: ["css", "js", "react"] },
  { id: "css", name: "CSS", category: "Full-Stack Development", connections: ["html", "react"] },
  { id: "springboot", name: "Spring Boot", category: "Full-Stack Development", connections: ["java", "restapi", "mysql", "hibernate", "jwt", "maven"] },
  { id: "node", name: "Node.js", category: "Full-Stack Development", connections: ["restapi", "js", "mongodb"] },
  { id: "restapi", name: "REST APIs", category: "Full-Stack Development", connections: ["springboot", "node", "jwt", "swagger"] },
  { id: "jwt", name: "JWT Authentication", category: "Full-Stack Development", connections: ["springboot", "restapi"] },
  
  // Backend Engineering
  { id: "hibernate", name: "Hibernate / JPA", category: "Backend Engineering", connections: ["springboot", "java", "mysql"] },
  { id: "mysql", name: "MySQL", category: "Backend Engineering", connections: ["springboot", "dbms", "hibernate"] },
  { id: "mongodb", name: "MongoDB", category: "Backend Engineering", connections: ["node"] },
  
  // AI & Machine Learning
  { id: "ml", name: "Machine Learning", category: "AI & Machine Learning", connections: ["python", "ai", "deeplearning"] },
  { id: "ai", name: "Artificial Intelligence", category: "AI & Machine Learning", connections: ["python", "ml", "deeplearning", "aiagents"] },
  { id: "deeplearning", name: "Deep Learning", category: "AI & Machine Learning", connections: ["python", "ml", "ai"] },
  { id: "aiagents", name: "AI Agents", category: "AI & Machine Learning", connections: ["ai", "python"] },
  { id: "python-datascience", name: "Python for Data Science", category: "AI & Machine Learning", connections: ["python", "ml", "ai"] },
  
  // Tools & Testing
  { id: "git", name: "Git & GitHub", category: "Tools & Testing", connections: [] },
  { id: "selenium", name: "Selenium", category: "Tools & Testing", connections: ["java"] },
  { id: "swagger", name: "Swagger / OpenAPI", category: "Tools & Testing", connections: ["restapi"] },
  { id: "maven", name: "Maven", category: "Tools & Testing", connections: ["java", "springboot"] },
  
  // Innovation & Continuous Learning
  { id: "hackathons", name: "Hackathons", category: "Innovation & Continuous Learning", connections: [] },
  { id: "prototyping", name: "Rapid Prototyping", category: "Innovation & Continuous Learning", connections: [] },
  { id: "problem-solving", name: "Problem Solving", category: "Innovation & Continuous Learning", connections: ["dsa"] },
  { id: "teamwork", name: "Teamwork", category: "Innovation & Continuous Learning", connections: [] },
  { id: "innovation", name: "Innovation", category: "Innovation & Continuous Learning", connections: [] },
  
  // Beyond the Code
  { id: "cricket", name: "Cricket", category: "Beyond the Code", connections: [] },
  { id: "athletics", name: "Athletics", category: "Beyond the Code", connections: [] },
  { id: "kabaddi", name: "Kabaddi", category: "Beyond the Code", connections: [] },
];

export const categories = ["Programming & Problem Solving", "Full-Stack Development", "Backend Engineering", "AI & Machine Learning", "Tools & Testing", "Innovation & Continuous Learning", "Beyond the Code"] as const;
