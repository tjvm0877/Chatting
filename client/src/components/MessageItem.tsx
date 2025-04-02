import './MessageItem.css';

interface MessageItemProps {
  type: 'received' | 'send';
  content: string;
  timestamp: string;
}

const MessageItem = ({ type, content, timestamp }: MessageItemProps) => {
  return (
    <div className={`MessageItem type_${type}`}>
      {type === 'received' ? (
        <>
          <div className="content">{content}</div>
          <div className="timestamp">{timestamp}</div>
        </>
      ) : (
        <>
          <div className="timestamp">{timestamp}</div>
          <div className="content">{content}</div>
        </>
      )}
    </div>
  );
};

export default MessageItem;
