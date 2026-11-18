export function imagePath(value: string) {
  return value.startsWith("/") ? value : `/images/${value}`;
}
