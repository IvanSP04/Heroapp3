import { useState } from "react";
import { useHeroes, type Hero } from "../context/HeroContext";

const STAT_LABELS: Record<string, string> = {
  intelligence: "Inteligencia",
  strength:     "Fuerza",
  speed:        "Velocidad",
  durability:   "Durabilidad",
  power:        "Poder",
  combat:       "Combate",
};

function totalPower(hero: Hero) {
  return Object.values(hero.powerstats ?? {}).reduce((a, b) => a + b, 0);
}

export default function Original() {
  const { heroes } = useHeroes();
  const [hero1Id, setHero1Id] = useState<string>("");
  const [hero2Id, setHero2Id] = useState<string>("");
  const [result, setResult]   = useState<"h1" | "h2" | "tie" | null>(null);

  const hero1 = heroes.find((h) => h.id === Number(hero1Id)) ?? null;
  const hero2 = heroes.find((h) => h.id === Number(hero2Id)) ?? null;

  function runBattle() {
    if (!hero1 || !hero2) return;
    const p1 = totalPower(hero1);
    const p2 = totalPower(hero2);
    if (p1 > p2)      setResult("h1");
    else if (p2 > p1) setResult("h2");
    else               setResult("tie");
  }

  const stats1   = hero1?.powerstats ?? {};
  const stats2   = hero2?.powerstats ?? {};
  const statKeys = Object.keys({ ...stats1, ...stats2 });
  const winnerName =
    result === "h1" ? hero1?.name :
    result === "h2" ? hero2?.name : "Empate";

  return (
    <>
      <div className="home-header">
        <h1>Batalla</h1>
        <p>Selecciona dos héroes y compara sus estadísticas</p>
      </div>

      <div className="battle-selectors">
        <div className="battle-selector-wrap">
          <label>// HÉROE 1</label>
          <select className="filter-select" value={hero1Id}
            onChange={(e) => { setHero1Id(e.target.value); setResult(null); }}>
            <option value="">Seleccionar...</option>
            {heroes.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
          {hero1 && (
            <div className="battle-hero-preview">
              <img src={hero1.images?.sm} alt={hero1.name}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = "https://placehold.co/80x110?text=?";
                }} />
              <span>{hero1.name}</span>
              <span style={{ color: "var(--accent)" }}>⚡ {totalPower(hero1)}</span>
            </div>
          )}
        </div>

        <div className="vs-divider">VS</div>

        <div className="battle-selector-wrap">
          <label>// HÉROE 2</label>
          <select className="filter-select" value={hero2Id}
            onChange={(e) => { setHero2Id(e.target.value); setResult(null); }}>
            <option value="">Seleccionar...</option>
            {heroes.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
          {hero2 && (
            <div className="battle-hero-preview">
              <img src={hero2.images?.sm} alt={hero2.name}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = "https://placehold.co/80x110?text=?";
                }} />
              <span>{hero2.name}</span>
              <span style={{ color: "var(--accent)" }}>⚡ {totalPower(hero2)}</span>
            </div>
          )}
        </div>
      </div>

      {hero1 && hero2 && (
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <button className="battle-btn" onClick={runBattle}>⚡ INICIAR BATALLA</button>
        </div>
      )}

      {result && hero1 && hero2 && (
        <div className="battle-result">
          <div className={`winner-banner ${result === "tie" ? "tie" : ""}`}>
            {result === "tie"
              ? "// EMPATE — estadísticas idénticas"
              : <>// GANADOR: <strong>{winnerName}</strong> <span>por diferencia de puntos de poder</span></>
            }
          </div>
          <div className="battle-stats-table">
            {statKeys.map((key) => {
              const v1  = stats1[key] ?? 0;
              const v2  = stats2[key] ?? 0;
              const max = Math.max(v1, v2, 1);
              return (
                <div key={key} className="battle-stat-row">
                  <div className="battle-stat-val left"
                    style={{ color: v1 > v2 ? "var(--good)" : v1 < v2 ? "var(--bad)" : "var(--text)" }}>
                    {v1}
                  </div>
                  <div>
                    <div className="battle-stat-bars">
                      <div className="battle-bar-wrap left">
                        <div className="battle-bar" style={{ width: `${(v1 / max) * 100}%` }} />
                      </div>
                      <div className="battle-stat-label">{STAT_LABELS[key] ?? key}</div>
                      <div className="battle-bar-wrap">
                        <div className="battle-bar" style={{ width: `${(v2 / max) * 100}%`, background: "var(--accent2)" }} />
                      </div>
                    </div>
                  </div>
                  <div className="battle-stat-val"
                    style={{ color: v2 > v1 ? "var(--good)" : v2 < v1 ? "var(--bad)" : "var(--text)" }}>
                    {v2}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}