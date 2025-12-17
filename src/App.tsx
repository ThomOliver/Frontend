import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { useChatStore } from './store/chat.store';
import { useEffect } from 'react';

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, []);

  const username = useChatStore((state) => state.username);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={username ? <Navigate to="/chat" /> : <Login />}
        />

        <Route
          path="/chat"
          element={username ? <Chat /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
