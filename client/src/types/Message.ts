export type MessageType = 'received' | 'sent';

export interface Message {
  type: MessageType;
  content: string;
  timestamp: string;
}
