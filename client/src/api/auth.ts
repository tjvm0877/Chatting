import axiosInstance from './axios';

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/sign-in', {
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
    await axiosInstance.post('/sign-up', {
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
