/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from "react";
import { AppLayout } from "../../../layouts/AppLayout";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CreateSchemaForm, CreateSchemaFormFields } from "../../../components/forms/CreateSchemaForm";

export const SchemasCreatePage: FC = () => {
  const form = useForm<CreateSchemaFormFields>();
  const updatePostMutation = useMutation({
    mutationKey: ["updateProject"],
    // eslint-disable-next-line @typescript-eslint/require-await
    mutationFn: async (args: CreateSchemaFormFields) => console.log(args),
  });
  const onSubmit = async (data: CreateSchemaFormFields) => {
    await updatePostMutation.mutateAsync(data);
    toast.success("Project Updated!");
  };
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto bg-white border rounded">
        <div className="p-6 border-b">
          <h2 className="font-bold text-xl">Create Action Schema</h2>
        </div>
        <div className="p-4">
          <CreateSchemaForm
            form={form}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </AppLayout>
  );
};
