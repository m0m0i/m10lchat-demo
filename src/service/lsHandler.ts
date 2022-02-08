/*
 Copyright 2022 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
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
