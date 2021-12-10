import { GetLSValue, MessageProps, SetLSValue } from "../types";

export const getLSValue: GetLSValue = (key = "messages", defaultValue = []) => {
  const saved = localStorage.getItem(key);
  let value = defaultValue;
  if (saved) value = JSON.parse(saved);
  return value;
};

export const setLSValue: SetLSValue = (key = "messages", value) => {
  localStorage.setItem(key, JSON.stringify(value));
  return getLSValue(key);
};

export const clearLSValue = (key: string | undefined): void => {
  key && localStorage.removeItem(key);
};
