import { useState, useEffect } from "react";
import { HeroProvider } from "./context/HeroContext";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Original from "./pages/Original";
import Info from "./pages/Info";
import User from "./pages/User";
import SplashScreen from "./components/SplashScreen";

const TABS = [
  { id: "home",      label: "INICIO" },
  { id: "favorites", label: "FAVORITOS" },
  { id: "battle",    label: "BATALLA" },
  { id: "user",      label: "PERFIL" },
  { id: "info",      label: "INFO" },
];

function AppContent() {
  const [tab, setTab] = useState("home");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <>
      <div className="page">
        {tab === "home"      && <Home />}
        {tab === "favorites" && <Favorites />}
        {tab === "battle"    && <Original />}
        {tab === "user"      && <User />}
        {tab === "info"      && <Info />}
      </div>

      <nav className="bottom-nav">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`nav-btn ${tab === t.id ? "nav-active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </>
  );
}

export default function App() {
  return (
    <HeroProvider>
      <AppContent />
    </HeroProvider>
  );
}