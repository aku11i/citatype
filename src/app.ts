import { Hono } from "hono";
import type { Bindings } from "./bindings.js";
import { handleGetHome, validateGetHomeQuery } from "./handlers/home.js";
import { handleGetPlay } from "./handlers/play.js";
import {
  handleGetResult,
  handlePostResult,
  validateGetResultQuery,
  validatePostResultForm,
} from "./handlers/result.js";
import { handleGetRobots } from "./handlers/robots.js";
import { validateBindings } from "./middleware/bindings.js";
import { applyNoindexForNonProduction } from "./middleware/noindex.js";

const app = new Hono<{ Bindings: Bindings }>();
app.use("*", validateBindings);
app.use("*", applyNoindexForNonProduction);

app.get("/", validateGetHomeQuery, handleGetHome);
app.get("/play", handleGetPlay);
app.get("/robots.txt", handleGetRobots);
app.get("/result", validateGetResultQuery, handleGetResult);
app.post("/result", validatePostResultForm, handlePostResult);

export { app };
