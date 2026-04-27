export const plans = [
  {
    id: "rust",
    title: "Rust Study Plan",
    duration: "4 weeks",
    level: "Beginner to Advanced",
    description: "Master Rust step by step with hands-on projects and real-world patterns."
  },
  {
    id: "frontend",
    title: "Frontend Developer Plan",
    duration: "6 weeks",
    level: "Beginner",
    description: "Learn HTML, CSS, JS and modern frameworks from the ground up."
  },
  {
    id: "backend",
    title: "Backend Engineering Plan",
    duration: "8 weeks",
    level: "Intermediate",
    description: "Build scalable APIs, databases, and server architecture."
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    duration: "12 weeks",
    level: "Advanced",
    description: "Deep dive into neural networks, NLP, and model deployment."
  }
];

export const roadmapData = {
  rust: [
    {
      id: "basics",
      title: "Rust Basics",
      duration: "3 days",
      lessons: 5,
      description: "Learn Rust syntax, variables, and fundamental concepts.",
      subtopics: ["Variables & Mutability", "Data Types", "Control Flow", "Functions", "Comments"]
    },
    {
      id: "ownership",
      title: "Ownership & Borrowing",
      duration: "5 days",
      lessons: 7,
      description: "Understand Rust's unique memory management model.",
      subtopics: ["Ownership Rules", "References & Borrowing", "Slice Type", "Borrow Checker", "Lifetimes Intro"]
    },
    {
      id: "structs",
      title: "Structs & Enums",
      duration: "4 days",
      lessons: 6,
      description: "Create custom data types and pattern matching.",
      subtopics: ["Defining Structs", "Method Syntax", "Enums & Variants", "Pattern Matching", "Option & Result"]
    },
    {
      id: "collections",
      title: "Collections & Error Handling",
      duration: "4 days",
      lessons: 6,
      description: "Work with vectors, strings, hash maps, and robust error handling.",
      subtopics: ["Vectors", "Strings", "Hash Maps", "panic!", "Result & Option", "Error Propagation"]
    },
    {
      id: "traits",
      title: "Traits & Generics",
      duration: "5 days",
      lessons: 8,
      description: "Write reusable and abstract code with traits and generics.",
      subtopics: ["Generic Data Types", "Traits Defined", "Trait Bounds", "Lifetime Parameters", "Associated Types"]
    },
    {
      id: "projects",
      title: "Final Projects",
      duration: "7 days",
      lessons: 4,
      description: "Apply everything by building CLI tools and web servers.",
      subtopics: ["CLI Calculator", "File Organizer", "Mini HTTP Server", "Multi-threaded Web Server"]
    }
  ],
  frontend: [
    {
      id: "html",
      title: "HTML5 Foundations",
      duration: "3 days",
      lessons: 4,
      description: "Master semantic markup and document structure.",
      subtopics: ["Document Structure", "Semantic Elements", "Forms & Inputs", "Accessibility Basics"]
    },
    {
      id: "css",
      title: "CSS3 Styling",
      duration: "5 days",
      lessons: 7,
      description: "Style beautiful, responsive layouts with modern CSS.",
      subtopics: ["Selectors & Specificity", "Flexbox", "CSS Grid", "Responsive Design", "Animations", "Variables"]
    },
    {
      id: "javascript",
      title: "JavaScript Essentials",
      duration: "7 days",
      lessons: 10,
      description: "Learn DOM manipulation, async programming, and ES6+ features.",
      subtopics: ["Variables & Types", "Functions & Scope", "DOM Manipulation", "Events", "Async/Await", "Fetch API"]
    },
    {
      id: "react",
      title: "React Fundamentals",
      duration: "7 days",
      lessons: 9,
      description: "Build interactive UIs with components, hooks, and state.",
      subtopics: ["JSX", "Components & Props", "useState & useEffect", "Event Handling", "Conditional Rendering", "Lists & Keys"]
    },
    {
      id: "nextjs",
      title: "Next.js & Deployment",
      duration: "4 days",
      lessons: 5,
      description: "Create production-ready apps with SSR and static generation.",
      subtopics: ["App Router", "Server Components", "API Routes", "Deployment (Vercel)", "Performance"]
    }
  ],
  backend: [
    {
      id: "nodejs",
      title: "Node.js Fundamentals",
      duration: "5 days",
      lessons: 7,
      description: "Build server-side applications with JavaScript runtime.",
      subtopics: ["Event Loop", "Modules", "File System", "Streams", "Buffers", "Process Management"]
    },
    {
      id: "express",
      title: "Express.js Framework",
      duration: "5 days",
      lessons: 8,
      description: "Create REST APIs with middleware and routing.",
      subtopics: ["Routing", "Middleware", "Error Handling", "Template Engines", "Authentication", "Validation"]
    },
    {
      id: "databases",
      title: "Databases & ORMs",
      duration: "6 days",
      lessons: 9,
      description: "Work with SQL, NoSQL, and abstraction layers.",
      subtopics: ["PostgreSQL", "MongoDB", "Prisma ORM", "Mongoose", "Migrations", "Indexing"]
    },
    {
      id: "security",
      title: "Security & Auth",
      duration: "4 days",
      lessons: 6,
      description: "Implement JWT, OAuth, and secure best practices.",
      subtopics: ["JWT Tokens", "OAuth2", "Password Hashing", "CORS", "Rate Limiting", "HTTPS"]
    }
  ],
  ai: [
    {
      id: "python",
      title: "Python for AI",
      duration: "5 days",
      lessons: 6,
      description: "Master Python libraries essential for machine learning.",
      subtopics: ["NumPy", "Pandas", "Matplotlib", "Jupyter Notebooks", "Data Preprocessing"]
    },
    {
      id: "ml",
      title: "Machine Learning Basics",
      duration: "7 days",
      lessons: 10,
      description: "Understand supervised and unsupervised learning algorithms.",
      subtopics: ["Linear Regression", "Classification", "Clustering", "Decision Trees", "Model Evaluation"]
    },
    {
      id: "dl",
      title: "Deep Learning",
      duration: "10 days",
      lessons: 14,
      description: "Build neural networks with TensorFlow and PyTorch.",
      subtopics: ["Neural Networks", "CNNs", "RNNs", "Transformers", "Transfer Learning"]
    },
    {
      id: "nlp",
      title: "NLP & Deployment",
      duration: "8 days",
      lessons: 11,
      description: "Process text data and deploy models to production.",
      subtopics: ["Tokenization", "BERT", "GPT Models", "API Deployment", "MLOps Basics"]
    }
  ]
};

