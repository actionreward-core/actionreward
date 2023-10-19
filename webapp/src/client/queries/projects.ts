import { Project } from "../../types/project";
import { api } from "../api";
import { paginator } from "./utils"

export const getProjects = () => paginator<Project>('/projects', {});