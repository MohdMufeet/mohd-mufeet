import { socialLinkSchema } from "@/types/content";

export const socialLinks = socialLinkSchema.array().parse([
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/MohdMufeet",
    kind: "profile",
    handle: "MohdMufeet",
    placements: ["contact", "footer", "mobile-menu"],
    order: 1,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/mohd-mufeet/",
    kind: "profile",
    handle: null,
    placements: ["contact", "footer", "mobile-menu"],
    order: 2,
  },
  {
    id: "email",
    label: "Email",
    url: "mailto:mufeet.dev@gmail.com",
    kind: "mailto",
    handle: "mufeet.dev@gmail.com",
    placements: ["contact", "footer"],
    order: 3,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    url: "https://wa.me/916388270155",
    kind: "message",
    handle: "+91 63882 70155",
    placements: ["contact"],
    order: 4,
  },
]);
