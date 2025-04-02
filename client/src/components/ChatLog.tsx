import './ChatLog.css';
import MessageItem from './MessageItem';
import { Message } from './ChatSection';
import { useEffect, useRef } from 'react';

interface ChatLogProps {
  messages: Message[];
}

const ChatLog = ({ messages }: ChatLogProps) => {
  const chatLogRef = useRef<HTMLDivElement>(null);

  // messages가 변경될 때마다 스크롤을 가장 아래로 이동
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]); // messages 배열이 변경될 때 실행

  return (
    <div ref={chatLogRef} className="ChatLog">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          type={msg.type}
          content={msg.content}
          timestamp={msg.timestamp}
        />
      ))}
    </div>
  );
};

export default ChatLog;

/*
{messages.map((message, index) => (
<MessageItem key={index} message={message} />
))}

<MessageItem
        type="send"
        content="Lorem ipsum dolor sit amet consectetur adipiscing elit. "
        timestamp="06:31 PM"
      />
      <MessageItem
        type="received"
        content="Lorem ipsum dolor sit amet consectetur adipiscing elit. "
        timestamp="06:32 PM"
      />
 */
