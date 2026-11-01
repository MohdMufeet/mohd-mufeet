import { z } from "zod";
import { getServices } from "@/lib/content";

const budgetValues = ["", "discuss", "small", "medium", "large"] as const;

export const contactFormSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full name (2–80 characters).")
      .max(80, "Please enter your full name (2–80 characters).")
      .refine((value) => !/[\u0000-\u001f\u007f]/.test(value), {
        message: "Please remove unsupported characters from your name.",
      }),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .max(254, "Please enter a valid email address.")
      .email("Please enter a valid email address."),
    subject: z
      .string()
      .trim()
      .min(3, "Please enter a subject (3–120 characters).")
      .max(120, "Please enter a subject (3–120 characters).")
      .refine((value) => !/[\r\n]/.test(value), {
        message: "Please enter a subject on one line.",
      }),
    service: z.string().refine(
      (value) =>
        value === "other" ||
        getServices("active").some((service) => service.slug === value),
      { message: "Please choose a service." },
    ),
    budget: z.enum(budgetValues, {
      error: "Please choose a valid budget option.",
    }),
    message: z
      .string()
      .trim()
      .min(20, "Please describe your project (20–2000 characters).")
      .max(2000, "Please describe your project (20–2000 characters)."),
    website: z.string().max(200).default(""),
    elapsedMs: z.number().int().nonnegative().max(3_600_000),
  })
  .strict()
  .superRefine((value, context) => {
    const urlCount = value.message.match(/https?:\/\/\S+/gi)?.length ?? 0;

    if (urlCount > 3) {
      context.addIssue({
        code: "custom",
        message: "Please include no more than three links.",
        path: ["message"],
      });
    }
  });

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormValues = z.output<typeof contactFormSchema>;
