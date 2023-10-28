import { Schema } from "../../types/schema";
import { paginator } from "./utils"

export const getSchemas = () => paginator<Schema>('/schemas', {});