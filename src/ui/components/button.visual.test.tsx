import { renderToString } from "hono/jsx/dom/server";
import { describe, expect, it } from "vitest";
import { Button } from "./button.js";

const variants = ["solid", "outline"] as const;
const colors = ["primary", "secondary"] as const;

const label = {
  solid: "Solid",
  outline: "Outline",
  primary: "Primary",
  secondary: "Secondary",
} as const;

describe("Button visual", () => {
  it("matches the variants and colors", async () => {
    const markup = renderToString(
      <div class="min-h-screen bg-secondary-50 px-8 py-10 text-secondary-900">
        <header class="space-y-1">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-400">
            Components
          </p>
          <h1 class="text-2xl font-semibold tracking-tight">Button</h1>
          <p class="text-sm text-secondary-600">
            Variant and color matrix for the base button component.
          </p>
        </header>

        <div class="mt-8 space-y-5">
          <div class="grid grid-cols-[120px_repeat(2,minmax(0,1fr))] gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-secondary-400">
            <span></span>
            {variants.map((variant) => (
              <span>{label[variant]}</span>
            ))}
          </div>
          {colors.map((color) => (
            <div class="grid grid-cols-[120px_repeat(2,minmax(0,1fr))] items-center gap-4">
              <span class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-500">
                {label[color]}
              </span>
              {variants.map((variant) => (
                <Button variant={variant} color={color} class="w-full">
                  {label[color]} {label[variant]}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>,
    );
    const parsed = new DOMParser().parseFromString(markup, "text/html");

    document.body.innerHTML = parsed.body.innerHTML;

    await expect(document.body).toMatchScreenshot();
  });
});
