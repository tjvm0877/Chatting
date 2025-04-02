import Button from './Button';
import './ChatEditor.css';

const ChatEditor = () => {
  return (
    <div className="ChatEditor">
      <input placeholder="Enter message" />
      <Button onClick={() => console.log('send!')} text="&gt;" />
    </div>
  );
};

export default ChatEditor;
