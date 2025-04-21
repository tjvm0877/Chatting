import { create } from 'zustand';
import { ReceiveMessage } from '../types/Message';

interface chatState {
  chatId: string | null;
  name: string;
  messages: ReceiveMessage[];
  setChatId: (value: string) => void;
  setName: (value: string) => void;
  setMessages: (message: ReceiveMessage) => void;
  clearChatMessages: () => void;
}

const useChatStore = create<chatState>((set) => ({
  chatId: null,
  name: '',
  messages: [],
  setChatId: (value: string) => set({ chatId: value }),
  setName: (value: string) => set({ name: value }),
  setMessages: (message: ReceiveMessage) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  clearChatMessages: () => set({ messages: [] }),
}));

export default useChatStore;
