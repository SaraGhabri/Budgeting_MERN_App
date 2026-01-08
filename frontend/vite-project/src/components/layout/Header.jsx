import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ title }) => {
  const { user, logout } = useAuth();

  // Fonction pour obtenir les initiales
  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>

      <div className="header-actions">
        <div className="user-info">
          <div className="user-avatar">
            {getInitials(user?.name)}
          </div>
          <div className="user-details">
            <span className="user-name">{user?.name}</span>
            <span className="user-email">{user?.email}</span>
          </div>
        </div>

        <button onClick={logout} className="logout-btn">
          <LogOut />
          <span>Déconnexion</span>
        </button>
      </div>
    </header>
  );
};

export default Header;