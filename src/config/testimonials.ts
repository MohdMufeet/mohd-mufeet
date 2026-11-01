import { testimonialSchema } from "@/types/content";

// Only entries with confirmed permission are displayed publicly.
export const testimonials = testimonialSchema.array().parse(
 [
  {
    "quote": "Worked on frontend implementation and migrated existing Node.js and Express.js backend functionality to Supabase as part of the development team.",
    "author": "KAP Controls",
    "role": "Professional Experience",
    "permissionConfirmed": false
  },
  {
    "quote": "Developed a client-focused blog platform with content management and publishing functionality, delivering a responsive and modern web experience.",
    "author": "Blog Project Client",
    "role": "Freelance Client",
    "permissionConfirmed": false
  }
]
);
