import { playwright } from "@vitest/browser-playwright";
import { defaultExclude, defineConfig } from "vitest/config";

const nodeTests = ["**/*.test.{ts,tsx}"];
const domTests = ["**/*.dom.test.{ts,tsx}"];
const browserTests = ["**/*.browser.test.{ts,tsx}"];

export default defineConfig({
  test: {
    passWithNoTests: true,
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          environment: "node",
          include: nodeTests,
          exclude: [...defaultExclude, ...domTests, ...browserTests],
        },
      },
      {
        extends: true,
        test: {
          name: "dom",
          environment: "happy-dom",
          include: domTests,
          exclude: [...defaultExclude],
          setupFiles: ["./vitest.setup.dom.ts"],
          environmentOptions: {
            happyDOM: {
              disableCSSFileLoading: true,
            },
          },
        },
      },
      {
        extends: true,
        test: {
          name: "browser",
          include: browserTests,
          exclude: [...defaultExclude],
          setupFiles: ["./vitest.setup.browser.ts"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [
              {
                browser: "chromium",
                name: "mobile",
                viewport: { width: 390, height: 844 },
              },
              {
                browser: "chromium",
                name: "tablet",
                viewport: { width: 834, height: 1112 },
              },
              {
                browser: "chromium",
                name: "desktop",
                viewport: { width: 1280, height: 800 },
              },
            ],
          },
        },
      },
    ],
  },
});
