import { useState } from 'react';
import './App.css';
import ChatSection from './components/ChatSection';
import Sidebar from './components/Sidebar';
import LoginPopUp from './components/LoginPopup';
import RegisterPopup from './components/RegisterPopup';

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState<boolean>(true);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] =
    useState<boolean>(false);

  const toggleLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  const toggleRegisterPopup = () => {
    setIsRegisterPopupOpen(!isRegisterPopupOpen);
  };

  return (
    <>
      {isRegisterPopupOpen && (
        <RegisterPopup
          onClose={toggleRegisterPopup}
          toLogin={toggleLoginPopup}
        />
      )}
      {isLoginPopupOpen && (
        <LoginPopUp
          onClose={toggleLoginPopup}
          toRegister={toggleRegisterPopup}
        />
      )}
      <ChatSection />
      <Sidebar />
    </>
  );
}

export default App;
