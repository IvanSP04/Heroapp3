import { useState } from "react";
import { useHeroes, type Hero } from "../context/HeroContext";
import HeroRow from "../components/HeroRow";
import HeroDetail from "../components/HeroDetails";

export default function Favorites() {
  const { favorites } = useHeroes();
  const [selected, setSelected] = useState<Hero | null>(null);

  return (
    <>
      <div className="home-header">
        <h1>Favoritos</h1>
        <p>{favorites.length} héroe{favorites.length !== 1 ? "s" : ""} guardado{favorites.length !== 1 ? "s" : ""}</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-msg">
          // LISTA_VACÍA<br />
          Agrega héroes desde la pantalla de inicio usando ♡
        </div>
      ) : (
        <div className="heroes-list">
          <div className="heroes-list-header">
            <span>#</span>
            <span>IMG</span>
            <span>NOMBRE</span>
            <span>ALINEACIÓN</span>
            <span>PODER</span>
            <span>FAV</span>
          </div>
          {favorites.map((hero) => (
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