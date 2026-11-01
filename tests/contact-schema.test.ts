import { describe, expect, it } from "vitest";
import { getPublishedProjects, getServices } from "@/lib/content";
import { contactFormSchema } from "@/lib/validations/contact";

const validEnquiry = {
  fullName: "  Test User ",
  email: " TEST@example.com ",
  subject: "A website project",
  service: "other",
  budget: "",
  message: "I would like to discuss a website project.",
  website: "",
  elapsedMs: 4000,
};

describe("contact form schema", () => {
  it("trims input and normalizes email casing", () => {
    const result = contactFormSchema.parse(validEnquiry);

    expect(result.fullName).toBe("Test User");
    expect(result.email).toBe("test@example.com");
  });

  it("accepts active service slugs and the other option", () => {
    const activeService = getServices("active")[0];

    expect(activeService).toBeDefined();
    expect(
      contactFormSchema.safeParse({
        ...validEnquiry,
        service: activeService?.slug,
      }).success,
    ).toBe(true);
    expect(contactFormSchema.safeParse(validEnquiry).success).toBe(true);
  });

  it("rejects a service that is not active and known", () => {
    expect(
      contactFormSchema.safeParse({
        ...validEnquiry,
        service: "hidden-marketing-service",
      }).success,
    ).toBe(false);
  });

  it("rejects invalid fields, extra keys, and excessive links", () => {
    expect(
      contactFormSchema.safeParse({
        ...validEnquiry,
        fullName: " ",
      }).success,
    ).toBe(false);
    expect(
      contactFormSchema.safeParse({
        ...validEnquiry,
        unexpected: "not allowed",
      }).success,
    ).toBe(false);
    expect(
      contactFormSchema.safeParse({
        ...validEnquiry,
        message:
          "Links: https://one.example https://two.example https://three.example https://four.example",
      }).success,
    ).toBe(false);
  });
});

describe("published content boundaries", () => {
  it("only exposes active services through the public accessor", () => {
    expect(getServices("active").every((service) => service.status === "active")).toBe(
      true,
    );
    expect(getServices("active")).toHaveLength(6);
  });

  it("does not publish unverified projects", () => {
    expect(getPublishedProjects().every((project) => project.verified)).toBe(true);
  });
});
