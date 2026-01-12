import { createRoute } from "honox/factory";
import { validateBindings } from "../middleware/bindings.js";
import { applyNoindexForNonProduction } from "../middleware/noindex.js";

export default createRoute(validateBindings, applyNoindexForNonProduction);
