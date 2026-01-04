import { getByRole } from "@testing-library/dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "hono/jsx/dom";
import { createI18n } from "../../i18n/createI18n.js";
import { getMessages } from "../../i18n/getMessages.js";
import { createPageMeta } from "../../i18n/page-meta.js";
import { localizedPath } from "../../i18n/paths.js";

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

const createPageProps = () => {
  const messages = getMessages("en");
  const { t } = createI18n({ locale: "en", messages });
  const meta = createPageMeta({
    locale: "en",
    path: "/",
    requestUrl: "https://example.com/en",
  });

  return { locale: "en" as const, t, meta };
};

describe("HomePage", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders the heading and start link", async () => {
    const { HomePage } = await import("./home.js");
    render(<HomePage {...createPageProps()} />, document.body);

    const heading = getByRole(document.body, "heading", { name: "Just type. Feel the keys." });
    const link = getByRole(document.body, "link", { name: "START" });

    expect(heading).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe(localizedPath("en", "/play"));
  });
});
