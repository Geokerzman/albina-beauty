import type { ComponentProps } from "react";

export function Alert(props: ComponentProps<"div">) {
  return <div role="alert" data-slot="alert" {...props} />;
}
