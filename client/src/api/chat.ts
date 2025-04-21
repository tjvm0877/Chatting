import axiosInstance from './axios';

export const getChatList = async () => {
  try {
    const response = await axiosInstance.get('/chat');
    return response.data;
  } catch (error) {
    console.error('Failed to get chat info:', error);
    throw error;
  }
};

export const requestCreateChat = async (recipient: string) => {
  try {
    await axiosInstance.post('/chat', {
      recipient: recipient,
    });
  } catch (error) {
    console.error('Create chat failed:', error);
    throw error;
  }
};
