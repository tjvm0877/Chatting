import './ChatHeader.css';
import profileImege from '../assets/profile.png';

const ChatHeader = () => {
  return (
    <div className="ChatHeader">
      <div className="image-wrapper">
        <img src={profileImege} alt="profile image" />
      </div>
      <div className="content">1:1 Chatting</div>
    </div>
  );
};

export default ChatHeader;
