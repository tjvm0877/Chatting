export const CLIENT_COMMAND = {
  CONNECT: 'CONNECT',
  SEND: 'SEND',
  SUBSCRIBE: 'SUBSCRIBE',
  UNSUBSCRIBE: 'UNSUBSCRIBE',
} as const;
export type ClientCommand =
  (typeof CLIENT_COMMAND)[keyof typeof CLIENT_COMMAND]; // 'PUBLISH' | 'AUTH' | 'SUBSCRIBE' | 'UNSUBSCRIBE'

export const SERVER_COMMAND = {
  MESSAGE: 'MESSAGE',
  CONNECTED: 'CONNECTED',
  ERROR: 'ERROR',
} as const;
export type ServerCommand =
  (typeof SERVER_COMMAND)[keyof typeof SERVER_COMMAND]; // 'MESSAGE' | 'NOTIFICATION'

// Client -> Server
export interface SentMessage {
  command: ClientCommand;
  destination: string;
  sender: string;
  content: string;
}

// Server -> Client
export interface ReceiveMessage {
  command: ServerCommand;
  destination: string;
  sender: string;
  content: string;
  timeStamp: string;
}
