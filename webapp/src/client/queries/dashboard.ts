import { api } from "../api"

export const getDashboardStats = async () => {
  const { data } = await api.get<{ actions: number; users: number; schemas: number}>('/dashboard/stats');
  return data;
}