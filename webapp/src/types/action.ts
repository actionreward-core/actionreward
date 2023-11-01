import { ProjectUser } from "./projectUser";
import { Schema } from "./schema";

export interface Action {
  id: string;
  user: ProjectUser;
  schema: Schema;
  createdAt: string;
}