import { useState } from 'react';
import './SignUp.css';
import { signUp } from '../api/auth';
interface SignUpProps {
  changePopup: () => void;
}

const SignUp = ({ changePopup }: SignUpProps) => {
  const [emailInput, setEmailInput] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const onPasswordChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const handleSignUp = async () => {
    // API 호출
    try {
      setLoading(true);
      await signUp(emailInput, nameInput, passwordInput);
      changePopup();
    } catch (error) {
      console.error('로그인 실패:', error);
      setErrorMessage('회원가입 실패, 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SignUp">
      <div className="sign-up-header">Sign-up</div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="sign-up-container">
        <div className="input-wrapper">
          <input
            value={emailInput}
            onChange={onEmailChange}
            placeholder="이메일"
          />
        </div>
        <div className="input-wrapper">
          <input
            value={nameInput}
            onChange={onNameChange}
            placeholder="닉네임"
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            value={passwordInput}
            onChange={onPasswordChage}
            placeholder="비밀번호"
          />
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleSignUp} disabled={loading}>
          {loading ? '잠시만 기다려주세요...' : '회원가입'}
        </button>
        <button onClick={changePopup}>취소</button>
      </div>
    </div>
  );
};

export default SignUp;
