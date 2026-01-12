import { createRoute } from "honox/factory";
import { applyLocale } from "../../middleware/locale.js";

export default createRoute(applyLocale);
