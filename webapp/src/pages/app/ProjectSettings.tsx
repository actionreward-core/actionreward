/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useEffect } from "react";
import { AppLayout } from "../../layouts/AppLayout";
import { CreateProjectForm } from "../../components/forms/CreateProjectForm";
import { CreateProjectVars } from "./projects/ProjectsCreate";
import { updateProject } from "../../client/mutations/projects";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCurrentProject } from "../../hooks/useCurrentProject";

export const ProjectSettingsPage: FC = () => {
  const { project, refetch } = useCurrentProject();
  const form = useForm<CreateProjectVars>({
    defaultValues: {
      name: project?.name,
      logo: project?.logo,
    }
  });
  useEffect(() => {
    if (project) {
      form.reset({
        name: project.name,
        logo: project.logo,
      });
    }
  }, [form, project]);
  const updatePostMutation = useMutation({
    mutationKey: ["updateProject"],
    mutationFn: (args: CreateProjectVars) => updateProject(project!.id, args),
  });
  const onSubmit = async (data: CreateProjectVars) => {
    await updatePostMutation.mutateAsync(data);
    await refetch();
    toast.success("Project Updated!");
  };
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto bg-white border rounded">
        <div className="p-6 border-b">
          <h2 className="font-bold text-xl">Project Settings</h2>
        </div>
        <div className="p-4">
          <CreateProjectForm
            form={form}
            onSubmit={onSubmit}
            footer={
              <div className="mt-2 flex justify-end">
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  disabled={!form.formState.isDirty}
                >
                  Update
                </button>
              </div>
            }
          />
        </div>
      </div>
    </AppLayout>
  );
};
