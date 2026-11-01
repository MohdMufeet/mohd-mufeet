import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

type ContainerProps<C extends ElementType> = {
  as?: C;
  size?: "default" | "narrow";
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<C>, "as" | "children" | "className" | "size">;

export function Container<C extends ElementType = "div">({
  as,
  size = "default",
  className,
  children,
  ...props
}: ContainerProps<C>) {
  const Component = as ?? "div";
  const containerClassName = [
    "container-shell",
    size === "narrow" ? "container-shell--narrow" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={containerClassName} {...props}>
      {children}
    </Component>
  );
}
