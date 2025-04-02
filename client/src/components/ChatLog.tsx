import './ChatLog.css';
import MessageItem from './MessageItem';

const ChatLog = () => {
  return (
    <div className="ChatLog">
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
    </div>
  );
};

export default ChatLog;
