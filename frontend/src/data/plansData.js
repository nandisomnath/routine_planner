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
      subtopics: [
        { id: "variables-mutability", title: "Variables & Mutability" },
        { id: "data-types", title: "Data Types" },
        { id: "control-flow", title: "Control Flow" },
        { id: "functions", title: "Functions" },
        { id: "comments", title: "Comments" }
      ]
    },
    {
      id: "ownership",
      title: "Ownership & Borrowing",
      duration: "5 days",
      lessons: 7,
      description: "Understand Rust's unique memory management model.",
      subtopics: [
        { id: "ownership-rules", title: "Ownership Rules" },
        { id: "references-borrowing", title: "References & Borrowing" },
        { id: "slice-type", title: "Slice Type" },
        { id: "borrow-checker", title: "Borrow Checker" },
        { id: "lifetimes-intro", title: "Lifetimes Intro" }
      ]
    },
    {
      id: "structs",
      title: "Structs & Enums",
      duration: "4 days",
      lessons: 6,
      description: "Create custom data types and pattern matching.",
      subtopics: [
        { id: "defining-structs", title: "Defining Structs" },
        { id: "method-syntax", title: "Method Syntax" },
        { id: "enums-variants", title: "Enums & Variants" },
        { id: "pattern-matching", title: "Pattern Matching" },
        { id: "option-result", title: "Option & Result" }
      ]
    },
    {
      id: "collections",
      title: "Collections & Error Handling",
      duration: "4 days",
      lessons: 6,
      description: "Work with vectors, strings, hash maps, and robust error handling.",
      subtopics: [
        { id: "vectors", title: "Vectors" },
        { id: "strings", title: "Strings" },
        { id: "hash-maps", title: "Hash Maps" },
        { id: "panic", title: "panic!" },
        { id: "result-option", title: "Result & Option" },
        { id: "error-propagation", title: "Error Propagation" }
      ]
    },
    {
      id: "traits",
      title: "Traits & Generics",
      duration: "5 days",
      lessons: 8,
      description: "Write reusable and abstract code with traits and generics.",
      subtopics: [
        { id: "generic-data-types", title: "Generic Data Types" },
        { id: "traits-defined", title: "Traits Defined" },
        { id: "trait-bounds", title: "Trait Bounds" },
        { id: "lifetime-parameters", title: "Lifetime Parameters" },
        { id: "associated-types", title: "Associated Types" }
      ]
    },
    {
      id: "projects",
      title: "Final Projects",
      duration: "7 days",
      lessons: 4,
      description: "Apply everything by building CLI tools and web servers.",
      subtopics: [
        { id: "cli-calculator", title: "CLI Calculator" },
        { id: "file-organizer", title: "File Organizer" },
        { id: "mini-http-server", title: "Mini HTTP Server" },
        { id: "multi-threaded-web-server", title: "Multi-threaded Web Server" }
      ]
    }
  ],
  frontend: [
    {
      id: "html",
      title: "HTML5 Foundations",
      duration: "3 days",
      lessons: 4,
      description: "Master semantic markup and document structure.",
      subtopics: [
        { id: "document-structure", title: "Document Structure" },
        { id: "semantic-elements", title: "Semantic Elements" },
        { id: "forms-inputs", title: "Forms & Inputs" },
        { id: "accessibility-basics", title: "Accessibility Basics" }
      ]
    },
    {
      id: "css",
      title: "CSS3 Styling",
      duration: "5 days",
      lessons: 7,
      description: "Style beautiful, responsive layouts with modern CSS.",
      subtopics: [
        { id: "selectors-specificity", title: "Selectors & Specificity" },
        { id: "flexbox", title: "Flexbox" },
        { id: "css-grid", title: "CSS Grid" },
        { id: "responsive-design", title: "Responsive Design" },
        { id: "animations", title: "Animations" },
        { id: "variables", title: "Variables" }
      ]
    },
    {
      id: "javascript",
      title: "JavaScript Essentials",
      duration: "7 days",
      lessons: 10,
      description: "Learn DOM manipulation, async programming, and ES6+ features.",
      subtopics: [
        { id: "variables-types", title: "Variables & Types" },
        { id: "functions-scope", title: "Functions & Scope" },
        { id: "dom-manipulation", title: "DOM Manipulation" },
        { id: "events", title: "Events" },
        { id: "async-await", title: "Async/Await" },
        { id: "fetch-api", title: "Fetch API" }
      ]
    },
    {
      id: "react",
      title: "React Fundamentals",
      duration: "7 days",
      lessons: 9,
      description: "Build interactive UIs with components, hooks, and state.",
      subtopics: [
        { id: "jsx", title: "JSX" },
        { id: "components-props", title: "Components & Props" },
        { id: "usestate-useeffect", title: "useState & useEffect" },
        { id: "event-handling", title: "Event Handling" },
        { id: "conditional-rendering", title: "Conditional Rendering" },
        { id: "lists-keys", title: "Lists & Keys" }
      ]
    },
    {
      id: "nextjs",
      title: "Next.js & Deployment",
      duration: "4 days",
      lessons: 5,
      description: "Create production-ready apps with SSR and static generation.",
      subtopics: [
        { id: "app-router", title: "App Router" },
        { id: "server-components", title: "Server Components" },
        { id: "api-routes", title: "API Routes" },
        { id: "deployment-vercel", title: "Deployment (Vercel)" },
        { id: "performance", title: "Performance" }
      ]
    }
  ],
  backend: [
    {
      id: "nodejs",
      title: "Node.js Fundamentals",
      duration: "5 days",
      lessons: 7,
      description: "Build server-side applications with JavaScript runtime.",
      subtopics: [
        { id: "event-loop", title: "Event Loop" },
        { id: "modules", title: "Modules" },
        { id: "file-system", title: "File System" },
        { id: "streams", title: "Streams" },
        { id: "buffers", title: "Buffers" },
        { id: "process-management", title: "Process Management" }
      ]
    },
    {
      id: "express",
      title: "Express.js Framework",
      duration: "5 days",
      lessons: 8,
      description: "Create REST APIs with middleware and routing.",
      subtopics: [
        { id: "routing", title: "Routing" },
        { id: "middleware", title: "Middleware" },
        { id: "error-handling", title: "Error Handling" },
        { id: "template-engines", title: "Template Engines" },
        { id: "authentication", title: "Authentication" },
        { id: "validation", title: "Validation" }
      ]
    },
    {
      id: "databases",
      title: "Databases & ORMs",
      duration: "6 days",
      lessons: 9,
      description: "Work with SQL, NoSQL, and abstraction layers.",
      subtopics: [
        { id: "postgresql", title: "PostgreSQL" },
        { id: "mongodb", title: "MongoDB" },
        { id: "prisma-orm", title: "Prisma ORM" },
        { id: "mongoose", title: "Mongoose" },
        { id: "migrations", title: "Migrations" },
        { id: "indexing", title: "Indexing" }
      ]
    },
    {
      id: "security",
      title: "Security & Auth",
      duration: "4 days",
      lessons: 6,
      description: "Implement JWT, OAuth, and secure best practices.",
      subtopics: [
        { id: "jwt-tokens", title: "JWT Tokens" },
        { id: "oauth2", title: "OAuth2" },
        { id: "password-hashing", title: "Password Hashing" },
        { id: "cors", title: "CORS" },
        { id: "rate-limiting", title: "Rate Limiting" },
        { id: "https", title: "HTTPS" }
      ]
    }
  ],
  ai: [
    {
      id: "python",
      title: "Python for AI",
      duration: "5 days",
      lessons: 6,
      description: "Master Python libraries essential for machine learning.",
      subtopics: [
        { id: "numpy", title: "NumPy" },
        { id: "pandas", title: "Pandas" },
        { id: "matplotlib", title: "Matplotlib" },
        { id: "jupyter-notebooks", title: "Jupyter Notebooks" },
        { id: "data-preprocessing", title: "Data Preprocessing" }
      ]
    },
    {
      id: "ml",
      title: "Machine Learning Basics",
      duration: "7 days",
      lessons: 10,
      description: "Understand supervised and unsupervised learning algorithms.",
      subtopics: [
        { id: "linear-regression", title: "Linear Regression" },
        { id: "classification", title: "Classification" },
        { id: "clustering", title: "Clustering" },
        { id: "decision-trees", title: "Decision Trees" },
        { id: "model-evaluation", title: "Model Evaluation" }
      ]
    },
    {
      id: "dl",
      title: "Deep Learning",
      duration: "10 days",
      lessons: 14,
      description: "Build neural networks with TensorFlow and PyTorch.",
      subtopics: [
        { id: "neural-networks", title: "Neural Networks" },
        { id: "cnns", title: "CNNs" },
        { id: "rnns", title: "RNNs" },
        { id: "transformers", title: "Transformers" },
        { id: "transfer-learning", title: "Transfer Learning" }
      ]
    },
    {
      id: "nlp",
      title: "NLP & Deployment",
      duration: "8 days",
      lessons: 11,
      description: "Process text data and deploy models to production.",
      subtopics: [
        { id: "tokenization", title: "Tokenization" },
        { id: "bert", title: "BERT" },
        { id: "gpt-models", title: "GPT Models" },
        { id: "api-deployment", title: "API Deployment" },
        { id: "mlops-basics", title: "MLOps Basics" }
      ]
    }
  ]
};

