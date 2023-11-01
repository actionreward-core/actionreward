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
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const SETUP_STEP_1 = `const actionReward = ActionReward({ token: 'YOUR API KEY' });
`;

const SETUP_STEP_2 = `const { qrcodeBase64 } = await actionReward.connectAuthRequest({
  userId: '123', // The user id on your app
});
`;

const SETUP_STEP_3 = `const { qrcodeBase64 } = await actionReward.sendAction({
  userId: '123',
  actionKey: 'game-scoreboard',
  properties: {
    kills: 12,
    deaths: 8,
    kd: 1.5,
    victory: true,
    stage: 'dust',
  },
});
`;

const Step: FC<{
  number: number;
  title: string;
  children: React.ReactNode;
}> = ({ number, title, children }) => {
  return (
    <div className="pt-8">
      <div className="flex items-center">
        <div className="badge badge-primary mr-2">{number}</div>
        <div>
          <div className="font-semibold">{title}</div>
        </div>
      </div>
      <div className="mt-4 prose">{children}</div>
    </div>
  );
};

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
      <div className="max-w-3xl mx-auto bg-white border rounded">
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
      <div className="max-w-3xl mx-auto bg-white border rounded mt-8">
        <div className="p-6 border-b">
          <h2 className="font-bold text-xl">API Key</h2>
        </div>
        <div className="p-4">
          <div className="bg-gray-900 text-white p-4 rounded-lg">
            {project?.accessToken}
          </div>

          <div className="mt-4">
            Usage:
          </div>

          <Step number={1} title="Creating the SDK Client">
            <SyntaxHighlighter style={a11yDark} language="javascript" customStyle={{ fontSize: '14px' }}>
              {SETUP_STEP_1}
            </SyntaxHighlighter>
          </Step>

          <Step number={2} title="Generating Connect PolygonID QRCode">
            <SyntaxHighlighter style={a11yDark} language="javascript" customStyle={{ fontSize: '14px' }}>
              {SETUP_STEP_2}
            </SyntaxHighlighter>
          </Step>

          <Step number={3} title="Triggering an action">
            <SyntaxHighlighter style={a11yDark} language="javascript" customStyle={{ fontSize: '14px' }}>
              {SETUP_STEP_3}
            </SyntaxHighlighter>
          </Step>

        </div>
      </div>
    </AppLayout>
  );
};
