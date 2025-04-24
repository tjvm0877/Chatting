import axiosInstance from './axios';

export interface UserInfo {
  uuid: string;
  name: string;
  email: string;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await axiosInstance.get<UserInfo>('/members');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};

export const getUserList = async (): Promise<UserInfo[]> => {
  try {
    const response = await axiosInstance.get<UserInfo[]>('/members/list');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};
