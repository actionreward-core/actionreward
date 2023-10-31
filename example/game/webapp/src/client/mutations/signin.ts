import { api } from "../api";

export const signIn = async () => {
  const { data } = await api.post<{ token: string }>('/signin');
  return data;
};
