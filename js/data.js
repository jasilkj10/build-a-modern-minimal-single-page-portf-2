/**
 * ====================================================================
 * PORTFOLIO DATA CONFIGURATION
 * ====================================================================
 * Hi Jasil! All personal information, projects, skills, education,
 * and contact links are located right here. Edit any field below to
 * automatically update the website.
 */

const portfolioData = {
  // Personal & Hero Info
  personal: {
    name: "Jasil KJ",
    role: "AI & CSE Student",
    headlinePart1: "Hi, I'm Jasil KJ",
    headlinePart2: "Building Smarter Things with AI",
    subtext: "First-year B.Tech CSE (AI) student at Thejus Engineering College, Thrissur, passionate about AI, code, and building real projects.",
    badge: "✦ AI & CSE Student",
    availabilityBadge: "✦ Open to opportunities",
    location: "Thrissur, Kerala, India",
    college: "Thejus Engineering College, Thrissur",
    degree: "B.Tech CSE (Artificial Intelligence)",
    batch: "2024 – 2028 (1st Year)",
    email: "jasilkj.official@gmail.com",
    avatar: "assets/avatar.svg",
    resumeUrl: "#resume",
    buttons: {
      primary: { text: "View Projects", href: "#projects" },
      secondary: { text: "Download Resume", href: "#resume" }
    }
  },

  // About Section Details
  about: {
    sectionBadge: "About Me",
    heading: "Passionate About Machine Learning, Code & Building Real Solutions",
    bio: [
      "I am a first-year Computer Science & Engineering (Artificial Intelligence) student at Thejus Engineering College, Thrissur. My journey started with curiosity about how machines learn, reason, and solve complex human problems.",
      "Right now, I am building strong fundamentals in algorithms, C programming, and Python data science libraries. I love bridging theoretical AI concepts with clean, functional code, constantly experimenting with generative AI, neural networks, and interactive applications."
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
        label: "Specialization",
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
        label: "Graduation Batch",
        value: "Class of 2028",
        sub: "First Year Student"
      },
      {
        icon: "sparkles",
        label: "Core Interests",
        value: "Machine Learning & AI",
        sub: "Full-Stack Dev & Open Source"
      },
      {
        icon: "activity",
        label: "Status",
        value: "Active & Learning",
        sub: "Hackathons & Collaborations"
      }
    ]
  },

  // Skills Section Details
  skills: {
    sectionBadge: "Skills & Tech",
    heading: "Technologies & Tools I Work With",
    subtext: "Foundations I have developed through coursework, personal projects, and continuous self-study.",
    categories: [
      {
        title: "Programming Languages",
        items: [
          { name: "Python", level: "Intermediate", icon: "terminal", note: "Primary language for AI, data scripting, and automation" },
          { name: "C", level: "Academic Core", icon: "code", note: "Pointers, memory management, and low-level CS logic" },
          { name: "JavaScript", level: "Working Knowledge", icon: "file-code", note: "Modern ES6+, DOM manipulation, web interactivity" },
          { name: "HTML5 / CSS3", level: "Proficient", icon: "layout", note: "Semantic structures, Flexbox, Grid, and Tailwind styling" }
        ]
      },
      {
        title: "AI & Data Science Basics",
        items: [
          { name: "Machine Learning Basics", level: "Foundational", icon: "brain", note: "Regression, classification, supervised learning fundamentals" },
          { name: "NumPy & Pandas", level: "Hands-on", icon: "database", note: "Data manipulation, arrays, matrix operations" },
          { name: "Scikit-Learn", level: "Learning", icon: "cpu", note: "Model training, evaluation metrics, pipeline basics" },
          { name: "OpenCV (Basics)", level: "Experimental", icon: "eye", note: "Image filtering, edge detection, video stream capture" }
        ]
      },
      {
        title: "Developer Tools & Workflow",
        items: [
          { name: "Git", level: "Version Control", icon: "git-branch", note: "Branching, commits, merging, staging workflows" },
          { name: "GitHub", level: "Active", icon: "github", note: "Repository hosting, collaboration, open-source projects" },
          { name: "VS Code", level: "Daily Driver", icon: "laptop", note: "Debugging, extensions, Python environment management" },
          { name: "Linux Basics", level: "Familiar", icon: "command", note: "CLI navigation, bash scripts, package management" }
        ]
      }
    ],
    currentlyLearning: [
      {
        name: "Deep Learning & PyTorch",
        category: "Artificial Intelligence",
        progress: "In Progress",
        description: "Studying neural network architectures, backpropagation, and tensor operations."
      },
      {
        name: "Next.js & Full-Stack AI",
        category: "Web Engineering",
        progress: "In Progress",
        description: "Connecting intelligent backend APIs with sleek, reactive front-end interfaces."
      },
      {
        name: "Mathematics for Machine Learning",
        category: "Core Theory",
        progress: "In Progress",
        description: "Linear algebra, multivariate calculus, and probability distributions."
      }
    ]
  },

  // Projects Section Details
  projects: {
    sectionBadge: "Featured Work",
    heading: "Things I've Built & Explored",
    subtext: "A selection of projects exploring Artificial Intelligence, computer science fundamentals, and interactive user experiences.",
    items: [
      {
        id: "study-ai",
        title: "StudyAI — Intelligent Learning Assistant",
        tagline: "LLM-Powered Academic Study Companion",
        description: "A contextual study tool built for engineering students to summarize complex textbook chapters, generate step-by-step mathematical explanations, and produce customized practice quiz sets using LangChain and modern LLM APIs.",
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
        description: "An interactive computer vision experiment utilizing OpenCV and a convolutional neural network backbone to detect faces and classify facial emotional cues from real-time webcam streams with real-time confidence scores.",
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
        description: "My personal digital portfolio featuring an interactive Three.js 3D glass torus knot with dynamic specular highlights, smooth scroll-spy navigation, fluid micro-interactions, and a responsive dark aesthetic.",
        image: "assets/project-3.svg",
        tags: ["JavaScript", "Three.js", "Tailwind CSS", "HTML5", "Lucide"],
        github: "https://github.com/jasilkj",
        live: "#",
        featured: true
      }
    ]
  },

  // Education & Timeline Section Details
  education: {
    sectionBadge: "Academic Journey",
    heading: "Education & Milestones",
    subtext: "My educational path in Computer Science and Artificial Intelligence.",
    timeline: [
      {
        period: "2024 — 2028 (Present)",
        degree: "B.Tech in Computer Science & Engineering (Artificial Intelligence)",
        institution: "Thejus Engineering College, Vellarakkad, Thrissur",
        affiliation: "Affiliated to APJ Abdul Kalam Technological University (KTU)",
        status: "Currently in 1st Year",
        highlights: [
          "Core coursework: C Programming, Discrete Mathematics, Engineering Physics, and Foundational CS Principles.",
          "Active self-directed learning in Python, Machine Learning libraries, and Data Structures.",
          "Engaging with student technical societies, hackathons, and AI study circles."
        ]
      },
      {
        period: "2022 — 2024",
        degree: "Higher Secondary Education (Plus Two / Class XII)",
        institution: "Science with Computer Science Stream",
        affiliation: "Board of Higher Secondary Examinations, Kerala",
        status: "Completed with High Academic Standing",
        highlights: [
          "Specialized in Computer Science, Mathematics, Physics, and Chemistry.",
          "First exposure to C++ and object-oriented programming concepts.",
          "Developed passion for technology and pursued higher education in AI."
        ]
      },
      {
        period: "2022",
        degree: "Secondary School Leaving Certificate (SSLC / Class X)",
        institution: "General Education Department, Kerala",
        affiliation: "Kerala State Board",
        status: "Completed with Distinction",
        highlights: [
          "Excellence across sciences and mathematics.",
          "Active participant in school science exhibitions and computer clubs."
        ]
      }
    ]
  },

  // Contact Section Details
  contact: {
    sectionBadge: "Get in Touch",
    heading: "Let's Connect & Build Together",
    subtext: "I'm always eager to collaborate on AI projects, participate in hackathons, or discuss exciting engineering ideas. Drop me a line anytime!",
    email: "jasilkj.official@gmail.com",
    location: "Thrissur, Kerala, India",
    socials: [
      { name: "GitHub", url: "https://github.com/jasilkj", icon: "github", label: "github.com/jasilkj" },
      { name: "LinkedIn", url: "https://linkedin.com/in/jasilkj", icon: "linkedin", label: "linkedin.com/in/jasilkj" },
      { name: "Instagram", url: "https://instagram.com/jasil.kj", icon: "instagram", label: "@jasil.kj" },
      { name: "Email", url: "mailto:jasilkj.official@gmail.com", icon: "mail", label: "jasilkj.official@gmail.com" }
    ]
  },

  // Footer Details
  footer: {
    copyright: "© 2026 Jasil KJ",
    tagline: "Designed with precision. Crafted for the future of AI.",
    links: [
      { label: "Hero", href: "#hero" },
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Education", href: "#education" },
      { label: "Contact", href: "#contact" }
    ]
  }
};

// Make available globally in browser window
if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}

// Support Node/ES exports if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = portfolioData;
}
