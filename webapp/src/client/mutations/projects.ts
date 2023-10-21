import { Project } from "../../types/project";
import { api } from "../api"

export const createProject = async ({ name }: { name: string }) => {
  const { data } = await api.post<Project>('/projects', {
    name,
  });
  return data;
}

export const updateProject = async (id: string, { name, logo }: { name?: string, logo?: string }) => {
  const { data } = await api.patch<Project>(`/projects/${id}`, {
    name,
    logo,
  });
  return data;
}