import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { getProjects } from "../client/queries/projects";
import { useMemo } from "react";

export const useCurrentProject = () => {
  const [currentProjectId] = useLocalStorage('ar-current-project-id', null);
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
  const project = useMemo(() => {
    if (!currentProjectId) {
      return null;
    }
    if (!projects || !projects.data.length) {
      return null;
    }
    return projects.data.find(p => p.id === currentProjectId);
  }, [currentProjectId, projects]);
  return {
    project,
    isLoading,
  }
}