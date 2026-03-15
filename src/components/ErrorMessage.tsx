import styles from './ErrorMessage.module.css';

interface Props {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <p className={styles.msg}>{message}</p>
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
