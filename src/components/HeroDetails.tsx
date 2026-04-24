import { useHeroes, type Hero } from "../context/HeroContext";

type Props = {
  hero: Hero | null;
  onClose: () => void;
};

const STAT_LABELS: Record<string, string> = {
  intelligence: "Inteligencia",
  strength:     "Fuerza",
  speed:        "Velocidad",
  durability:   "Durabilidad",
  power:        "Poder",
  combat:       "Combate",
};

const STAT_COLORS: Record<string, string> = {
  intelligence: "#818cf8",
  strength:     "#f87171",
  speed:        "#facc15",
  durability:   "#34d399",
  power:        "#a78bfa",
  combat:       "#fb923c",
};

const ALIGN_COLOR: Record<string, string> = {
  good:    "var(--good)",
  bad:     "var(--bad)",
  neutral: "var(--neutral)",
};

export default function HeroDetail({ hero, onClose }: Props) {
  const { toggleFavorite, isFavorite } = useHeroes();

  if (!hero) return null;

  const fav = isFavorite(hero.id);
  const stats = hero.powerstats ?? ({} as Record<string, number>);
  const alignment = hero.biography?.alignment ?? "neutral";
  const alignColor = ALIGN_COLOR[alignment] ?? "var(--neutral)";

  return (
    <div className="hero-detail-overlay" onClick={onClose}>
      <div className="hero-detail" onClick={(e) => e.stopPropagation()}>

        <div className="detail-header-bar">
          <span>// HERO_PROFILE</span>
          <button className="detail-close" onClick={onClose}>[ CERRAR ]</button>
        </div>

        <div className="detail-body">
          <div className="detail-img-col">
            <img
              src={hero.images?.lg}
              alt={hero.name}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = "https://placehold.co/200x300?text=?";
              }}
            />
          </div>

          <div className="detail-info-col">
            <div>
              <div className="detail-name">{hero.name}</div>
              <div className="detail-tag" style={{ color: alignColor, borderColor: alignColor }}>
                {alignment}
              </div>
            </div>

            <div className="detail-meta">
              <div><span>NOMBRE REAL &nbsp;</span>{hero.biography?.fullName ?? "—"}</div>
              <div><span>EDITORIAL &nbsp;</span>{hero.biography?.publisher ?? "—"}</div>
              <div><span>PRIMERA APARICIÓN &nbsp;</span>{hero.biography?.firstAppearance ?? "—"}</div>
              <div><span>LUGAR DE NAC. &nbsp;</span>{hero.biography?.placeOfBirth ?? "—"}</div>
              <div><span>ALIAS &nbsp;</span>{hero.biography?.aliases?.join(", ") ?? "—"}</div>
              <div><span>GÉNERO &nbsp;</span>{hero.appearance?.gender ?? "—"}</div>
              <div><span>RAZA &nbsp;</span>{hero.appearance?.race ?? "—"}</div>
              <div><span>ALTURA &nbsp;</span>{hero.appearance?.height?.[1] ?? "—"}</div>
              <div><span>PESO &nbsp;</span>{hero.appearance?.weight?.[1] ?? "—"}</div>
              <div><span>OJOS &nbsp;</span>{hero.appearance?.eyeColor ?? "—"}</div>
              <div><span>CABELLO &nbsp;</span>{hero.appearance?.hairColor ?? "—"}</div>
              <div><span>OCUPACIÓN &nbsp;</span>{hero.work?.occupation ?? "—"}</div>
              <div><span>GRUPOS &nbsp;</span>{hero.connections?.groupAffiliation ?? "—"}</div>
            </div>

            <button
              className={`fav-btn ${fav ? "fav-active" : ""}`}
              style={{ fontSize: 13, letterSpacing: 1, padding: "6px 0" }}
              onClick={() => toggleFavorite(hero)}
            >
              {fav ? "♥ EN FAVORITOS" : "♡ AGREGAR A FAVORITOS"}
            </button>
          </div>
        </div>

        <div className="detail-stats">
          <h4>// POWER_STATS</h4>
          {Object.entries(stats).map(([key, val]) => (
            <div key={key} className="stat-row">
              <div className="stat-label">{STAT_LABELS[key] ?? key}</div>
              <div className="stat-bar-bg">
                <div
                  className="stat-bar-fill"
                  style={{
                    width: `${val}%`,
                    background: STAT_COLORS[key] ?? "var(--accent)",
                    boxShadow: `0 0 6px ${STAT_COLORS[key] ?? "var(--accent)"}88`,
                  }}
                />
              </div>
              <div className="stat-val">{val}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}