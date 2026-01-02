import type { Context } from "hono";
import { HomePage } from "../ui/pages/home.js";

export const handleGetHome = (c: Context) => {
  return c.html(<HomePage />);
};
