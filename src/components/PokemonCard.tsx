import { Link } from 'react-router-dom';
import type { Pokemon } from '../types';
import { getOfficialArtwork } from '../api/pokemon';
import styles from './PokemonCard.module.css';

interface Props {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: Props) {
  const primaryType = pokemon.types[0]?.type.name ?? 'normal';
  const artwork = getOfficialArtwork(pokemon);
  const id = String(pokemon.id).padStart(3, '0');

  return (
    <Link to={`/pokemon/${pokemon.id}`} className={styles.card} data-type={primaryType}>
      <div className={styles.imgWrapper}>
        <img
          src={artwork}
          alt={pokemon.name}
          className={styles.img}
          loading="lazy"
        />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{pokemon.name}</p>
        <p className={styles.id}>#{id}</p>
        <div className={styles.types}>
          {pokemon.types.map((t) => (
            <span key={t.type.name} className={`${styles.typeBadge} type-${t.type.name}`}>
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
