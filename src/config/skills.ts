import { skillGroupSchema } from "@/types/content";

export const skills = skillGroupSchema.array().parse([
  {
    group: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux Toolkit",
      "Context API",
      "React Hook Form",
      "Zod",
      "Tailwind CSS",
    ],
  },
  {
    group: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "Role-Based Access Control",
    ],
  },
  {
    group: "Database",
    items: ["MongoDB", "Mongoose", "Prisma ORM", "Supabase"],
  },
  {
    group: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code", "Netlify", "Render", "Vercel"],
  },
  {
    group: "Core Concepts",
    items: [
      "MVC Architecture",
      "Authentication and Authorization",
      "Protected Routes",
      "State Management",
      "API Integration",
      "Error Handling",
      "Responsive UI Development",
    ],
  },
]);
