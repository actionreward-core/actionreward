import { PlusIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProjects } from "../../../client/queries/projects";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ProjectAvatar } from "../../../components/ProjectAvatar";

export interface ProjectsIndexProps {}

export const ProjectsIndex: FC<ProjectsIndexProps> = (props) => {
  const navigate = useNavigate();
  const [,setCurrentProjectId] = useLocalStorage<string | null>('ar-current-project-id', null);
  const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });
  const onSelectProject = (projectId: string) => {
    setCurrentProjectId(projectId);
    navigate('/app');
  };
  return (
    <div className="w-screen h-screen bg-base-200 flex items-center justify-center">
      <div className="shadow-sm bg-white rounded-md max-w-xl w-full">
        <div className="text-base w-full text-center py-6 border-b text-base-content/80">Select Project</div>
        <div>
          {data?.meta.total === 0 ? (
            <div className="text-base-content/50 w-full text-center py-8">
              No project created yet
            </div>
          ): (
            <ul className="menu menu-lg w-full px-2 py-4">
              {data?.data.map(project => (
                <li>
                  <a onClick={() => onSelectProject(project.id)}>
                    <div className="flex items-center">
                    <ProjectAvatar project={project} wrapperClassName="w-8" />
                      <div className="ml-4">
                        {project.name}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t py-4 px-2">
            <Link className="btn btn-ghost btn-block" to="/app/projects/create">
              <PlusIcon className="h-6 w-6" />
              Create Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};