import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { useChatStore } from './store/chat.store';

export default function App() {
  const navigate = useNavigate();
  const username = useChatStore((state) => state.username);
  useEffect(() => {
    navigate('/', { replace: true });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={username ? <Navigate to="/chat" replace /> : <Login />}
      />

      <Route
        path="/chat"
        element={username ? <Chat /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}
