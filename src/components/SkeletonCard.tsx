import styles from './SkeletonCard.module.css';

export default function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.imgArea} />
      <div className={styles.info}>
        <div className={`${styles.line} ${styles.name}`} />
        <div className={`${styles.line} ${styles.id}`} />
        <div className={`${styles.line} ${styles.type}`} />
      </div>
    </div>
  );
}
