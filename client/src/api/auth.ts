import axiosInstance from './axios';

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/members/sign-in', {
      email,
      password,
    });
    const accessToken = response.data.accessToken;

    // 로컬스토리지에 토큰 저장
    localStorage.setItem('accessToken', accessToken);
    console.log('SignIn successful:', accessToken);
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
