import React, { FC, useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Sidebar } from "./Sidebar";
import { useCurrentProject } from "../../hooks/useCurrentProject";
import { useNavigate } from "react-router-dom";

export interface AppLayoutProps {
  title?: string;
  children?: React.ReactNode;
  noContentPadding?: boolean;
  actions?: React.ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children, title, noContentPadding = false, actions = null }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { project, isLoading: projectIsLoading } = useCurrentProject();
  const navigate = useNavigate();
  useEffect(() => {
    if (!projectIsLoading && !project) {
      navigate("/app/projects");
    }
  }, [navigate, project, projectIsLoading]);
  if (!project) {
    return "Loading..."; // TODO: use a loading spinner here
  }
  return (
    <div className="h-screen flex overflow-hidden bg-base-200/40">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} project={project} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {title ? (
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none p-4">
            <div className="bg-white border rounded-lg">
              {title && (
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-6 border-b flex content-between w-full items-center">
                  <div className="w-full">
                    <h1 className="text-2xl font-semibold text-gray-900">
                      {title}
                    </h1>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row-reverse">
                      {actions}
                    </div>
                  </div>
                </div>
              )}
              <div className={noContentPadding ? '' : 'max-w-7xl mx-auto p-4 sm:p-6 lg:p-6'}>
                {children}
              </div>
            </div>
          </main>
        ) : (
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">{children}</div>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};
