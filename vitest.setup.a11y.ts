import { afterEach, beforeEach, expect } from "vitest";
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

const a11yScaffold = `
  <head>
    <title>Citatype</title>
    <link rel="stylesheet" href="/tailwind.css" />
  </head>
  <body>
    <main data-a11y-wrapper="true"></main>
  </body>
`;

const waitForStylesheet = async () => {
  const link = document.querySelector<HTMLLinkElement>(
    'link[rel="stylesheet"][href="/tailwind.css"]',
  );

  if (!link || link.sheet) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    link.onload = () => resolve();
    link.onerror = () => reject(new Error("Failed to load /tailwind.css"));
  });
};

const wrapBodyContent = () => {
  const descriptor = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML");

  if (!descriptor?.get || !descriptor.set) {
    return;
  }

  Object.defineProperty(document.body, "innerHTML", {
    configurable: true,
    get: () => descriptor.get?.call(document.body),
    set: (value: string) => {
      if (typeof value === "string" && value.includes("<main")) {
        descriptor.set?.call(document.body, value);
        return;
      }

      const main = document.createElement("main");
      main.setAttribute("data-a11y-wrapper", "true");
      main.innerHTML = value;

      descriptor.set?.call(document.body, "");
      document.body.appendChild(main);
    },
  });
};

expect.extend({
  toMatchScreenshot: () => ({
    pass: true,
    message: () => "Skipped screenshot assertion in the a11y project.",
  }),
});

beforeEach(async () => {
  document.documentElement.innerHTML = a11yScaffold;
  wrapBodyContent();
  await waitForStylesheet();
});

afterEach(async () => {
  const { violations } = await axe.run(document);
  const details = formatA11yViolations(violations);

  expect(violations, details).toHaveLength(0);
});
