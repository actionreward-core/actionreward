import { Project } from "../../types/project";
import { paginator } from "./utils"

export const getProjects = () => paginator<Project>('/projects', {});