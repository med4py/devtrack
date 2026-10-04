import { useAppContext } from '../../context/AppContext';

function Header({ onToggleNav }) {
  const { theme, toggleTheme } = useAppContext();

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          type="button"
          className="topbar__menu-btn"
          aria-label="Open navigation"
          onClick={onToggleNav}
        >
          <i className="bi bi-list" aria-hidden="true"></i>
        </button>
        <div>
          <p className="eyebrow">Developer dashboard</p>
          <h2>Welcome back 👋</h2>
        </div>
      </div>

      <button
        type="button"
        className="theme-toggle"
        aria-label="Toggle theme"
        onClick={toggleTheme}
      >
        <i className={`bi ${theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill'}`} aria-hidden="true"></i>
        <span>{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
      </button>
    </header>
  );
}

export default Header;
