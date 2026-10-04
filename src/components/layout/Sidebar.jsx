import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: 'bi-grid-1x2-fill' },
  { to: '/tasks', label: 'Tasks', icon: 'bi-list-task' },
  { to: '/learning', label: 'Learning', icon: 'bi-book-half' },
  { to: '/statistics', label: 'Statistics', icon: 'bi-bar-chart-line-fill' },
  { to: '/settings', label: 'Settings', icon: 'bi-gear-fill' },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <i className="bi bi-code-slash" aria-hidden="true"></i>
        </div>
        <span>DevTrack</span>
      </div>

      <nav className="sidebar__nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `sidebar__link ${isActive ? 'active' : ''}`}
          >
            <i className={`bi ${item.icon}`} aria-hidden="true"></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
