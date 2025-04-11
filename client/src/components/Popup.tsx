import './Popup.css';
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Popup = () => {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);

  const changePopup = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div className="Popup">
      {isLoginPage ? (
        <SignIn changePopup={changePopup} />
      ) : (
        <SignUp changePopup={changePopup} />
      )}
    </div>
  );
};

export default Popup;
