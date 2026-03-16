import type { PaginationProps } from '../types';
import styles from './Pagination.module.css';



function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | '...')[] = [];

  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, '...', total);
  } else if (current >= total - 3) {
    pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, '...', current - 1, current, current + 1, '...', total);
  }

  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange, total, pageSize }: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <button
          className={styles.navBtn}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹ Previous
        </button>

        <div className={styles.pages}>
          {pages.map((page, idx) =>
            page === '...' ? (
              <span key={`ellipsis-${idx}`} className={styles.ellipsis}>…</span>
            ) : (
              <button
                key={page}
                className={`${styles.pageBtn} ${page === currentPage ? styles.active : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          className={styles.navBtn}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ›
        </button>
      </div>

      <p className={styles.info}>
        Page {currentPage} of {totalPages} ({startItem}–{endItem} of {total} Pokémon)
      </p>
    </div>
  );
}
