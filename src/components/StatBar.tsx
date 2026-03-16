import type { StatBarProps } from '../types';
import styles from './StatBar.module.css';



const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  speed: 'Speed',
};

function getStatColor(value: number): string {
  if (value < 40) return '#e63946';
  if (value < 60) return '#f4a261';
  if (value < 80) return '#f7d02c';
  if (value < 100) return '#7ac74c';
  return '#457b9d';
}

export default function StatBar({ name, value, max = 255 }: StatBarProps) {
  const label = STAT_LABELS[name] ?? name;
  const pct = Math.round((value / max) * 100);
  const color = getStatColor(value);

  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}
