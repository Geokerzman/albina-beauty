"use client";

import type { ComponentProps } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export const Accordion = AccordionPrimitive.Root;
export const AccordionItem = AccordionPrimitive.Item;
export const AccordionContent = AccordionPrimitive.Content;

export function AccordionTrigger({
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger data-slot="accordion-trigger" {...props}>
        {children}
        <ChevronDown aria-hidden="true" size={16} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}
