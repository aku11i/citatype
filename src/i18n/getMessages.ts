import type { Locale } from "./locales.js";
import type { Messages } from "./messages/en.js";
import { messages as enMessages } from "./messages/en.js";
import { messages as jaMessages } from "./messages/ja.js";

export const getMessages = (locale: Locale): Messages => {
  switch (locale) {
    case "ja":
      return jaMessages;
    case "en":
      return enMessages as Messages;
    default:
      return enMessages as Messages;
  }
};
