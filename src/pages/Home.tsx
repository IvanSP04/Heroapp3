import { useState, useMemo } from "react";
import { useHeroes, type Hero } from "../context/HeroContext";
import HeroRow from "../components/HeroRow";
import HeroDetail from "../components/HeroDetails";

const PUBLISHERS = ["Marvel Comics", "DC Comics", "Dark Horse Comics", "Image Comics", "NBC - Heroes"];
const ALIGNMENTS = ["good", "bad", "neutral"];

export default function Home() {
  const { heroes, loading, error } = useHeroes();
  const [search, setSearch]       = useState("");
  const [publisher, setPublisher] = useState("");
  const [alignment, setAlignment] = useState("");
  const [selected, setSelected]   = useState<Hero | null>(null);

  const filtered = useMemo(() => {
    return heroes.filter((h) => {
      const matchName      = h.name.toLowerCase().includes(search.toLowerCase());
      const matchPublisher = !publisher || h.biography?.publisher === publisher;
      const matchAlignment = !alignment || h.biography?.alignment === alignment;
      return matchName && matchPublisher && matchAlignment;
    });
  }, [heroes, search, publisher, alignment]);

  function clearFilters() {
    setSearch("");
    setPublisher("");
    setAlignment("");
  }

  if (loading) return <div className="loading-screen">// CARGANDO UNIVERSO...</div>;
  if (error)   return <div className="error-msg">ERROR: {error}</div>;

  return (
    <>
      <div className="home-header">
        <h1>SuperHeroes DB</h1>
        <p>{filtered.length} / {heroes.length} heroes encontrados</p>
      </div>

      <div className="filters-bar">
        <input
          className="search-input"
          placeholder="// buscar heroe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="filter-select" value={publisher}
          onChange={(e) => setPublisher(e.target.value)}>
          <option value="">Editorial</option>
          {PUBLISHERS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select className="filter-select" value={alignment}
          onChange={(e) => setAlignment(e.target.value)}>
          <option value="">Alineacion</option>
          {ALIGNMENTS.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <button className="clear-btn" onClick={clearFilters}>LIMPIAR</button>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-msg">
          // NO_RESULTS<br />
          Ningun heroe coincide con los filtros aplicados.
        </div>
      ) : (
        <div className="heroes-list">
          <div className="heroes-list-header">
            <span>#</span>
            <span>IMG</span>
            <span>NOMBRE</span>
            <span>ALINEACION</span>
            <span>STATS</span>
            <span>FAV</span>
          </div>
          {filtered.map((hero) => (
            <HeroRow key={hero.id} hero={hero} onClick={setSelected} />
          ))}
        </div>
      )}

      {selected && (
        <HeroDetail hero={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}