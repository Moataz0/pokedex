import { useState, useEffect } from 'react';
import Header from '../components/Header';
import PokemonGrid from '../components/PokemonGrid';
import Pagination from '../components/Pagination';
import ErrorMessage from '../components/ErrorMessage';
import { usePokemonList } from '../hooks/usePokemonList';
import { useLoadMore } from '../hooks/useLoadMore';
import styles from './ListPage.module.css';

type ViewMode = 'pagination' | 'loadmore';

const PAGE_SIZE = 20;

function PaginationView() {
  const [page, setPage] = useState(1);
  const { pokemon, total, totalPages, loading, error } = usePokemonList(page);

  const retry = () => setPage((p) => p);

  if (error) return <ErrorMessage message={error} onRetry={retry} />;

  return (
    <>
      <PokemonGrid pokemon={pokemon} loading={loading} skeletonCount={PAGE_SIZE} />
      {!loading && totalPages > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => {
            setPage(p);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          total={total}
          pageSize={PAGE_SIZE}
        />
      )}
    </>
  );
}

function LoadMoreView() {
  const { pokemon, loading, initialLoading, error, hasMore, init, loadNext } = useLoadMore();

  useEffect(() => {
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error && pokemon.length === 0) {
    return <ErrorMessage message={error} onRetry={init} />;
  }

  return (
    <>
      <PokemonGrid
        pokemon={pokemon}
        loading={initialLoading}
        skeletonCount={PAGE_SIZE}
      />

      {error && pokemon.length > 0 && (
        <ErrorMessage message={error} onRetry={loadNext} />
      )}

      {!error && (
        <div className={styles.loadMoreArea}>
          {loading && !initialLoading ? (
            <div className={styles.loadingSpinner}>
              <span className={styles.spinner} />
              <span>Loading more Pokémon...</span>
            </div>
          ) : hasMore ? (
            <button className={styles.loadMoreBtn} onClick={loadNext}>
              Load More
            </button>
          ) : (
            <p className={styles.allLoaded}>🎉 All Pokémon loaded!</p>
          )}
          {pokemon.length > 0 && (
            <p className={styles.showingCount}>Showing {pokemon.length} Pokémon</p>
          )}
        </div>
      )}
    </>
  );
}

export default function ListPage() {
  const [view, setView] = useState<ViewMode>('pagination');

  return (
    <div className={styles.page}>
      <Header subtitle={`Discover and explore Pokémon with ${view === 'pagination' ? 'page controls' : 'infinite scroll'}`} />

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${view === 'pagination' ? styles.active : ''}`}
          onClick={() => setView('pagination')}
        >
          Pagination View
        </button>
        <button
          className={`${styles.tab} ${view === 'loadmore' ? styles.active : ''}`}
          onClick={() => setView('loadmore')}
        >
          Load More View
        </button>
      </div>

      <main className={styles.content}>
        {view === 'pagination' ? <PaginationView /> : <LoadMoreView />}
      </main>
    </div>
  );
}
