export enum CommandType {
  PUBLISH = 'PUBLISH',
  AUTH = 'AUTH',
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE',
}

export enum MessageType {
  MESSAGE = 'MESSAGE',
  NOTIFICATION = 'NOTIFICATION',
}

export interface CommandMessage {
  type: CommandType;
  destination?: number;
  body: string;
}

export interface ChatMessage {
  type: MessageType;
  topic: number;
  sender: string;
  content: string;
}
