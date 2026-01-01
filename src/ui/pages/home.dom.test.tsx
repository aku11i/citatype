import { getByRole } from "@testing-library/dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "hono/jsx/dom";

const { BaseLayoutMock } = vi.hoisted(() => {
  return {
    BaseLayoutMock: vi.fn(({ title, children }) => <div data-layout-title={title}>{children}</div>),
  };
});

vi.mock("../layouts/base.js", () => {
  return {
    BaseLayout: BaseLayoutMock,
  };
});

describe("HomePage", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders the heading and play link", async () => {
    const { HomePage } = await import("./home.js");
    render(<HomePage />, document.body);

    const heading = getByRole(document.body, "heading", { name: "DakenMania" });
    const link = getByRole(document.body, "link", { name: "PLAY" });

    expect(heading).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe("/play");
  });
});
