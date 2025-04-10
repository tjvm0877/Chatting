import axiosInstance from './axios';

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/members/sign-in', {
      email,
      password,
    });
    const accessToken = response.data.accessToken;

    // 로컬스토리지에 토큰 저장
    localStorage.setItem('accessToken', accessToken);

    console.log('Login successful:', accessToken);
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
