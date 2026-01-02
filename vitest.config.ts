import { basename, join } from "node:path";
import { playwright } from "@vitest/browser-playwright";
import { defaultExclude, defineConfig } from "vitest/config";

const nodeTests = ["**/*.test.{ts,tsx}"];
const domTests = ["**/*.dom.test.{ts,tsx}"];
const browserTests = ["**/*.browser.test.{ts,tsx}"];
const visualTests = ["**/*.visual.test.{ts,tsx}"];
const browserInstances = [
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
];

const visualBrowserInstances = [
  {
    browser: "chromium",
    name: "visual-mobile",
    viewport: { width: 390, height: 844 },
    screenshotDirectory: ".screenshots/mobile",
  },
  {
    browser: "chromium",
    name: "visual-tablet",
    viewport: { width: 834, height: 1112 },
    screenshotDirectory: ".screenshots/tablet",
  },
  {
    browser: "chromium",
    name: "visual-desktop",
    viewport: { width: 1280, height: 800 },
    screenshotDirectory: ".screenshots/desktop",
  },
];

export default defineConfig({
  publicDir: "public",
  test: {
    passWithNoTests: true,
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          environment: "node",
          include: nodeTests,
          exclude: [
            ...defaultExclude,
            ...domTests,
            ...browserTests,
            ...visualTests,
          ],
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
            instances: browserInstances,
          },
        },
      },
      {
        extends: true,
        test: {
          name: "visual",
          include: visualTests,
          exclude: [...defaultExclude],
          setupFiles: ["./vitest.setup.browser.ts"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: visualBrowserInstances,
            expect: {
              toMatchScreenshot: {
                comparatorName: "pixelmatch",
                comparatorOptions: {
                  threshold: 0.2,
                  allowedMismatchedPixelRatio: 0.01,
                },
                resolveDiffPath: ({
                  arg,
                  ext,
                  root,
                  attachmentsDir,
                  testFileDirectory,
                  testFileName,
                  browserName,
                  platform,
                  screenshotDirectory,
                }) =>
                  join(
                    root,
                    attachmentsDir,
                    testFileDirectory,
                    testFileName,
                    `${arg}-${basename(screenshotDirectory)}-${browserName}-${platform}${ext}`
                  ),
                resolveScreenshotPath: ({
                  arg,
                  ext,
                  root,
                  testFileDirectory,
                  testFileName,
                  browserName,
                  platform,
                  screenshotDirectory,
                }) =>
                  join(
                    root,
                    ".screenshots",
                    testFileDirectory,
                    testFileName,
                    `${arg}-${basename(screenshotDirectory)}-${browserName}-${platform}${ext}`
                  ),
              },
            },
          },
        },
      },
    ],
  },
});
