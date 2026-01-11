import { createRoute } from "honox/factory";
import { handleGetRobots } from "../../src/handlers/robots.js";

export default createRoute(handleGetRobots);
