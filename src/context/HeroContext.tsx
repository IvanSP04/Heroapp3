import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Hero = {
  id: number;
  name: string;
  powerstats?: Record<string, number>;
  biography?: {
    fullName?: string;
    publisher?: string;
    alignment?: string;
    firstAppearance?: string;
    placeOfBirth?: string;
    aliases?: string[];
  };
  appearance?: {
    gender?: string;
    race?: string;
    height?: string[];
    weight?: string[];
    eyeColor?: string;
    hairColor?: string;
  };
  work?: {
    occupation?: string;
    base?: string;
  };
  connections?: {
    groupAffiliation?: string;
  };
  images?: {
    sm?: string;
    lg?: string;
  };
};

type HeroContextType = {
  heroes: Hero[];
  loading: boolean;
  error: string | null;
  favorites: Hero[];
  toggleFavorite: (hero: Hero) => void;
  isFavorite: (id: number) => boolean;
};

const HeroContext = createContext<HeroContextType | undefined>(undefined);

const API_URL = "https://raw.githubusercontent.com/akabab/superhero-api/master/api/all.json";

export function HeroProvider({ children }: { children: ReactNode }) {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Hero[]>(() => {
    const saved = localStorage.getItem("superhero-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar la API");
        return res.json();
      })
      .then((data: Hero[]) => {
        setHeroes(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("superhero-favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(hero: Hero) {
    setFavorites((prev) => {
      const exists = prev.find((h) => h.id === hero.id);
      if (exists) return prev.filter((h) => h.id !== hero.id);
      return [...prev, hero];
    });
  }

  function isFavorite(heroId: number) {
    return favorites.some((h) => h.id === heroId);
  }

  return (
    <HeroContext.Provider value={{ heroes, loading, error, favorites, toggleFavorite, isFavorite }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHeroes() {
  const context = useContext(HeroContext);
  if (!context) throw new Error("useHeroes debe usarse dentro de HeroProvider");
  return context;
}