import { create } from 'zustand';

export interface Message {
  socketId?: string;
  username?: string;
  content?: string;    
  imageUrl?: string;
  system?: boolean;
  timestamp?: string;
}


interface ChatState {
  username: string;
  room: string;
  socketId: string;
  messages: Message[];
  setUser: (username: string, room: string) => void;
  setSocketId: (id: string) => void;
  addMessage: (msg: Message) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  username: '',
  room: '',
  socketId: '',
  messages: [],

  setUser: (username, room) => set({ username, room }),
  setSocketId: (id) => set({ socketId: id }),

  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
}));
