import { useEffect, useRef } from 'react';
import { socket } from '../services/socket';
import { useChatStore } from '../store/chat.store';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import type { Message } from '../store/chat.store';

export default function Chat() {
  const room = useChatStore((state) => state.room);
  const username = useChatStore((state) => state.username);
  const addMessage = useChatStore((state) => state.addMessage);
  const setSocketId = useChatStore((state) => state.setSocketId);

  const joinedRef = useRef(false);

  useEffect(() => {
    if (!room || !username) return;

    socket.connect();

    const joinRoomOnce = () => {
      if (joinedRef.current) return;

      joinedRef.current = true;

      setSocketId(socket.id!);

      socket.emit('join-room', {
        room,
        username,
      });

      console.log('🚪 Entrou na sala:', room);
    };

    const handleNewMessage = (msg: Message) => {
      addMessage(msg);
    };

    const handleSystemMessage = (msg: { content: string }) => {
      addMessage({
        content: msg.content,
        system: true,
      });
    };

    socket.on('connect', joinRoomOnce);
    socket.on('new-message', handleNewMessage);
    socket.on('system-message', handleSystemMessage);

    if (socket.connected) {
      joinRoomOnce();
    }

    return () => {
      socket.off('connect', joinRoomOnce);
      socket.off('new-message', handleNewMessage);
      socket.off('system-message', handleSystemMessage);

      socket.disconnect();
      joinedRef.current = false;
    };
  }, [room, username, addMessage, setSocketId]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="h-14 flex items-center px-4 border-b">
        <h1 className="font-semibold text-sm">
          Sala: <span className="text-primary">{room}</span>
        </h1>
      </header>

      <MessageList />

      <footer className="border-t bg-background">
        <MessageInput />
      </footer>
    </div>
  );
}
