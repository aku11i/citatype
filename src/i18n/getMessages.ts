import type { Locale } from "./locales.js";
import { messages as enMessages } from "./messages/en.js";
import { messages as jaMessages } from "./messages/ja.js";

export const getMessages = (locale: Locale) => {
  switch (locale) {
    case "ja":
      return jaMessages;
    case "en":
      return enMessages;
    default:
      return enMessages;
  }
};
