import { PlusIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../../../client/queries/projects";

export interface ProjectsIndexProps {}

export const ProjectsIndex: FC<ProjectsIndexProps> = (props) => {
  const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });
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
                  <Link to={`/admin/projects/${project.id}`}>
                    <div className="avatar">
                      <div className="w-12 rounded">
                        <img
                          src="https://placehold.co/400"
                          className="border overflow-hidden"
                        />
                      </div>
                    </div>
                    {project.name}
                  </Link>
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