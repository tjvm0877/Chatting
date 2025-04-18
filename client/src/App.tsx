import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';

function App() {
  return (
    <>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/chat" replace />} />
      </Routes>
    </>
  );
}

export default App;
