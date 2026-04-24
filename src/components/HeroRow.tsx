import { useHeroes, type Hero } from "../context/HeroContext";

type Props = {
  hero: Hero;
  onClick: (hero: Hero) => void;
};

const ALIGN_COLOR: Record<string, string> = {
  good:    "var(--good)",
  bad:     "var(--bad)",
  neutral: "var(--neutral)",
};

export default function HeroRow({ hero, onClick }: Props) {
  const { toggleFavorite, isFavorite } = useHeroes();
  const fav       = isFavorite(hero.id);
  const alignment = hero.biography?.alignment ?? "neutral";
  const color     = ALIGN_COLOR[alignment] ?? "var(--neutral)";
  const stats     = hero.powerstats ?? {};
  const str       = stats.strength     ?? 0;
  const int       = stats.intelligence ?? 0;
  const spd       = stats.speed        ?? 0;

  function handleFav(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    toggleFavorite(hero);
  }

  return (
    <div className="hero-row" onClick={() => onClick(hero)}>
      <span className="hero-row-id">#{hero.id}</span>

      <img
        src={hero.images?.sm}
        alt={hero.name}
        className="hero-row-img"
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = "https://placehold.co/40x55?text=?";
        }}
      />

      <div className="hero-row-info">
        <span className="hero-row-name">{hero.name}</span>
        <span className="hero-row-pub">{hero.biography?.fullName ?? "—"}</span>
        <span className="hero-row-pub">{hero.biography?.publisher ?? "—"}</span>
      </div>

      <span className="hero-row-tag" style={{ color, borderColor: color }}>
        <span style={{
          display: "inline-block",
          width: 6, height: 6,
          borderRadius: "50%",
          background: color,
          marginRight: 5,
          verticalAlign: "middle",
        }} />
        {alignment}
      </span>

      <div className="hero-row-stats">
        <span>STR {str}</span>
        <span>INT {int}</span>
        <span>SPD {spd}</span>
      </div>

      <button
        className={`fav-btn ${fav ? "fav-active" : ""}`}
        onClick={handleFav}
      >
        {fav ? "♥" : "♡"}
      </button>
    </div>
  );
}