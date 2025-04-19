import axiosInstance from './axios';

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/members/sign-in', {
      email,
      password,
    });
    const accessToken = response.data.accessToken;
    localStorage.setItem('accessToken', accessToken);
    console.log('SignIn successful:', accessToken);
    return accessToken;
  } catch (error) {
    console.error('SignIn failed:', error);
    throw error;
  }
};

export const signUp = async (email: string, name: string, password: string) => {
  try {
    await axiosInstance.post('/members/sign-up', {
      email,
      name,
      password,
    });
    console.log('SignUp successful');
  } catch (error) {
    console.error('SignUp failed:', error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/members');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};

export const getUserList = async () => {
  try {
    const response = await axiosInstance.get('/members/find');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};
