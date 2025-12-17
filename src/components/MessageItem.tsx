import { motion } from 'framer-motion';
import { useChatStore } from '../store/chat.store';
import type { Message } from '../store/chat.store';

interface Props {
  message: Message;
}

export default function MessageItem({ message }: Props) {
  const mySocketId = useChatStore((state) => state.socketId);
  const isMe = message.socketId === mySocketId;

  if (message.system) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-xs text-muted-foreground italic"
      >
        {message.content}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
    >
      <div className="max-w-xs flex flex-col">
        <div
          className={`rounded-lg p-2 ${
            isMe ? 'bg-primary text-primary-foreground' : 'bg-stone-100'
          }`}
        >
          {message.content && <p className="text-sm">{message.content}</p>}

          {message.imageUrl && (
            <img
              src={message.imageUrl}
              alt="Imagem enviada"
              loading="lazy"
              className="mt-1 rounded-lg max-h-60 object-cover"
            />
          )}
        </div>

        <span className="mt-1 text-xs text-primary">
          {message.username}
        </span>
      </div>
    </motion.div>
  );
}
