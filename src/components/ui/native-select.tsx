import type { ComponentProps } from "react";
import { ChevronDown } from "lucide-react";

export function NativeSelect(props: ComponentProps<"select">) {
  return (
    <div data-slot="native-select-wrapper">
      <select data-slot="native-select" {...props} />
      <ChevronDown aria-hidden="true" size={16} />
    </div>
  );
}
