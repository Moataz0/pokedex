import PokemonCard from './PokemonCard';
import SkeletonCard from './SkeletonCard';
import styles from './PokemonGrid.module.css';
import type { PokemonGrid } from '../types';



export default function PokemonGrid({ pokemon, loading, skeletonCount = 20 }: PokemonGrid) {
  const showSkeletons = loading && pokemon.length === 0;

  return (
    <div className={styles.grid}>
      {showSkeletons &&
        Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={`sk-${i}`} />
        ))}

      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}

      {loading && pokemon.length > 0 &&
        Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={`sk-${i}`} />
        ))}
    </div>
  );
}