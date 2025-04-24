// chatStore.ts
import { create } from 'zustand';
import { ReceiveMessage } from '../types/Message';

interface ChatState {
  chatId: string | null;
  name: string;
  messages: ReceiveMessage[];
  setChatId: (value: string) => void;
  setName: (value: string) => void;
  addMessage: (message: ReceiveMessage) => void;
  addPrevChat: (message: ReceiveMessage) => void;
  clearChatMessages: () => void;
  clearChat: () => void;
}

const useChatStore = create<ChatState>((set) => ({
  chatId: null,
  name: '',
  messages: [],
  setChatId: (value: string) => {
    console.log('setChatId 호출됨:', value); // 디버깅 로그 추가
    set({ chatId: value });
  },
  setName: (value: string) => set({ name: value }),
  addMessage: (message: ReceiveMessage) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  addPrevChat: (message: ReceiveMessage) =>
    set((state) => ({
      messages: [message, ...state.messages],
    })),
  clearChatMessages: () => set({ messages: [] }),
  clearChat: () =>
    set(() => ({
      chatId: null,
      name: '',
      messages: [],
    })),
}));

export default useChatStore;
