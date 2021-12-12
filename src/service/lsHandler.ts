import {
  GetLSValue,
  LocalUserInfo,
  ReceivedMessage,
  SetLSValue,
} from "../types";

export const getLSValue: GetLSValue = (key) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
};

export const setLSValue: SetLSValue = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  return getLSValue(key);
};

export const clearLSValue = (key: string | undefined): void => {
  key && localStorage.removeItem(key);
};

export const getPreferredLanguage = (uid: string): string => {
  const userInfo: LocalUserInfo | null = getLSValue(uid);
  return userInfo ? userInfo.language : window.navigator.language.slice(0, 2);
};

export const getSavedMessages = (roomId: string): ReceivedMessage[] | [] => {
  const savedMessages: ReceivedMessage[] | [] = getLSValue(roomId);
  return savedMessages ? savedMessages : [];
};
