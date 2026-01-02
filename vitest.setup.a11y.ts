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

expect.extend({
  toMatchScreenshot: () => ({
    pass: true,
    message: () => "Skipped screenshot assertion in the a11y project.",
  }),
});

afterEach(async () => {
  const { violations } = await axe.run(document);
  const details = formatA11yViolations(violations);

  expect(violations, details).toHaveLength(0);
});
