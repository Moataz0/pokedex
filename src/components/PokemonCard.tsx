import { Link } from 'react-router-dom';
import type { PokemonCardData } from '../types';
import styles from './PokemonCard.module.css';

export default function PokemonCard({ pokemon }: {pokemon: PokemonCardData;}) {
  const id = String(pokemon.id).padStart(3, '0');

  return (
    <Link to={`/pokemon/${pokemon.id}`} className={styles.card}>
      <div className={styles.imgWrapper}>
        <img
          src={pokemon.spriteUrl}
          alt={pokemon.name}
          className={styles.img}
          loading="lazy"
        />
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{pokemon.name}</p>
        <p className={styles.id}>#{id}</p>
      </div>
    </Link>
  );
}