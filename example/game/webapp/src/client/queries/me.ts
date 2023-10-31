import { api } from "../api"

export const getMe = async () => {
  try {
    const { data } = await api.get<{ id: string, nickname: string; avatar: string, did?: string; qrcodeBase64?: string }>('/me');
    return data;
  } catch (error) {
    return null;
  }
}
