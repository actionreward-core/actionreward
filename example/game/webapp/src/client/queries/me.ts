import { api } from "../api"

export const getMe = async () => {
  try {    
    const { data } = await api.get<{ id: string, nickname: string; avatar: string }>('/me');
    return data;
  } catch (error) {
    return null;
  }
}
