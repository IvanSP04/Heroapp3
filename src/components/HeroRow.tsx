import { useHeroes, type Hero } from "../context/HeroContext";

type Props = {
  hero: Hero;
  onClick: (hero: Hero) => void;
};

export default function HeroRow({ hero, onClick }: Props) {
  const { toggleFavorite, isFavorite } = useHeroes();
  const fav = isFavorite(hero.id);

  function handleFav(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    toggleFavorite(hero);
  }

  const alignment = hero.biography?.alignment ?? "neutral";
  const alignColor: Record<string, string> = {
    good:    "var(--good)",
    bad:     "var(--bad)",
    neutral: "var(--neutral)",
  };
  const color = alignColor[alignment] ?? "var(--neutral)";

  const stats = hero.powerstats ?? {};
  const avgPower = Object.keys(stats).length
    ? Math.round(Object.values(stats).reduce((a, b) => a + b, 0) / Object.values(stats).length)
    : null;

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
        <span className="hero-row-pub">{hero.biography?.publisher ?? "—"}</span>
      </div>

      <span className="hero-row-tag" style={{ color, borderColor: color }}>
        {alignment}
      </span>

      <div className="hero-row-stats">
        {avgPower !== null && <span>⚡ {avgPower}</span>}
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