
import { projectSchema } from "@/types/content";

export const projects = projectSchema.array().parse([
  {
  slug: "kap-controls",
  title: "KAP Controls Website",
  summary:
    "Worked on frontend UI implementation and migrated existing backend functionality from Node.js and Express.js to Supabase under the guidance of a senior developer.",
  featured: true,
  status: "published",
  liveUrl: "https://www.kapcontrols.com/",
  githubUrl: null,
  image: null,
  technologies: [
    "React.js",
    "JavaScript",
    "Node.js",
    "Express.js",
    "Supabase",
  ],
  role: "Web Developer",
  timeframe: "September 2025",
  caseStudy: {
    overview:
      "Contributed to the KAP Controls website by working on frontend implementation and backend migration tasks.",
    problem:
      "The project required migrating existing backend functionality to Supabase while maintaining frontend integration.",
    solution:
      "Migrated existing Node.js and Express.js backend functionality to Supabase and contributed to frontend UI implementation and integration under senior developer guidance.",
    features: [
      "Frontend UI Implementation",
      "Supabase Integration",
      "Database Operations",
      "Frontend and Backend Integration",
    ],
    challenges: [
      "Understanding and migrating existing backend functionality.",
      "Integrating Supabase with frontend components.",
      "Maintaining application functionality during migration.",
    ],
    outcome:
      "Contributed to backend migration and frontend integration as part of the development team.",
  },
  verified: true,
},
  {
    slug: "client-blog-platform",
    title: "Client Blog Platform",
    summary:
      "A freelance blog platform built for a client, featuring blog management and content publishing workflows.",
    featured: true,
    status: "published",
    liveUrl: "https://blog-for-client-fhod.vercel.app/",
    githubUrl: null,
    image: null,
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
    ],
    role: "Freelance Full Stack Developer",
    timeframe: "October 2026 – Present",
    caseStudy: {
      overview:
        "A client-focused blog platform designed to manage and publish digital content.",
      problem:
        "The client needed a dedicated platform for managing and publishing blog content.",
      solution:
        "Worked on building and maintaining the blog platform, including frontend, backend workflows, and content management functionality.",
      features: [
        "Blog Management",
        "Content Publishing",
        "Admin Dashboard",
        "Blog Listing and Details",
      ],
      challenges: [],
      outcome:
        "Successfully deployed the blog platform on Vercel.",
    },
    verified: true,
  },

  {
    slug: "reelbite",
    title: "ReelBite",
    summary:
      "A full-stack food delivery application with restaurant browsing, food ordering, secure authentication, and payment integration.",
    featured: true,
    status: "published",
    liveUrl: "https://reelbiteapp.netlify.app/",
    githubUrl: "https://github.com/MohdMufeet/ReelBite",
    image: null,
    technologies: [
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "React Hook Form",
      "Zod",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
    ],
    role: "Full Stack Developer",
    timeframe: null,
    caseStudy: {
      overview:
        "A full-stack food delivery platform designed to provide a complete online food ordering experience.",
      problem:
        "Creating a reliable food ordering experience requires seamless frontend interactions, backend APIs, authentication, and payment processing.",
      solution:
        "Built a full-stack application with REST API integration, authentication, role-based access control, and payment gateway functionality.",
      features: [
        "Food and Restaurant Browsing",
        "Food Ordering",
        "20+ REST APIs",
        "JWT Authentication",
        "Role-Based Access Control",
        "Payment Gateway Integration",
        "Responsive User Interface",
      ],
      challenges: [
        "Managing frontend and backend application state.",
        "Implementing secure authentication and authorization.",
        "Integrating multiple REST APIs and payment workflows.",
      ],
      outcome:
        "Developed and deployed a full-stack food delivery application.",
    },
    verified: true,
  },

  {
    slug: "ai-interview",
    title: "AI Interview Platform",
    summary:
      "An AI-powered interview preparation platform that helps users practice interviews and improve their interview skills.",
    featured: true,
    status: "published",
    liveUrl: "https://aiintervue.netlify.app/",
    githubUrl: "https://github.com/MohdMufeet/ai-interview-saas",
    image: null,
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "OpenRouter API",
      "Tailwind CSS",
    ],
    role: "Full Stack Developer",
    timeframe: null,
    caseStudy: {
      overview:
        "An AI-powered interview preparation application designed to help candidates practice interview questions.",
      problem:
        "Candidates need an accessible way to practice interview questions and prepare for technical interviews.",
      solution:
        "Built an application integrating AI capabilities through the OpenRouter API with a React frontend and Node.js backend.",
      features: [
        "AI-Powered Interview Preparation",
        "AI API Integration",
        "Interactive Interview Workflow",
        "React-Based User Interface",
        "Backend API Integration",
      ],
      challenges: [
        "Integrating AI-powered functionality through an external API.",
        "Managing multi-step interview workflows.",
        "Connecting frontend components with backend services.",
      ],
      outcome:
        "Developed and deployed an AI-powered interview preparation platform.",
    },
    verified: true,
  },


]);