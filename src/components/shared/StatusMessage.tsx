import type { ReactNode } from "react";

type StatusMessageProps = {
  type: "info" | "success" | "error";
  children: ReactNode;
};

export function StatusMessage({ type, children }: StatusMessageProps) {
  const role = type === "error" ? "alert" : "status";

  return (
    <p
      className="status-message"
      data-type={type}
      role={role}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      {children}
    </p>
  );
}
