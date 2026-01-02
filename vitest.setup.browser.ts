import "@testing-library/jest-dom/vitest";
import { beforeEach } from "vitest";

beforeEach(async () => {
  document.documentElement.innerHTML =
    '<head><link id="vitest-tailwind" rel="stylesheet" href="/tailwind.css"></head><body></body>';

});
