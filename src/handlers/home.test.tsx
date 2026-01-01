import { Hono } from "hono";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { handleGetHome } from "./home.js";

const { HomePageMock } = vi.hoisted(() => {
  return {
    HomePageMock: vi.fn(() => <div data-testid="home" />),
  };
});

vi.mock("../ui/pages/home.js", () => {
  return {
    HomePage: HomePageMock,
  };
});

describe("GET /", () => {
  beforeEach(() => {
    HomePageMock.mockClear();
  });

  it("returns 200 and calls HomePage with expected props", async () => {
    const app = new Hono();
    app.get("/", handleGetHome);
    const res = await app.request("/");

    expect(res.status).toBe(200);
    expect(HomePageMock).toHaveBeenCalledWith({});
  });
});
