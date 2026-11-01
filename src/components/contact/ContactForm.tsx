"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactFormSchema, type ContactFormInput, type ContactFormValues } from "@/lib/validations/contact";
import type { Service } from "@/types/content";

type ContactFormProps = {
  services: Service[];
  initialService?: string;
  enabled: boolean;
};

type ApiFailure = {
  ok: false;
  code: string;
  fieldErrors?: Record<string, string>;
};

const formFieldNames: Record<string, keyof ContactFormInput> = {
  fullName: "fullName",
  email: "email",
  subject: "subject",
  service: "service",
  budget: "budget",
  message: "message",
};

function isApiFailure(value: unknown): value is ApiFailure {
  return (
    typeof value === "object" &&
    value !== null &&
    "ok" in value &&
    value.ok === false &&
    "code" in value &&
    typeof value.code === "string"
  );
}

const getNow = () => Date.now();

const getElapsedMs = (startedAt: number | null): number =>
  startedAt === null ? 0 : getNow() - startedAt;

export function ContactForm({
  services,
  initialService,
  enabled,
}: ContactFormProps) {
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, undefined, ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      service: services.some((service) => service.slug === initialService)
        ? initialService
        : "other",
      budget: "",
      message: "",
      website: "",
      elapsedMs: 0,
    },
  });

  const startTimer = () => {
    setStartedAt((current) => (current === null ? getNow() : current));
  };

  const submitForm = handleSubmit(async (values) => {
    setFormError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          elapsedMs: getElapsedMs(startedAt),
        }),
      });

      const result: unknown = await response.json();

      if (
        response.ok &&
        typeof result === "object" &&
        result !== null &&
        "ok" in result &&
        result.ok === true
      ) {
        reset({
          fullName: "",
          email: "",
          subject: "",
          service: "other",
          budget: "",
          message: "",
          website: "",
          elapsedMs: 0,
        });
        setSuccess(true);
        return;
      }

      if (isApiFailure(result)) {
        if (result.code === "VALIDATION_ERROR" && result.fieldErrors) {
          for (const [field, message] of Object.entries(result.fieldErrors)) {
            const fieldName = formFieldNames[field];
            if (fieldName) {
              setError(fieldName, {
                type: "server",
                message,
              });
            }
          }
          return;
        }

        if (result.code === "RATE_LIMITED") {
          setFormError("Too many enquiries were sent. Please wait a while and try again.");
          return;
        }

      }

      setFormError("Your enquiry could not be sent. Please try again later.");
    } catch {
      setFormError("A connection problem prevented your enquiry from being sent. Please try again.");
    }
  });

  if (success) {
    return (
      <div className="rounded-md border border-success bg-surface p-6" role="status">
        <h2 className="text-h3 font-semibold text-foreground">Enquiry received</h2>
        <p className="mt-3 text-muted-foreground">
          Thanks for getting in touch. Your message has been received.
        </p>
        <button
          type="button"
          className="button-link button-link--secondary mt-5"
          onClick={() => {
            setSuccess(false);
            setStartedAt(null);
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-md border border-border bg-surface p-6"
      onSubmit={submitForm}
      onFocusCapture={startTimer}
      noValidate
      aria-busy={isSubmitting}
    >
      {!enabled ? (
        <div
          className="status-message mb-5"
          role="status"
          aria-live="polite"
        >
          <p className="text-small text-muted-foreground">
            Online enquiries are temporarily unavailable. Please use the
            contact links on this page to get in touch.
          </p>
        </div>
      ) : null}
      <fieldset disabled={!enabled || isSubmitting} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="mb-2 block text-small font-medium text-foreground">
            Full name
          </label>
          <input
            id="fullName"
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className="form-field"
            {...register("fullName")}
          />
          {errors.fullName ? <p id="fullName-error" className="form-error">{errors.fullName.message}</p> : null}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-small font-medium text-foreground">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="form-field"
            {...register("email")}
          />
          {errors.email ? <p id="email-error" className="form-error">{errors.email.message}</p> : null}
        </div>
        <div>
          <label htmlFor="subject" className="mb-2 block text-small font-medium text-foreground">
            Subject
          </label>
          <input
            id="subject"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className="form-field"
            {...register("subject")}
          />
          {errors.subject ? <p id="subject-error" className="form-error">{errors.subject.message}</p> : null}
        </div>
        <div>
          <label htmlFor="service" className="mb-2 block text-small font-medium text-foreground">
            Service required
          </label>
          <select
            id="service"
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
            className="form-field"
            {...register("service")}
          >
            <option value="other">Not sure yet / Other</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>{service.title}</option>
            ))}
          </select>
          {errors.service ? <p id="service-error" className="form-error">{errors.service.message}</p> : null}
        </div>
        <div>
          <label htmlFor="budget" className="mb-2 block text-small font-medium text-foreground">
            Project budget (optional)
          </label>
          <select
            id="budget"
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? "budget-error" : undefined}
            className="form-field"
            {...register("budget")}
          >
            <option value="">Prefer not to say</option>
            <option value="discuss">Prefer to discuss</option>
            <option value="small">Small project</option>
            <option value="medium">Medium project</option>
            <option value="large">Larger project</option>
          </select>
          {errors.budget ? <p id="budget-error" className="form-error">{errors.budget.message}</p> : null}
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-small font-medium text-foreground">
            Project description
          </label>
          <textarea
            id="message"
            rows={5}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="form-field"
            {...register("message")}
          />
          {errors.message ? <p id="message-error" className="form-error">{errors.message.message}</p> : null}
        </div>
        <div
          className="absolute -left-[10000px] h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>
        <input type="hidden" {...register("elapsedMs", { valueAsNumber: true })} />
        {formError ? (
          <p role="alert" className="form-error">
            {formError}
          </p>
        ) : null}
        <button
          type="submit"
          className="button-link button-link--primary w-full justify-center"
          disabled={!enabled || isSubmitting}
        >
          {isSubmitting ? "Sending…" : "Send enquiry"}
        </button>
      </fieldset>
      <p className="mt-4 text-small text-muted-foreground">
        Please don&apos;t include sensitive personal information in your message.
      </p>
    </form>
  );
}
