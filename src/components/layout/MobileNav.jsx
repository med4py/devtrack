import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: 'bi-grid-1x2-fill' },
  { to: '/tasks', label: 'Tasks', icon: 'bi-list-task' },
  { to: '/learning', label: 'Learning', icon: 'bi-book-half' },
  { to: '/statistics', label: 'Statistics', icon: 'bi-bar-chart-line-fill' },
  { to: '/settings', label: 'Settings', icon: 'bi-gear-fill' },
];

function MobileNav({ show, onClose }) {
  if (!show) {
    return null;
  }

  return (
    <div className="mobile-nav-overlay" onClick={onClose}>
      <div className="mobile-nav" onClick={(event) => event.stopPropagation()}>
        <div className="mobile-nav__header">
          <div className="sidebar__brand">
            <div className="sidebar__logo">
              <i className="bi bi-code-slash" aria-hidden="true"></i>
            </div>
            <span>DevTrack</span>
          </div>
          <button type="button" className="btn-close btn-close-white" aria-label="Close menu" onClick={onClose}></button>
        </div>

        <nav className="mobile-nav__list" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) => `mobile-nav__link ${isActive ? 'active' : ''}`}
            >
              <i className={`bi ${item.icon}`} aria-hidden="true"></i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default MobileNav;
