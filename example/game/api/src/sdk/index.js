import axios from 'axios';

export const ActionReward = ({ token }) => {
  const client = axios.create({
    baseURL: process.env.SDK_BASE_URL ?? 'http://localhost:3000/api/sdk',
    headers: {
      'X-PROJECT-TOKEN': token,
    },
  });
  return {
    connectAuthRequest: async ({ userId }) => {
      const { data } = await client.post('/connect-auth-request', {
        userId: `${userId}`,
      });
      return data;
    },

    getUser: async (userId) => {
      const { data } = await client.get(`/user/${userId}`);
      return data;
    },

    sendAction: async ({ actionKey, userId, properties }) => {
      const { data } = await client.post('/send-action', {
        actionKey,
        userId: `${userId}`,
        properties
      });
      return data;
    }
  }
}