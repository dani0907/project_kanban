import styles from './header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_logo}>
        <div className={styles['header_logo-icon']}>✦</div>
        <span className={styles['header_logo-text']}>
          kanban<span>.</span>
        </span>
      </div>

      <nav className={styles.header_nav}>
        <button className={styles['header_nav-btn']}>Boards</button>
        <button className={styles['header_nav-btn']}>Members</button>
        <div className={styles.header_avatar}>D</div>
      </nav>
    </header>
  );
}

export default Header;