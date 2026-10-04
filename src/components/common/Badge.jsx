function Badge({ children, variant = 'primary', className = '' }) {
  const classes = ['badge-chip', `badge-chip--${variant}`, className].filter(Boolean).join(' ');

  return <span className={classes}>{children}</span>;
}

export default Badge;
