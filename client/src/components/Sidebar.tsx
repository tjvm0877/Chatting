import './Sidebar.css';
import UserInfo from './UserInfo';

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div className="sidebar-header">
        <UserInfo />
        <div>채팅방 만들기</div>
      </div>
      <div>
        <div>채팅방 리스트</div>
      </div>
    </div>
  );
};

export default Sidebar;

/*
    <div className="info-section">
      <div className="info-header">
        <div className="info-profile">
          <div className="img-section">
            <img src={profileImege} alt="profile image" />
          </div>
          <div className="name-section">
            <div>Jojn Dane</div>
            <div>test@example.com</div>
          </div>
        </div>
        <div className="button-section">
          <img src={add} />
        </div>
      </div>
      <div>채팅 리스트</div>
    </div>
 */
