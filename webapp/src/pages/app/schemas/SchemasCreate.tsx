/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from "react";
import { AppLayout } from "../../../layouts/AppLayout";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CreateSchemaForm, CreateSchemaFormFields } from "../../../components/forms/CreateSchemaForm";
import { createSchema } from "../../../client/mutations/schemas";
import { useNavigate } from "react-router-dom";

export const SchemasCreatePage: FC = () => {
  const navigate = useNavigate();
  const form = useForm<CreateSchemaFormFields>();
  const createSchemaMutation = useMutation({
    mutationKey: ["createSchema"],
    mutationFn: createSchema,
  });
  const onSubmit = async (data: CreateSchemaFormFields) => {
    await createSchemaMutation.mutateAsync(data);
    toast.success("Schema Created!");
    navigate('/app/schemas');
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
