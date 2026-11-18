import { getCms } from "../src/cms/payload.ts";

const email = process.env.CMS_EDITOR_EMAIL?.trim().toLowerCase();
const password = process.env.CMS_EDITOR_PASSWORD;
if (!email || !password || password.length < 12) {
  throw new Error("Set CMS_EDITOR_EMAIL and CMS_EDITOR_PASSWORD (at least 12 characters).");
}

const cms = await getCms();
try {
  await cms.create({ collection: "editors", data: { email, password } });
  console.log(`CMS editor created: ${email}`);
} finally {
  await cms.destroy();
}
