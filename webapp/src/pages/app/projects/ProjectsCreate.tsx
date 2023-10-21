/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from "react";
import { CreateProjectForm } from "../../../components/forms/CreateProjectForm";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "../../../client/mutations/projects";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../consts/paths";

export interface AppProjectsCreateProps {}

export interface CreateProjectVars {
  name: string;
  logo: string;
}

export const AppProjectsCreate: FC<AppProjectsCreateProps> = () => {
  const navigate = useNavigate();
  const form = useForm<CreateProjectVars>();
  const createPostMutation = useMutation({
    mutationKey: ["createProject"],
    mutationFn: (args: CreateProjectVars) => createProject(args),
  });
  const onSubmit = async (data: CreateProjectVars) => {
    await createPostMutation.mutateAsync(data);
    toast.success("Project Created!");
    navigate(PATHS.appProjects);
  };
  return (
    <div className="w-screen h-screen bg-base-200 flex items-center justify-center">
      <div className="shadow-sm bg-white rounded-md max-w-xl w-full">
        <div className="bg-white border rounded shadow p-4 max-w-2xl mx-auto">
          <div className="flex justify-between mb-8">
            <h1 className="text-lg font-bold">Create Project</h1>
          </div>
          <CreateProjectForm form={form} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};
