// src/components/UserInfo.tsx
import { useEffect, useState } from 'react';
import useAuthStore from '../stores/authStore';
import { fetchUserInfo } from '../api/info';

interface UserData {
  name: string;
  email: string;
}

const UserInfo = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // Zustand 상태
  const [userData, setUserData] = useState<UserData | null>(null); // 사용자 데이터 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  useEffect(() => {
    if (!isLoggedIn) return;

    const getUserInfo = async () => {
      setLoading(true);
      try {
        const data = await fetchUserInfo(); // API 호출
        setUserData(data);
      } catch (err) {
        setError('Failed to load user information.');
      } finally {
        setLoading(false);
      }
    };

    getUserInfo(); // 로그인된 경우에만 실행
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <div>Please Login first</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>User Info</h2>
      {userData && (
        <>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </>
      )}
    </div>
  );
};

export default UserInfo;
