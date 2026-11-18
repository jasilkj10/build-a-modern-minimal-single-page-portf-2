/**
 * ====================================================================
 * PORTFOLIO DATA CONFIGURATION — JASIL KJ
 * ====================================================================
 * Hi Jasil! 👋
 * All your personal info, projects, skills, education, and contact details
 * are configured right here in this one file.
 *
 * Any changes you make here will automatically reflect across the entire site!
 * ====================================================================
 */

const portfolioData = {
  // ------------------------------------------------------------------
  // 1. PERSONAL & HERO SECTION CONFIGURATION
  // ------------------------------------------------------------------
  personal: {
    name: "Jasil KJ",
    role: "AI & CSE Student",
    // Hero pill badge above headline
    badge: "✦ Open to opportunities",
    badgeSubtext: "AI & CSE Student",
    // Main headline split: Part 1 + Part 2 + Radiant Gradient Word
    headlinePart1: "Hi, I'm Jasil KJ",
    headlinePart2: "Building Smarter Things with",
    headlineGradientWord: "AI",
    // Hero description subtext
    subtext: "First-year B.Tech CSE (AI) student at Thejus Engineering College, Thrissur, passionate about AI, code, and building real projects.",
    // Action buttons
    buttons: {
      primary: {
        text: "View Projects",
        href: "#projects"
      },
      secondary: {
        text: "Download Resume",
        href: "#resume"
      }
    },
    // Key facts
    college: "Thejus Engineering College, Thrissur",
    branch: "B.Tech Computer Science & Engineering (Artificial Intelligence)",
    batch: "2024 – 2028 (First Year)",
    location: "Thrissur, Kerala, India",
    email: "jasilkj.official@gmail.com",
    // Path to your portrait photo (you can replace assets/jasil.jpg with any image)
    avatar: "assets/jasil.jpg",
    // URL or file path for your resume (e.g. assets/Jasil_KJ_Resume.pdf)
    resumeUrl: "#resume"
  },

  // ------------------------------------------------------------------
  // 2. ABOUT SECTION CONFIGURATION
  // ------------------------------------------------------------------
  about: {
    badge: "About Me",
    heading: "Curious Mind, Focused on Intelligent Code",
    bio: [
      "I am a first-year Computer Science & Engineering (Artificial Intelligence) student at Thejus Engineering College, Thrissur. My fascination with technology began with a simple question: how can software observe data, identify patterns, and make intelligent decisions in the real world?",
      "Currently, I am developing strong foundations in C programming, data structures, and Python's data science ecosystem. From writing clean terminal scripts to training computer vision classifiers and building AI-assisted web apps, I love turning theoretical algorithms into working, beautiful software."
    ],
    quickFacts: [
      {
        icon: "graduation-cap",
        label: "College",
        value: "Thejus Engineering College",
        sub: "Thrissur, Kerala (KTU)"
      },
      {
        icon: "cpu",
        label: "Branch & Major",
        value: "B.Tech CSE (AI)",
        sub: "Artificial Intelligence Focus"
      },
      {
        icon: "map-pin",
        label: "Location",
        value: "Thrissur, Kerala",
        sub: "India"
      },
      {
        icon: "calendar",
        label: "Batch",
        value: "Class of 2028",
        sub: "1st Year Undergraduate"
      },
      {
        icon: "sparkles",
        label: "Core Interests",
        value: "Machine Learning & AI",
        sub: "Web Development & Open Source"
      },
      {
        icon: "activity",
        label: "Current Status",
        value: "Open to Collaborations",
        sub: "Hackathons, Projects & Mentorship"
      }
    ]
  },

  // ------------------------------------------------------------------
  // 3. SKILLS SECTION CONFIGURATION
  // ------------------------------------------------------------------
  skills: {
    badge: "Skills & Tech Stack",
    heading: "Technologies I Build With",
    subtext: "Technical foundations developed through academic coursework, hands-on projects, and continuous experimentation.",
    categories: [
      {
        title: "Programming Languages",
        items: [
          { name: "Python", level: "Primary", icon: "terminal", note: "Primary language for AI pipelines, data manipulation, automation" },
          { name: "C", level: "Core", icon: "code", note: "Low-level memory management, pointers, and foundational algorithms" },
          { name: "JavaScript", level: "Modern ES6+", icon: "file-code", note: "Interactive web experiences, DOM APIs, and Three.js scripting" },
          { name: "HTML5 / CSS3", level: "Proficient", icon: "layout", note: "Semantic architecture, responsive Tailwind styling, glassmorphic UI" }
        ]
      },
      {
        title: "AI & Machine Learning Basics",
        items: [
          { name: "Machine Learning Basics", level: "Foundational", icon: "brain", note: "Supervised & unsupervised learning, classification, regression" },
          { name: "NumPy & Pandas", level: "Hands-on", icon: "database", note: "Vectorized array calculations, dataset preprocessing, analysis" },
          { name: "Scikit-Learn", level: "Applied", icon: "cpu", note: "Model evaluation, decision trees, feature engineering" },
          { name: "OpenCV (Basics)", level: "Experimental", icon: "eye", note: "Computer vision, image matrices, real-time webcam streams" }
        ]
      },
      {
        title: "Developer Tools & Workflow",
        items: [
          { name: "Git", level: "Version Control", icon: "git-branch", note: "Staging, commits, branching, merging, and pull requests" },
          { name: "GitHub", level: "Active", icon: "github", note: "Code hosting, repositories, open-source project exploration" },
          { name: "VS Code", level: "Environment", icon: "laptop", note: "Debugging, linting, Python virtual environments, extensions" },
          { name: "Linux CLI", level: "Working Knowledge", icon: "command", note: "Bash commands, shell scripts, environment configuration" }
        ]
      }
    ],
    // The "Currently Learning" row requested in the prompt
    currentlyLearning: [
      {
        name: "Deep Learning & PyTorch",
        category: "Artificial Intelligence",
        progress: "In Progress",
        description: "Studying neural networks, backpropagation calculus, and building deep vision models."
      },
      {
        name: "Next.js & Full-Stack AI",
        category: "Web Engineering",
        progress: "In Progress",
        description: "Connecting state-of-the-art LLMs and diffusion APIs with sleek React/Next.js interfaces."
      },
      {
        name: "Mathematics for ML",
        category: "Core Foundations",
        progress: "In Progress",
        description: "Linear algebra, multivariate calculus, optimization, and probability distributions."
      }
    ]
  },

  // ------------------------------------------------------------------
  // 4. PROJECTS SECTION CONFIGURATION (3 Glass Cards with Placeholders)
  // ------------------------------------------------------------------
  projects: {
    badge: "Featured Projects",
    heading: "Turning Ideas Into Working Software",
    subtext: "Selected projects demonstrating my work in Artificial Intelligence, algorithms, and interactive web design.",
    items: [
      {
        id: "study-ai",
        title: "StudyAI — Intelligent Learning Companion",
        tagline: "LLM-Powered Academic Assistant",
        description: "An AI-powered academic study tool built to summarize complex engineering chapters, explain mathematical derivations step-by-step, and generate adaptive practice quizzes using LangChain and modern language models.",
        image: "assets/project-1.svg",
        tags: ["Python", "LangChain", "Streamlit", "OpenAI API", "VectorStore"],
        github: "https://github.com/jasilkj",
        live: "#",
        featured: true
      },
      {
        id: "neural-vision",
        title: "NeuralVision — Real-Time Pattern & Face Detector",
        tagline: "Computer Vision & CNN Classification",
        description: "An interactive computer vision pipeline leveraging OpenCV and lightweight convolutional neural networks to detect faces and classify facial emotional cues from real-time video feeds with sub-50ms latency.",
        image: "assets/project-2.svg",
        tags: ["Python", "OpenCV", "TensorFlow", "NumPy", "Matplotlib"],
        github: "https://github.com/jasilkj",
        live: "#",
        featured: true
      },
      {
        id: "glass-portfolio",
        title: "GlassPortfolio — Modern 3D Web Experience",
        tagline: "Interactive WebGL & Glassmorphism UI",
        description: "My personal digital portfolio crafted with a custom Three.js glossy 3D glass torus knot, dynamic procedural specular reflections, responsive glassmorphism cards, and fluid scroll micro-interactions.",
        image: "assets/project-3.svg",
        tags: ["JavaScript", "Three.js", "Tailwind CSS", "HTML5", "Lucide"],
        github: "https://github.com/jasilkj",
        live: "#",
        featured: true
      }
    ]
  },

  // ------------------------------------------------------------------
  // 5. EDUCATION & TIMELINE CONFIGURATION
  // ------------------------------------------------------------------
  education: {
    badge: "Academic Journey",
    heading: "Education & Milestones",
    subtext: "My academic path in Computer Science and Artificial Intelligence at Thejus Engineering College.",
    timeline: [
      {
        period: "2024 — 2028 (Present)",
        degree: "B.Tech in Computer Science & Engineering (Artificial Intelligence)",
        institution: "Thejus Engineering College, Vellarakkad, Thrissur",
        affiliation: "Affiliated to APJ Abdul Kalam Technological University (KTU)",
        status: "1st Year Undergraduate",
        highlights: [
          "Core coursework: C Programming, Discrete Mathematics, Engineering Physics, and Foundational CS Principles.",
          "Active self-directed learning in Python, Machine Learning libraries, and Data Structures.",
          "Engaging with student technical societies, hackathons, and AI study circles."
        ]
      },
      {
        period: "2022 — 2024",
        degree: "Higher Secondary Education (Plus Two / Class XII)",
        institution: "Science Stream with Computer Science",
        affiliation: "Board of Higher Secondary Examinations, Kerala",
        status: "Completed with High Academic Standing",
        highlights: [
          "Specialized in Computer Science, Mathematics, Physics, and Chemistry.",
          "First exposure to structured programming and algorithmic thinking.",
          "Decided to specialize in Artificial Intelligence for undergraduate engineering."
        ]
      },
      {
        period: "2022",
        degree: "Secondary School Leaving Certificate (SSLC / Class X)",
        institution: "General Education Department, Kerala",
        affiliation: "Kerala State Education Board",
        status: "Completed with Distinction",
        highlights: [
          "Academic distinction across Mathematics, Science, and Social Sciences.",
          "Active participant in school science exhibitions and technical clubs."
        ]
      }
    ]
  },

  // ------------------------------------------------------------------
  // 6. CONTACT SECTION & SOCIAL LINKS
  // ------------------------------------------------------------------
  contact: {
    badge: "Get In Touch",
    heading: "Let's Start a Conversation",
    subtext: "Whether you want to collaborate on an AI project, invite me to a hackathon, or discuss technology — my inbox is always open.",
    email: "jasilkj.official@gmail.com",
    location: "Thrissur, Kerala, India",
    college: "Thejus Engineering College, Thrissur",
    socials: [
      {
        name: "GitHub",
        url: "https://github.com/jasilkj",
        icon: "github",
        handle: "github.com/jasilkj"
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/jasilkj",
        icon: "linkedin",
        handle: "linkedin.com/in/jasilkj"
      },
      {
        name: "Instagram",
        url: "https://instagram.com/jasil.kj",
        icon: "instagram",
        handle: "@jasil.kj"
      },
      {
        name: "Email",
        url: "mailto:jasilkj.official@gmail.com",
        icon: "mail",
        handle: "jasilkj.official@gmail.com"
      }
    ]
  },

  // ------------------------------------------------------------------
  // 7. FOOTER CONFIGURATION
  // ------------------------------------------------------------------
  footer: {
    copyright: "© 2026 Jasil KJ",
    subtitle: "B.Tech CSE (AI) @ Thejus Engineering College, Thrissur",
    links: [
      { label: "Home", href: "#hero" },
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Education", href: "#education" },
      { label: "Contact", href: "#contact" }
    ]
  }
};

// Expose on global window object
if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}

// Module export for Node environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = portfolioData;
}
