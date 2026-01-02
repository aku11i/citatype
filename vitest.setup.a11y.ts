import "./vitest.setup.browser.js";
import { afterEach, expect } from "vitest";
import axe from "axe-core";

type AxeViolation = {
  id: string;
  impact?: string | null;
  help: string;
  helpUrl: string;
  nodes: Array<{
    target: Array<string | string[]>;
    failureSummary?: string;
  }>;
};

const formatA11yViolations = (violations: AxeViolation[]) =>
  violations
    .map((violation) => {
      const targets = violation.nodes
        .map((node) => {
          const selector = node.target.join(", ");
          const summary = node.failureSummary ? `\n  ${node.failureSummary}` : "";
          return `- ${selector}${summary}`;
        })
        .join("\n");

      return [
        `${violation.id} (${violation.impact ?? "unknown"}): ${violation.help}`,
        violation.helpUrl,
        targets,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

const ensureStylesheet = async () => {
  if (!document.head) {
    const head = document.createElement("head");
    document.documentElement.prepend(head);
  }

  const existingLink = document.querySelector('link[rel="stylesheet"][href="/tailwind.css"]');

  if (existingLink) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/tailwind.css";
  document.head.appendChild(link);

  await new Promise<void>((resolve, reject) => {
    link.onload = () => resolve();
    link.onerror = () => reject(new Error("Failed to load /tailwind.css"));
  });
};

const ensureTitle = () => {
  if (!document.title.trim()) {
    document.title = "Citatype";
  }
};

const ensureMainLandmark = () => {
  if (document.querySelector("main")) {
    return;
  }

  const main = document.createElement("main");
  main.setAttribute("data-a11y-wrapper", "true");

  while (document.body.firstChild) {
    main.appendChild(document.body.firstChild);
  }

  document.body.appendChild(main);
};

expect.extend({
  toMatchScreenshot: () => ({
    pass: true,
    message: () => "Skipped screenshot assertion in the a11y project.",
  }),
});

afterEach(async () => {
  ensureTitle();
  ensureMainLandmark();
  await ensureStylesheet();

  const { violations } = await axe.run(document);
  const details = formatA11yViolations(violations);

  expect(violations, details).toHaveLength(0);
});
