import { createRoute } from "honox/factory";
import { handleGetPlay, validateGetPlayQuery } from "../../../src/handlers/play.js";

export default createRoute(validateGetPlayQuery, handleGetPlay);
