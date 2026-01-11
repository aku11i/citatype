import { createClient } from "honox/client";

createClient();

const registerIfPresent = async (selector: string, loader: () => Promise<unknown>) => {
  if (document.querySelector(selector)) {
    await loader();
  }
};

registerIfPresent("typing-session", () => import("../src/ui/client-components/typing-session.js"));
registerIfPresent("elapsed-timer", () => import("../src/ui/client-components/elapsed-timer.js"));
