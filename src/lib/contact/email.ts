import "server-only";
import type { ContactFormValues } from "@/lib/validations/contact";
import { getServices } from "@/lib/content";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const escaped: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return escaped[character] ?? character;
  });
}

export function createEnquiryEmail(
  enquiry: ContactFormValues,
  enquiryId: string,
  createdAt: string,
) {
  const serviceName =
    enquiry.service === "other"
      ? "Not sure yet / Other"
      : getServices("active").find((service) => service.slug === enquiry.service)
          ?.title ?? "Not sure yet / Other";
  const subject = `New enquiry: ${enquiry.subject.replace(/[\r\n]/g, " ").slice(0, 120)}`;
  const safeName = escapeHtml(enquiry.fullName);
  const safeEmail = escapeHtml(enquiry.email);
  const safeService = escapeHtml(serviceName);
  const safeBudget = escapeHtml(enquiry.budget || "Not specified");
  const safeMessage = escapeHtml(enquiry.message);

  return {
    subject,
    text: [
      `Name: ${enquiry.fullName}`,
      `Email: ${enquiry.email}`,
      `Service: ${serviceName}`,
      `Budget: ${enquiry.budget || "Not specified"}`,
      `Received: ${createdAt}`,
      `Enquiry ID: ${enquiryId}`,
      "",
      enquiry.message,
    ].join("\n"),
    html: [
      "<h1>New portfolio enquiry</h1>",
      `<p><strong>Name:</strong> ${safeName}</p>`,
      `<p><strong>Email:</strong> ${safeEmail}</p>`,
      `<p><strong>Service:</strong> ${safeService}</p>`,
      `<p><strong>Budget:</strong> ${safeBudget}</p>`,
      `<p><strong>Received:</strong> ${escapeHtml(createdAt)}</p>`,
      `<p><strong>Enquiry ID:</strong> ${escapeHtml(enquiryId)}</p>`,
      `<p>${safeMessage.replace(/\n/g, "<br>")}</p>`,
    ].join(""),
  };
}
