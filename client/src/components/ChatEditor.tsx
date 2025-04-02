import { useState } from 'react';
import Button from './Button';
import './ChatEditor.css';

interface ChatEditorProps {
  send: (content: string) => void;
}

const ChatEditor = ({ send }: ChatEditorProps) => {
  const [chatInput, setChatInput] = useState('');
  const onChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  const onSendClick = () => {
    if (chatInput.trim() === '') {
      return; // 빈 입력 방지
    }

    send(chatInput); // 부모의 sendMessage 호출
    setChatInput(''); // 입력 필드 초기화
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSendClick(); // Enter 키를 눌렀을 때 메시지 전송
    }
  };

  return (
    <div className="ChatEditor">
      <input
        value={chatInput}
        placeholder="Enter message"
        onChange={onChatInputChange}
        onKeyDown={onKeyDown}
      />
      <Button onClick={onSendClick} text="&gt;" />
    </div>
  );
};

export default ChatEditor;
