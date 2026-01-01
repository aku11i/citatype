import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { app } from "./app.js";

app.use("/tailwind.css", serveStatic({ root: "./public" }));
app.use("/client-components/*", serveStatic({ root: "./public" }));

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
