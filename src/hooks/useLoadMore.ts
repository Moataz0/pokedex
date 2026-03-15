import { useState, useCallback } from 'react';
import { fetchPokemonList, fetchPokemon, getPokemonIdFromUrl } from '../api/pokemon';
import type { Pokemon } from '../types';

const PAGE_SIZE = 20;

export function useLoadMore() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMore = useCallback(async (currentOffset: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonList(PAGE_SIZE, currentOffset);
      setTotal(data.count);
      const details = await Promise.all(
        data.results.map((p) => fetchPokemon(getPokemonIdFromUrl(p.url)))
      );
      setPokemon((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newOnes = details.filter((p) => !existingIds.has(p.id));
        return [...prev, ...newOnes];
      });
      setOffset(currentOffset + PAGE_SIZE);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setError(msg);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  const init = useCallback(() => {
    setInitialLoading(true);
    setPokemon([]);
    setOffset(0);
    setTotal(null);
    loadMore(0);
  }, [loadMore]);

  const loadNext = useCallback(() => {
    loadMore(offset);
  }, [loadMore, offset]);

  const hasMore = total === null || offset < total;

  return { pokemon, total, loading, initialLoading, error, hasMore, init, loadNext };
}
