import type { ComponentProps } from "react";

export function Input({ type, ...props }: ComponentProps<"input">) {
  return <input type={type} data-slot="input" {...props} />;
}
