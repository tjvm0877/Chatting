import { useState } from 'react';
import './SignIn.css';
import { signIn } from '../api/auth';
import useAuthStore from '../stores/authStore';

interface SignInProps {
  changePopup: () => void;
}

const SignIn = ({ changePopup }: SignInProps) => {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn(emailInput, passwordInput);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('로그인 실패:', error);
      setErrorMessage('이메일/비밀번호를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SignIn">
      <div className="sign-in-header">Sign-in</div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="sign-in-container">
        <div className="input-warpper">
          <input
            value={emailInput}
            onChange={onEmailChange}
            placeholder="이메일"
          />
        </div>
        <div className="input-warpper">
          <input
            value={passwordInput}
            onChange={onPasswordChange}
            type="password"
            placeholder="비밀번호"
          />
        </div>
        <button onClick={handleSignIn} disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </div>
      <div className="other-container">
        <button onClick={changePopup}>회원가입</button>
        <div>|</div>
        <div>아이디 찾기</div>
        <div>|</div>
        <div>비밀번호 찾기</div>
      </div>
    </div>
  );
};

export default SignIn;
