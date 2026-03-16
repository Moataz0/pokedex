import { useParams, Link } from 'react-router-dom';

import { getOfficialArtwork } from '../api/pokemon';
import StatBar from '../components/StatBar';
import ErrorMessage from '../components/ErrorMessage';
import styles from './DetailPage.module.css';
import { usePokemonDetails } from '../hooks/usePokemonDetail';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { pokemon, loading, error, retry } = usePokemonDetails(id);

  const primaryType = pokemon?.types[0]?.type.name ?? 'normal';

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.backBtn}>
          ← Back to List
        </Link>
      </div>

      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} />
          <p>Loading Pokémon...</p>
        </div>
      )}

      {error && <ErrorMessage message={error} onRetry={retry} />}

      {pokemon && !loading && (
        <div className={styles.container}>
          <div className={styles.card}>
    
            <div className={`${styles.cardHeader} type-${primaryType}`}>
              <h1 className={styles.name}>
                <span className={styles.bolt}>⚡</span> {pokemon.name}
              </h1>
              <p className={styles.idBadge}>#{String(pokemon.id).padStart(3, '0')}</p>
            </div>

            <div className={styles.body}>
        
              <div className={styles.leftCol}>
                <div className={styles.imgWrapper}>
                  <img
                    src={getOfficialArtwork(pokemon)}
                    alt={pokemon.name}
                    className={styles.img}
                  />
                </div>

                <div className={styles.types}>
                  {pokemon.types.map((t) => (
                    <span key={t.type.name} className={`${styles.typeBadge} type-${t.type.name}`}>
                      {t.type.name}
                    </span>
                  ))}
                </div>

                <div className={styles.measures}>
                  <div className={styles.measure}>
                    <span className={styles.measureIcon}>📏</span>
                    <span className={styles.measureLabel}>Height</span>
                    <strong>{(pokemon.height / 10).toFixed(1)} m</strong>
                  </div>
                  <div className={styles.measure}>
                    <span className={styles.measureIcon}>⚖️</span>
                    <span className={styles.measureLabel}>Weight</span>
                    <strong>{(pokemon.weight / 10).toFixed(1)} kg</strong>
                  </div>
                </div>
              </div>

      
              <div className={styles.rightCol}>
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Base Stats</h2>
                  <div className={styles.stats}>
                    {pokemon.stats.map((s) => (
                      <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
                    ))}
                  </div>
                </section>

                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Abilities</h2>
                  <div className={styles.abilities}>
                    {pokemon.abilities.map((a) => (
                      <span key={a.ability.name} className={`${styles.ability} ${a.is_hidden ? styles.hidden : ''}`}>
                        {a.ability.name}
                        {a.is_hidden && <em className={styles.hiddenTag}>Hidden</em>}
                      </span>
                    ))}
                  </div>
                </section>

                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Base Experience</h2>
                  <p className={styles.xp}>{pokemon.base_experience ?? '—'} XP</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
