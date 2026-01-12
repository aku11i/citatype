import { findByRole } from "@testing-library/dom";
import { render } from "hono/jsx/dom";
import { beforeEach, describe, it } from "vitest";
import { Button } from "./button.js";

describe("Button", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders a button element", async () => {
    render(<Button>Start</Button>, document.body);

    await findByRole(document.body, "button", { name: "Start" });
  });
});
