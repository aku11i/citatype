import { createRoute } from "honox/factory";
import { applyLocale } from "../../../src/middleware/locale.js";

export default createRoute(applyLocale);
