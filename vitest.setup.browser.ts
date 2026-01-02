import "@testing-library/jest-dom/vitest";
import { beforeAll } from "vitest";

beforeAll(async () => {
  const id = "vitest-tailwind";
  if (document.getElementById(id)) {
    return;
  }

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = "/tailwind.css";
  document.head.appendChild(link);

  await new Promise<void>((resolve, reject) => {
    link.onload = () => resolve();
    link.onerror = () => reject(new Error("Failed to load /tailwind.css"));
  });
});
