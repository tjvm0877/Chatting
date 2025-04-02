import './ChatSection.css';
import ChatLog from './ChatLog';
import ChatHeader from './ChatHeader';
import ChatEditor from './ChatEditor';
import { useEffect, useRef, useState } from 'react';

export interface Message {
  id: number;
  type: 'received' | 'send';
  content: string;
  timestamp: string;
}

const getCurrentTime = () => {
  const now = new Date();
  let hours = now.getHours(); // 0~23
  const minutes = now.getMinutes().toString().padStart(2, '0'); // 두 자리로 맞춤
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // 0을 12로 변환
  return `${hours}:${minutes} ${ampm}`;
};

const ChatSection = () => {
  const webSocketRef = useRef<WebSocket | null>(null);
  const idRef = useRef(0);
  const [messages, setMessages] = useState<Message[]>([]); // 채팅 메시지 저장

  useEffect(() => {
    webSocketRef.current = new WebSocket('ws://localhost:8080/ws');

    webSocketRef.current.onopen = () => {
      console.log('WebSocket 연결 성공');
    };

    webSocketRef.current.onmessage = (event) => {
      console.log('수신 메시지:', event.data);
      setMessages((prev) => [
        ...prev,
        {
          id: idRef.current++,
          type: 'received',
          content: event.data,
          timestamp: getCurrentTime(),
        },
      ]);
      // { type: "send", content: chatInput }
    };

    webSocketRef.current.onerror = (error: Event) => {
      console.log(`WebSocket 오류 발생: ${error}`);
    };

    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
        console.log('WebSocket 연결 종료');
      }
    };
  }, []);

  // 메시지 전송 함수
  const sendMessage = (content: string) => {
    if (webSocketRef.current == null) {
      console.error('WebSocket이 연결되지 않았습니다.');
      return;
    }

    // WebSocket으로 메시지 전송
    webSocketRef.current.send(content);

    // 로컬 상태 업데이트
    setMessages((prev) => [
      ...prev,
      {
        id: idRef.current++,
        type: 'send',
        content: content,
        timestamp: getCurrentTime(),
      },
    ]);
  };

  return (
    <div className="ChatSection">
      <ChatHeader />
      <ChatLog messages={messages} />
      <ChatEditor send={sendMessage} />
    </div>
  );
};

export default ChatSection;
