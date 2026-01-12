import { describe, expect, it } from "vitest";
import { WebComponentData } from "./web-component-data.js";

describe("WebComponentData", () => {
  it("renders script tags with serialized JSON", () => {
    const data = { message: "hello" };
    const html = (<WebComponentData targetId="my-component" data={data} />).toString();

    expect(html).toContain('id="my-component-data"');
    expect(html).toContain('type="application/json"');
    expect(html).toContain('{"message":"hello"}');
  });

  it("escapes < and > characters to prevent XSS", () => {
    const data = { text: "</script><script>alert('xss')</script>" };
    const html = (<WebComponentData targetId="test-component" data={data} />).toString();

    expect(html).not.toContain("</script><script>");
    expect(html).toContain("\\u003c");
    expect(html).toContain("\\u003e");
  });

  it("throws error for invalid targetId starting with number", () => {
    expect(() => {
      (<WebComponentData targetId="123-invalid" data={{}} />).toString();
    }).toThrow("Invalid targetId: 123-invalid");
  });

  it("throws error for invalid targetId with spaces", () => {
    expect(() => {
      (<WebComponentData targetId="has spaces" data={{}} />).toString();
    }).toThrow("Invalid targetId: has spaces");
  });

  it("throws error for invalid targetId with quotes", () => {
    expect(() => {
      (<WebComponentData targetId='with"quotes' data={{}} />).toString();
    }).toThrow('Invalid targetId: with"quotes');
  });
});
