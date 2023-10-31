import axios from 'axios';

export const ActionReward = ({ token }) => {
  const client = axios.create({
    baseURL: 'http://localhost:3000/api/sdk',
    headers: {
      'X-PROJECT-TOKEN': token,
    },
  });
  return {
    generateConnectQrCode: ({ userId }) => {

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