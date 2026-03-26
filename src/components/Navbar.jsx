import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-cross">✝</span>
          <span className="navbar-name">Lonu University</span>
        </Link>

        <nav className="navbar-links">
          <NavLink to="/courses" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Programs
          </NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Dashboard
              </NavLink>
              <NavLink to="/my-courses" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                My Courses
              </NavLink>
              <NavLink to="/grades" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Grades
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Profile
              </NavLink>
              <button className="nav-btn nav-btn-outline" onClick={handleLogout}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Sign In
              </NavLink>
              <Link to="/register" className="nav-btn nav-btn-primary">
                Apply Now
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
