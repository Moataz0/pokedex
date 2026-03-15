import styles from './Header.module.css';

interface Props {
  subtitle?: string;
}

export default function Header({ subtitle }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.bolt}>⚡</span>
        <h1 className={styles.title}>Pokédex</h1>
      </div>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}
