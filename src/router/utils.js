import { isValid, parse } from "date-fns";

export function toNumOrUndefined(value) {
  return value !== undefined
    ? isFinite(value)
      ? Number(value)
      : undefined
    : undefined;
}

export function toDateOrUndefined(value) {
  if (value !== undefined) {
    const date = parse(value, "dd.MM.yyyy", new Date(0, 0, 1));
    return isValid(date) ? date : undefined;
  }
  return undefined;
}
