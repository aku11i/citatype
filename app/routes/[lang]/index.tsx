import { createRoute } from "honox/factory";
import { handleGetHome } from "../../../src/handlers/home.js";

export default createRoute(handleGetHome);
