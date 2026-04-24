import { useState } from "react";
import { useHeroes, type Hero } from "../context/HeroContext";

export default function User() {
  const { favorites, heroes } = useHeroes();
  const [name, setName]       = useState(() => localStorage.getItem("user-name") ?? "");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]     = useState(name);

  function saveName() {
    const trimmed = draft.trim() || "Usuario";
    setName(trimmed);
    localStorage.setItem("user-name", trimmed);
    setEditing(false);
  }

  const topHero = favorites.reduce<Hero | null>((best, h) => {
    const score = (x: Hero) => Object.values(x.powerstats ?? {}).reduce((a, b) => a + b, 0);
    if (!best) return h;
    return score(h) > score(best) ? h : best;
  }, null);

  const goodCount    = favorites.filter((h) => h.biography?.alignment === "good").length;
  const badCount     = favorites.filter((h) => h.biography?.alignment === "bad").length;
  const neutralCount = favorites.filter((h) => h.biography?.alignment === "neutral").length;
  const total        = favorites.length || 1;

  const pubMap: Record<string, number> = {};
  favorites.forEach((h) => {
    const pub = h.biography?.publisher ?? "Otro";
    pubMap[pub] = (pubMap[pub] ?? 0) + 1;
  });
  const pubEntries = Object.entries(pubMap).sort((a, b) => b[1] - a[1]).slice(0, 4);

  return (
    <>
      <div className="user-card">
        <div className="user-avatar">{name ? name[0].toUpperCase() : "?"}</div>
        <div className="user-name-display">
          {editing ? (
            <div className="user-name-edit">
              <input className="search-input" value={draft} autoFocus
                placeholder="Tu nombre..."
                style={{ maxWidth: 200 }}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveName()} />
              <button className="battle-btn" onClick={saveName}>GUARDAR</button>
              <button className="clear-btn" onClick={() => setEditing(false)}>CANCELAR</button>
            </div>
          ) : (
            <>
              <h2>{name || "USUARIO"}</h2>
              <button className="clear-btn" onClick={() => { setDraft(name); setEditing(true); }}>
                EDITAR NOMBRE
              </button>
            </>
          )}
        </div>
      </div>

      <div className="user-stats-grid">
        <div className="user-stat-card">
          <div className="user-stat-num">{favorites.length}</div>
          <div className="user-stat-label">Favoritos</div>
        </div>
        <div className="user-stat-card">
          <div className="user-stat-num">{heroes.length}</div>
          <div className="user-stat-label">Héroes totales</div>
        </div>
        <div className="user-stat-card">
          <div className="user-stat-num" style={{ color: "var(--good)" }}>{goodCount}</div>
          <div className="user-stat-label">Buenos</div>
        </div>
        <div className="user-stat-card">
          <div className="user-stat-num" style={{ color: "var(--bad)" }}>{badCount}</div>
          <div className="user-stat-label">Villanos</div>
        </div>
      </div>

      {topHero && (
        <div className="user-top-hero">
          <h3>// HÉROE FAVORITO PRINCIPAL</h3>
          <div className="top-hero-row">
            <img src={topHero.images?.sm} alt={topHero.name}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = "https://placehold.co/60x80?text=?";
              }} />
            <div>
              <strong>{topHero.name}</strong>
              <p>{topHero.biography?.publisher ?? "—"}</p>
              <p style={{ color: "var(--accent)", marginTop: 4 }}>
                ⚡ {Object.values(topHero.powerstats ?? {}).reduce((a, b) => a + b, 0)} pts
              </p>
            </div>
          </div>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="user-breakdown">
          <div className="breakdown-block">
            <h4>// ALINEACIÓN</h4>
            {[
              { label: "Good",    count: goodCount,    color: "var(--good)" },
              { label: "Bad",     count: badCount,     color: "var(--bad)" },
              { label: "Neutral", count: neutralCount, color: "var(--neutral)" },
            ].map(({ label, count, color }) => (
              <div key={label} className="breakdown-row">
                <span style={{ color }}>{label}</span>
                <div className="breakdown-bar-wrap">
                  <div className="breakdown-bar"
                    style={{ width: `${(count / total) * 100}%`, background: color }} />
                </div>
                <span>{count}</span>
              </div>
            ))}
          </div>
          <div className="breakdown-block">
            <h4>// EDITORIAL</h4>
            {pubEntries.map(([pub, count]) => (
              <div key={pub} className="breakdown-row">
                <span style={{ fontSize: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {pub.split(" ")[0]}
                </span>
                <div className="breakdown-bar-wrap">
                  <div className="breakdown-bar" style={{ width: `${(count / total) * 100}%` }} />
                </div>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}