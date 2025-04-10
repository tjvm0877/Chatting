import { useState } from 'react';
import Button from './Button';
import './RegisterPopup.css';
import axios from 'axios';

interface RegisterPopupProps {
  onClose: () => void;
  toLogin: () => void;
}

const RegisterPopup = ({ onClose, toLogin }: RegisterPopupProps) => {
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const onNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const requestSignUp = async () => {
    const response = await axios.post(
      'http://localhost:8080/members/sign-up',
      { email: emailInput, name: nameInput, password: passwordInput },
      {
        headers: {
          'Content-Type': 'application/json', // 명시적으로 헤더 추가 가능
        },
      }
    );
    if (response.status == 200) {
      console.log('로그인 성공');
      toLogin();
      onClose();
    }
  };

  const onCloseButtonClick = () => {
    toLogin();
    onClose();
  };

  return (
    <div className="RegisterPopup">
      <div className="Register">
        <div className="register-header">Sign-up</div>
        <div className="register-container">
          <div className="input-wrapper">
            <input
              value={emailInput}
              onChange={onEmailChange}
              placeholder="아이디"
            />
          </div>
          <div className="input-wrapper">
            <input
              value={nameInput}
              onChange={onNameInputChange}
              placeholder="닉네임"
            />
          </div>
          <div className="input-wrapper">
            <input
              value={passwordInput}
              onChange={onPasswordChange}
              type="password"
              placeholder="비밀번호"
            />
          </div>
        </div>
        <div className="button-container">
          <Button onClick={requestSignUp} text="회원가입" />
          <Button onClick={onCloseButtonClick} text="닫기" />
        </div>
      </div>
    </div>
  );
};

export default RegisterPopup;
