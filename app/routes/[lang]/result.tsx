import { createRoute } from "honox/factory";
import {
  handleGetResult,
  handlePostResult,
  validateGetResultQuery,
  validatePostResultForm,
} from "../../../src/handlers/result.js";

export const POST = createRoute(validatePostResultForm, handlePostResult);

export default createRoute(validateGetResultQuery, handleGetResult);
