import { resolve } from "node:path";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { buildConfig, type Access } from "payload";

const editor: Access = ({ req }) => req.user?.collection === "editors";
const privateCollection = {
  create: editor,
  read: editor,
  update: editor,
  delete: editor,
};

export const mediaDirectory = resolve(
  /* turbopackIgnore: true */ process.env.CMS_MEDIA_DIR || ".cms-media",
);

export default buildConfig({
  admin: { disable: true, user: "editors" },
  secret: process.env.PAYLOAD_SECRET || "",
  cookiePrefix: "albina-cms",
  telemetry: false,
  graphQL: { disable: true },
  db: sqliteAdapter({
    client: { url: process.env.CMS_DATABASE_URL || "file:./cms.sqlite" },
    busyTimeout: 5000,
    push: false,
    migrationDir: resolve("src/cms/migrations"),
  }),
  collections: [
    {
      slug: "editors",
      auth: {
        tokenExpiration: 8 * 60 * 60,
        maxLoginAttempts: 5,
        lockTime: 15 * 60 * 1000,
        useSessions: true,
      },
      fields: [],
      access: privateCollection,
    },
    {
      slug: "site-blocks",
      fields: [
        { name: "key", type: "text", required: true, unique: true },
        { name: "content", type: "json", required: true },
      ],
      access: privateCollection,
    },
    {
      slug: "site-media",
      upload: {
        staticDir: mediaDirectory,
        mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"],
        filesRequiredOnCreate: true,
        pasteURL: false,
      },
      fields: [],
      access: privateCollection,
    },
  ],
});
