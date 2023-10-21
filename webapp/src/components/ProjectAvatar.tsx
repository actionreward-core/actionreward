import { FC } from "react";
import { Project } from "../types/project";
import { getCIDLink } from "../utils/web3Storage";
import classNames from "classnames";

export interface ProjectAvatarProps {
  project: Project;
  className?: string;
  wrapperClassName?: string;
}

export const ProjectAvatar: FC<ProjectAvatarProps> = ({ project, className, wrapperClassName }) => {
  return (
    <div className={classNames("avatar", className)}>
      <div className={classNames("rounded ring-gray-300 ring-2 ring-offset-base-100 ring-offset-1", wrapperClassName)}>
        {project.logo ? (
          <img
            src={getCIDLink(project.logo)}
            className="border overflow-hidden"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 120 120"
            className="opacity-70"
          >
            <path fill="#EFF1F3" d="M0 0H120V120H0z"></path>
            <path
              fill="#687787"
              fillRule="evenodd"
              d="M33.25 38.482a2.625 2.625 0 012.604-2.607h47.292a2.606 2.606 0 012.604 2.607v42.036a2.625 2.625 0 01-2.604 2.607H35.854a2.607 2.607 0 01-2.604-2.607V38.482zm47.25 2.643h-42v36.75l24.392-24.397a2.625 2.625 0 013.712 0L80.5 67.401V41.125zm-36.75 10.5a5.25 5.25 0 1010.5 0 5.25 5.25 0 00-10.5 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
};
