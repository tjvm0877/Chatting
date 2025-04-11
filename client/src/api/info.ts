import axiosInstance from './axios';

export const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/members');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};
