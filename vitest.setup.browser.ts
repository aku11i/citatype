import "@testing-library/jest-dom/vitest";
import { beforeEach } from "vitest";

beforeEach(async () => {
  document.documentElement.innerHTML = "<head></head><body></body>";

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/tailwind.css";
  document.head.appendChild(link);

  await new Promise<void>((resolve, reject) => {
    link.onload = () => resolve();
    link.onerror = () => reject(new Error("Failed to load /tailwind.css"));
  });
});
