import { useState, useEffect, useCallback } from 'react';
import { fetchPokemon } from '../api/pokemon';
import type { Pokemon } from '../types';

export function usePokemonDetails(id?: string) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchPokemon(id);
      setPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Pokémon');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { pokemon, loading, error, retry: load };
}