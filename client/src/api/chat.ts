import axiosInstance from './axios';
import ChatLog from '../components/ChatLog';

export interface ChatInfo {
  uuid: string;
  name: string;
}

export interface ChatCreatedResponse {
  uuid: string;
}

export interface ChatLog {
  chatId: number;
  sender: string;
  content: string;
  sentAt: string;
}

export const getChatList = async (): Promise<ChatInfo[]> => {
  try {
    const response = await axiosInstance.get<ChatInfo[]>('/chats');
    return response.data;
  } catch (error) {
    console.error('Failed to get chat info:', error);
    throw error;
  }
};

export const requestCreateChat = async (
  recipient: string
): Promise<ChatCreatedResponse> => {
  try {
    const response = await axiosInstance.post<ChatCreatedResponse>(
      '/chats',
      {},
      {
        params: {
          recipient: recipient,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Create chat failed:', error);
    throw error;
  }
};

export const getChatLogs = async (
  chat: string,
  lastChatId?: number,
  size?: number
): Promise<ChatLog[]> => {
  try {
    const params: Record<string, string | number> = { chat };
    if (lastChatId !== undefined) params.lastChatId = lastChatId;
    if (size !== undefined) params.size = size;

    const response = await axiosInstance.get<ChatLog[]>('/chats/logs', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Create chat failed:', error);
    throw error;
  }
};
