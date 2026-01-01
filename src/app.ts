import { Hono } from "hono";
import { handleGetHome } from "./handlers/home.js";
import { handleGetPlay } from "./handlers/play.js";
import {
  handleGetResult,
  handlePostResult,
  validateGetResultQuery,
  validatePostResultForm,
} from "./handlers/result.js";

const app = new Hono();

app.get("/", handleGetHome);
app.get("/play", handleGetPlay);
app.get("/result", validateGetResultQuery, handleGetResult);
app.post("/result", validatePostResultForm, handlePostResult);

export { app };
