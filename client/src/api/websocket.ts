import {
  ReceiveMessage,
  CLIENT_COMMAND,
  ClientCommand,
  SentMessage,
} from '../types/Message';

type MessageCallback = (message: ReceiveMessage) => void;

class WebSocketClient {
  private socket: WebSocket | null = null;
  private isConnected: boolean = false;
  private messageCallbacks: Set<MessageCallback> = new Set();
  private readonly WS_URL = 'ws://localhost:8080/ws';

  public connect(accessToken: string): void {
    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    this.socket = new WebSocket(this.WS_URL);

    this.socket.onopen = () => {
      this.isConnected = true;
      this.sendMessage(CLIENT_COMMAND.CONNECT, 'Bearer ' + accessToken);
      console.log('WebSocket connected');
    };

    this.socket.onmessage = (event: MessageEvent) => {
      try {
        console.log('메시지 수신됨', event.data);
        const message: ReceiveMessage = JSON.parse(event.data);
        this.messageCallbacks.forEach((callback) => callback(message));
      } catch (e) {
        console.error('Error parsing message', e);
      }
    };

    this.socket.onclose = () => {
      this.isConnected = false;
      console.log('WebSocket disconnected');
    };

    this.socket.onerror = (error) => {
      this.isConnected = false;
      console.error('WebSocket error:', error);
    };
  }

  public disconnect(): void {
    if (!this.socket || !(this.socket.readyState === WebSocket.OPEN)) {
      return;
    }
    this.socket.close();
    this.socket = null;
    this.isConnected = false;
  }

  public subscribe(
    chatId: string,
    memberId: string,
    callback: MessageCallback
  ): () => void {
    this.sendMessage(CLIENT_COMMAND.SUBSCRIBE, '', memberId, chatId);
    this.messageCallbacks.add(callback);
    return () => {
      this.messageCallbacks.delete(callback);
      this.sendMessage(CLIENT_COMMAND.UNSUBSCRIBE, '', chatId);
    };
  }

  public sendMessage(
    command: ClientCommand,
    content?: string,
    memberId?: string,
    chatId?: string
  ): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return;
    }

    const message: SentMessage = {
      command: command,
      destination: chatId ? chatId : '',
      sender: memberId ? memberId : '',
      content: content ? content : '',
    };

    console.log(message);
    this.socket.send(JSON.stringify(message));
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

export const webSocketClient = new WebSocketClient();
export default webSocketClient;
