import { getPayload } from "payload";
import config from "./payload.config.ts";

export function isCmsConfigured() {
  return (process.env.PAYLOAD_SECRET?.length ?? 0) >= 32;
}

export function getCms() {
  if (!isCmsConfigured()) throw new Error("Configure PAYLOAD_SECRET with at least 32 characters.");
  return getPayload({ config });
}
