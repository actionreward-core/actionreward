/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from "react";
import { AppLayout } from "../../../layouts/AppLayout";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CreateRewardForm, CreateRewardFormFields } from "../../../components/forms/CreateRewardForm";
import { createReward } from "../../../client/mutations/rewards";
import { useNavigate } from "react-router-dom";

export const RewardsCreatePage: FC = () => {
  const navigate = useNavigate();
  const form = useForm<CreateRewardFormFields>();
  const createRewardMutation = useMutation({
    mutationKey: ["createReward"],
    mutationFn: createReward,
  });
  const onSubmit = async (data: CreateRewardFormFields) => {
    await createRewardMutation.mutateAsync(data);
    toast.success("Schema Created!");
    navigate('/app/rewards');
  };
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto bg-white border rounded">
        <div className="p-6 border-b">
          <h2 className="font-bold text-xl">Create Reward</h2>
        </div>
        <div className="p-4">
          <CreateRewardForm
            form={form}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </AppLayout>
  );
};
