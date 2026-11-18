import { cookies } from "next/headers";
import { getCms, isCmsConfigured } from "./payload";

export const sessionCookieName = "albina-cms-token";

export async function getEditorSession() {
  if (!isCmsConfigured()) return null;
  const token = (await cookies()).get(sessionCookieName)?.value;
  if (!token) return null;
  const cms = await getCms();
  const { user } = await cms.auth({ headers: new Headers({ Authorization: `Bearer ${token}` }) });
  return user?.collection === "editors" ? { cms, user } : null;
}
