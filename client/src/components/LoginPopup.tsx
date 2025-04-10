import { useState } from 'react';
import Button from './Button';
import './LoginPopUp.css';
import { login } from '../api/auth';

interface LoginPopUpProps {
  onClose: () => void;
  toRegister: () => void;
}

const LoginPopUp = ({ onClose, toRegister }: LoginPopUpProps) => {
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onEmailChage = (e) => {
    setEmailInput(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  const onSignUpButtonClicked = () => {
    toRegister();
    onClose();
  };

  const handleSubmit = async () => {
    try {
      await login(emailInput, passwordInput); // API 함수 호출
      onClose(); // 성공 시 팝업 닫기
    } catch (error) {
      setEmailInput('');
      setPasswordInput('');
      setErrorMessage('로그인에 실패했습니다. 이메일/비밀번호를 확인해주세요.'); // 실패 시 에러 메시지
    }
  };

  return (
    <>
      <div className="LoginPopup">
        <div className="Login">
          <div className="login-header">Sign-in</div>
          <div className="lonin-container">
            <div className="input-warpper">
              <input
                value={emailInput}
                onChange={onEmailChage}
                placeholder="아이디"
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
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <Button onClick={handleSubmit} text="로그인" />
          </div>
          <div className="other-container">
            <button onClick={onSignUpButtonClicked}>회원가입</button>
            <div>|</div>
            <div>아이디 찾기</div>
            <div>|</div>
            <div>비밀번호 찾기</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPopUp;
