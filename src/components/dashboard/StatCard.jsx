function StatCard({ title, value, subtitle, icon, accent = 'primary' }) {
  return (
    <div className="stat-card card-surface">
      <div className="stat-card__top">
        <div className={`stat-card__icon stat-card__icon--${accent}`}>
          <i className={`bi ${icon}`} aria-hidden="true"></i>
        </div>
        <span className="stat-card__title">{title}</span>
      </div>
      <div className="stat-card__value">{value}</div>
      {subtitle ? <div className="stat-card__subtitle">{subtitle}</div> : null}
    </div>
  );
}

export default StatCard;
