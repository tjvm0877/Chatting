import { create } from 'zustand';
import { ChatMessage } from '../types/Message';

interface chatState {
  chatId: number | null;
  name: string;
  messages: ChatMessage[];
  setChatId: (value: number) => void;
  setName: (value: string) => void;
  setMessages: (message: ChatMessage) => void;
  clearChatMessages: () => void;
}

const useChatStore = create<chatState>((set) => ({
  chatId: null,
  name: '',
  messages: [],
  setChatId: (value: number) => set({ chatId: value }),
  setName: (value: string) => set({ name: value }),
  setMessages: (message: ChatMessage) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  clearChatMessages: () => set({ messages: [] }),
}));

export default useChatStore;
