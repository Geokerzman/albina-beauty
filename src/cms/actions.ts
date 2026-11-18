"use server";

import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createLocalReq, logoutOperation, ValidationError } from "payload";
import { validateValue } from "./fields";
import { fieldOptions, sectionByKey } from "./manifest";
import { getCms, isCmsConfigured } from "./payload";
import { getEditorSession, sessionCookieName } from "./session";

export type ActionState = { status: "idle" | "error" | "success"; message: string };

export async function login(_: ActionState, form: FormData): Promise<ActionState> {
  const email = form.get("email");
  const password = form.get("password");
  if (
    !isCmsConfigured() ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.length > 254 ||
    password.length > 256
  ) {
    return { status: "error", message: "Не удалось войти." };
  }
  const cms = await getCms();
  let result;
  try {
    result = await cms.login({ collection: "editors", data: { email: email.trim(), password } });
  } catch {
    return { status: "error", message: "Не удалось войти. Проверьте электронную почту и пароль." };
  }
  if (!result.token || !result.exp) {
    return { status: "error", message: "Не удалось начать сеанс." };
  }
  (await cookies()).set(sessionCookieName, result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    expires: new Date(result.exp * 1000),
  });
  redirect("/admin/");
}

export async function logout() {
  const session = await getEditorSession();
  if (session) {
    const { cms, user } = session;
    await logoutOperation({
      collection: cms.collections.editors,
      req: await createLocalReq({ user }, cms),
    });
  }
  (await cookies()).set(sessionCookieName, "", { path: "/admin", maxAge: 0 });
  redirect("/admin/");
}

export async function publish(key: string, _: ActionState, form: FormData): Promise<ActionState> {
  const session = await getEditorSession();
  if (!session) return { status: "error", message: "Войдите снова." };
  const section = sectionByKey.get(key);
  const raw = form.get("content");
  if (!section || typeof raw !== "string" || raw.length > 500_000) {
    return { status: "error", message: "Не удалось сохранить данные." };
  }
  let content: unknown;
  try {
    content = JSON.parse(raw);
  } catch {
    return { status: "error", message: "Некорректные данные." };
  }
  if (!validateValue(content, section.initial, fieldOptions)) {
    return {
      status: "error",
      message: "Проверьте поля, особенно ссылки, изображения и адреса электронной почты.",
    };
  }
  if (key === "home/willkommen" && (content as { title?: string[] }).title?.length !== 3) {
    return { status: "error", message: "Заголовок должен состоять из трёх строк." };
  }
  const { cms, user } = session;
  const access = { overrideAccess: false, user };
  try {
    const { docs } = await cms.find({
      collection: "site-blocks",
      where: { key: { equals: key } },
      limit: 1,
      depth: 0,
      ...access,
    });
    if (docs[0]) {
      await cms.update({ collection: "site-blocks", id: docs[0].id, data: { content }, ...access });
    } else {
      await cms.create({ collection: "site-blocks", data: { key, content }, ...access });
    }
  } catch (error) {
    cms.logger.error({ err: error, msg: `Could not save site block ${key}` });
    return {
      status: "error",
      message: "Не удалось опубликовать изменения. Обновите страницу и попробуйте снова.",
    };
  }
  return {
    status: "success",
    message: "Изменения опубликованы и уже видны на сайте.",
  };
}

const imageTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

export async function uploadImage(form: FormData): Promise<{ path: string } | { error: string }> {
  const session = await getEditorSession();
  if (!session) return { error: "Войдите снова." };
  const file = form.get("image");
  const extension = file instanceof File ? imageTypes[file.type] : undefined;
  if (!(file instanceof File) || !extension || !file.size || file.size > 8 * 1024 * 1024) {
    return {
      error: "Выберите изображение в формате JPEG, PNG, WebP, AVIF или GIF размером до 8 МБ.",
    };
  }
  const { cms, user } = session;
  try {
    const document = await cms.create({
      collection: "site-media",
      data: {},
      user,
      overrideAccess: false,
      file: {
        name: `${randomUUID()}.${extension}`,
        mimetype: file.type,
        data: Buffer.from(await file.arrayBuffer()),
        size: file.size,
      },
    });
    return { path: `/media/${document.filename}` };
  } catch (error) {
    if (!(error instanceof ValidationError))
      cms.logger.error({ err: error, msg: "CMS image upload failed" });
    return {
      error: "Не удалось загрузить изображение. Проверьте файл и попробуйте снова.",
    };
  }
}
