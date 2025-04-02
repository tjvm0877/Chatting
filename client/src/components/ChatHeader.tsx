import './ChatHeader.css';
import profileImege from '../assets/profile.png';

const ChatHeader = () => {
  return (
    <div className="ChatHeader">
      <div className="image-wrapper">
        <img src={profileImege} alt="profile image" />
      </div>
      <div className="content">Open Chatting</div>
    </div>
  );
};

export default ChatHeader;
