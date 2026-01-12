import { describe, expect, it } from "vitest";
import { parseBindings } from "./bindings.js";

describe("parseBindings", () => {
  it("normalizes ENVIRONMENT values", () => {
    const bindings = parseBindings({ ENVIRONMENT: "  PreView " });

    expect(bindings.ENVIRONMENT).toBe("preview");
  });

  it("throws when ENVIRONMENT is missing", () => {
    expect(() => parseBindings({})).toThrow(
      'Invalid key: Expected "ENVIRONMENT" but received undefined',
    );
  });

  it("throws when ENVIRONMENT is invalid", () => {
    expect(() => parseBindings({ ENVIRONMENT: "staging" })).toThrow(
      'Invalid type: Expected ("production" | "preview" | "local") but received "staging"',
    );
  });
});
