import "@testing-library/jest-dom/vitest";
import { beforeEach } from "vitest";

beforeEach(() => {
  document.documentElement.innerHTML = "<head></head><body></body>";
});
