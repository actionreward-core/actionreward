import { ProjectUser } from "../../types/projectUser";
import { paginator } from "./utils"

export const getProjectUsers = () => paginator<ProjectUser>('/project-users', {});