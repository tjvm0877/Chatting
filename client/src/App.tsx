import './App.css';
import ChatSection from './components/ChatSection';
import Sidebar from './components/Sidebar';
import useAuthStore from './stores/authStore';
import Popup from './components/PopUp';

function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <>
      {!isLoggedIn && <Popup />}
      <ChatSection />
      <Sidebar />
    </>
  );
}

export default App;
