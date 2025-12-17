import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { useChatStore } from './store/chat.store';

export default function App() {
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
