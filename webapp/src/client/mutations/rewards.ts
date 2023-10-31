import { Reward } from "../../types/rewards";
import { api } from "../api";

export interface CreateRewardInput {
  projectId: string;
  schemaId: string;
  name: string;
  conditionField: string;
  conditionOperator: string;
  conditionValue: string;
  coupons: string[];
}



export const rewardSignIn = async ({ rewardId }: { rewardId: string }) => {
  const { data } = await api.post<{ qrcodeBase64: string, sessionId: string, reward: Reward }>(`/rewards/${rewardId}/sign-in`);
  return data;
}

export const createReward = async (input: CreateRewardInput) => {
  const { data } = await api.post<Reward>('/rewards', input);
  return data;
}

export const checkRewardStatus = async ({ sessionId }: { sessionId: string }) => {
  const { data } = await api.post<{ couponCode?: string, error?: string }>('/rewards/check-status', { sessionId });
  return data;
}