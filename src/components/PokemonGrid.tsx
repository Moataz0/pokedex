import type { Pokemon } from '../types';
import styles from './PokemonGrid.module.css';
import PokemonCard from './PokemonCard';
import SkeletonCard from './SkeletonCard';

interface Props {
  pokemon: Pokemon[];
  loading: boolean;
  skeletonCount?: number;
}

export default function PokemonGrid({ pokemon, loading, skeletonCount = 20 }: Props) {
  return (
    <div className={styles.grid}>
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
      {loading &&
        Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={`sk-${i}`} />
        ))}
    </div>
  );
}
