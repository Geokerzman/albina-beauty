"use client";

import { useActionState, useId, useRef, useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { login, publish, uploadImage, type ActionState } from "./actions";
import { choiceLabel, fieldChoices, fieldLabel, isImageField, type FieldOptions } from "./fields";
import type { Section, Value } from "./manifest";

const idle: ActionState = { status: "idle", message: "" };

function Status({ state }: { state: ActionState }) {
  if (!state.message) return null;
  return (
    <Alert role={state.status === "success" ? "status" : "alert"} data-status={state.status}>
      {state.message}
    </Alert>
  );
}

export function LoginForm() {
  const [state, submit, pending] = useActionState(login, idle);
  return (
    <form action={submit} className="cms-form">
      <div className="cms-field">
        <Label htmlFor="cms-email">Электронная почта</Label>
        <Input
          id="cms-email"
          type="email"
          name="email"
          autoComplete="username"
          required
          maxLength={254}
        />
      </div>
      <div className="cms-field">
        <Label htmlFor="cms-password">Пароль</Label>
        <Input
          id="cms-password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          maxLength={256}
        />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Вход…" : "Войти"}
      </Button>
      <Status state={state} />
    </form>
  );
}

function ImageUpload({
  onChange,
  onUpload,
}: {
  onChange: (path: string) => void;
  onUpload: (busy: boolean) => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  return (
    <div className="cms-upload">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={pending}
        onClick={() => fileInput.current?.click()}
      >
        Загрузить изображение
      </Button>
      <Input
        ref={fileInput}
        type="file"
        hidden
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        disabled={pending}
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          setError("");
          const form = new FormData();
          form.set("image", file);
          onUpload(true);
          startTransition(async () => {
            try {
              const result = await uploadImage(form);
              if ("path" in result) onChange(result.path);
              else setError(result.error);
            } catch {
              setError("Не удалось загрузить изображение.");
            } finally {
              onUpload(false);
            }
          });
        }}
      />
      {pending && <p role="status">Изображение загружается…</p>}
      {error && <Alert data-status="error">{error}</Alert>}
    </div>
  );
}

function blank(initial: Value): Value {
  if (typeof initial === "string") return "";
  if (Array.isArray(initial)) return [];
  return Object.fromEntries(Object.entries(initial).map(([key, value]) => [key, blank(value)]));
}

interface FieldProps {
  name: string;
  parent?: string;
  value: Value;
  initial: Value;
  onChange: (value: Value) => void;
  options: FieldOptions;
  onUpload: (busy: boolean) => void;
  fixed?: boolean;
}

function ContentField({
  name,
  parent,
  value,
  initial,
  onChange,
  options,
  onUpload,
  fixed,
}: FieldProps) {
  const id = useId();
  const label = fieldLabel(name);
  if (typeof initial === "string" && typeof value === "string") {
    const choices = parent === "pages" ? undefined : fieldChoices(name, options);
    const props = {
      id,
      value,
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      ) => onChange(event.target.value),
    };
    return (
      <div className="cms-field">
        <Label htmlFor={id}>{label}</Label>
        {choices ? (
          <NativeSelect {...props}>
            <option value="" disabled>
              Выберите значение
            </option>
            {choices.map((choice) => (
              <option key={choice} value={choice}>
                {choiceLabel(name, choice)}
              </option>
            ))}
          </NativeSelect>
        ) : initial.length > 100 || /\n|\\n/.test(initial) || name === "body" ? (
          <Textarea {...props} lang="de" rows={name === "body" ? 14 : 3} />
        ) : (
          <Input {...props} lang="de" />
        )}
        {isImageField(name) && <ImageUpload onChange={onChange} onUpload={onUpload} />}
      </div>
    );
  }
  if (Array.isArray(initial) && Array.isArray(value)) {
    function move(index: number, direction: number) {
      const reordered = [...(value as Value[])];
      const target = index + direction;
      [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
      onChange(reordered);
    }
    const template = initial[0];
    return (
      <fieldset className="cms-list">
        <legend>{label}</legend>
        {value.map((item, index) => (
          <div className="cms-list-item" key={index}>
            <ContentField
              name={name}
              value={item}
              initial={initial[index] ?? template}
              options={options}
              onUpload={onUpload}
              onChange={(next) => onChange(value.map((v, i) => (i === index ? next : v)))}
            />
            {!fixed && (
              <div className="cms-item-actions">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label={`Переместить запись ${index + 1} вверх`}
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                >
                  <ArrowUp size={16} />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label={`Переместить запись ${index + 1} вниз`}
                  disabled={index === value.length - 1}
                  onClick={() => move(index, 1)}
                >
                  <ArrowDown size={16} />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label={`Удалить запись ${index + 1}`}
                  onClick={() => onChange(value.filter((_, i) => i !== index))}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            )}
          </div>
        ))}
        {!fixed && template !== undefined && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange([...value, blank(template)])}
          >
            <Plus size={16} /> Добавить запись
          </Button>
        )}
      </fieldset>
    );
  }
  if (
    typeof initial === "object" &&
    !Array.isArray(initial) &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return (
      <div className="cms-fields">
        {Object.entries(initial).map(([key, template]) => (
          <ContentField
            key={key}
            name={key}
            parent={name}
            value={value[key] ?? template}
            initial={template}
            options={options}
            onUpload={onUpload}
            fixed={fixed && key === "title"}
            onChange={(next) => onChange({ ...value, [key]: next })}
          />
        ))}
      </div>
    );
  }
  return null;
}

export function SectionForm({
  section,
  content,
  options,
}: {
  section: Section;
  content: Value;
  options: FieldOptions;
}) {
  const [value, setValue] = useState(content);
  const [uploading, setUploading] = useState(false);
  const [state, submit, pending] = useActionState(publish.bind(null, section.key), idle);
  return (
    <form action={submit} className="cms-form">
      <Input type="hidden" name="content" value={JSON.stringify(value)} />
      <fieldset disabled={pending || uploading} className="cms-editor-fields">
        <ContentField
          name={section.title}
          value={value}
          initial={section.initial}
          options={options}
          fixed={section.key === "home/willkommen"}
          onChange={setValue}
          onUpload={setUploading}
        />
      </fieldset>
      <div className="cms-publish">
        <Button type="submit" disabled={pending || uploading}>
          {pending ? "Публикация…" : "Опубликовать"}
        </Button>
        <Status state={state} />
      </div>
    </form>
  );
}
