import { useState, useEffect } from 'react';
import { fetchPokemonList, getPokemonIdFromUrl, getPokemonImage } from '../api/pokemon';
import type { PokemonCardData } from '../types';

const PAGE_SIZE = 20;

export function usePokemonList(page: number) {
  const [pokemon, setPokemon] = useState<PokemonCardData[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const offset = (page - 1) * PAGE_SIZE;

      try {
        const data = await fetchPokemonList(PAGE_SIZE, offset);

        if (cancelled) return;

         const mapped: PokemonCardData[] = data.results.map((p) => {
          const id = getPokemonIdFromUrl(p.url);

          return {
            id,
            name: p.name,
            spriteUrl: getPokemonImage(id),
          };
        });

        setPokemon(mapped);
        setTotal(data.count);
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Something went wrong');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return { pokemon, total, totalPages, loading, error };
}