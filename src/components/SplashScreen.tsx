export default function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-title">SuperHeroes DB</div>
        <p className="splash-subtitle">// CARGANDO EL UNIVERSO...</p>
        <div className="splash-loader">
          <div className="splash-bar" />
        </div>
      </div>
    </div>
  );
}