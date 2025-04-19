import { CommandMessage, CommandType, ChatMessage } from '../types/Message';

type MessageCallback = (message: ChatMessage) => void;

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
      this.sendMessage(CommandType.AUTH, 'Bearer ' + accessToken);
      console.log('WebSocket connected');
    };

    this.socket.onmessage = (event: MessageEvent) => {
      try {
        console.log('메시지 수신됨', event.data);
        const message: ChatMessage = JSON.parse(event.data);
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

  public subscribe(chatId: number, callback: MessageCallback): () => void {
    // 서버에 구독 요청 전송 (프로토콜에 따라 구현)
    this.sendMessage(CommandType.SUBSCRIBE, '', chatId);

    // 콜백 등록
    this.messageCallbacks.add(callback);

    // 구독 해제 함수 반환
    return () => {
      this.messageCallbacks.delete(callback);
      this.sendMessage(CommandType.UNSUBSCRIBE, '', chatId);
    };
  }

  public sendMessage(
    command: CommandType,
    content: string,
    chatId?: number
  ): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return;
    }

    const message: CommandMessage = {
      type: command,
      destination: chatId,
      body: content,
    };

    this.socket.send(JSON.stringify(message));
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

export const webSocketClient = new WebSocketClient();
export default webSocketClient;
