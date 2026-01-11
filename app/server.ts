import type { Hono } from "hono";
import { createApp } from "honox/server";
import type { Bindings } from "../src/bindings.js";

type App = Hono<{ Bindings: Bindings }>;

const app = createApp<App>();

export default app;
