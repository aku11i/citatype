import { createApp } from "honox/server";
import type { Bindings } from "../src/bindings.js";

type AppEnv = {
  Bindings: Bindings;
};

const app = createApp<AppEnv>();

export default app;
