import { createRoute } from "honox/factory";
import { validateBindings } from "../../src/middleware/bindings.js";
import { applyNoindexForNonProduction } from "../../src/middleware/noindex.js";

export default createRoute(validateBindings, applyNoindexForNonProduction);
