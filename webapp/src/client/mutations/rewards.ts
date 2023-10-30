import { api } from "../api";

export const rewardSignIn = async ({ rewardId }: { rewardId: string }) => {
  const { data } = await api.post<{ qrcodeBase64: string }>(`/rewards/${rewardId}/sign-in`);
  return data;
}