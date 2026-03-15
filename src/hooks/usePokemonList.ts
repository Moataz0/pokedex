import { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemon, getPokemonIdFromUrl } from '../api/pokemon';
import type { Pokemon } from '../types';

const PAGE_SIZE = 20;

export function usePokemonList(page: number) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const offset = (page - 1) * PAGE_SIZE;

    fetchPokemonList(PAGE_SIZE, offset)
      .then(async (data) => {
        if (cancelled) return;
        setTotal(data.count);
        const details = await Promise.all(
          data.results.map((p) => fetchPokemon(getPokemonIdFromUrl(p.url)))
        );
        if (!cancelled) {
          setPokemon(details);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Something went wrong');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return { pokemon, total, totalPages, loading, error };
}
