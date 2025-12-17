import { useEffect, useRef, useState } from 'react';
import { useChatStore } from '../store/chat.store';
import MessageItem from './MessageItem';

export default function MessageList() {
  const messages = useChatStore((state) => state.messages);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const lastMessageCount = useRef(0);

  function handleScroll() {
    const el = containerRef.current;
    if (!el) return;

    const threshold = 80;
    const atBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;

    setIsAtBottom(atBottom);
  }

  function scrollToBottom() {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if (messages.length !== lastMessageCount.current) {
      lastMessageCount.current = messages.length;

      if (isAtBottom) {
        scrollToBottom();
      }
    }
  }, [messages, isAtBottom]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="relative flex-1 overflow-y-auto p-4 space-y-2"
    >
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}

      <div ref={bottomRef} />

      {!isAtBottom && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-24 right-6 z-50 rounded-full bg-primary text-primary-foreground px-3 py-2 text-xs shadow-lg"
        >
          ↓ Novas mensagens
        </button>
      )}
    </div>
  );
}
