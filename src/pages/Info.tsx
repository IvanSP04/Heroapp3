export default function Info() {
  return (
    <div className="info-page">
      <div className="info-hero-banner">
        <h1>Sobre esta aplicacion</h1>
        <p className="info-subtitle">Todo lo que necesitas saber sobre la API y los datos que usamos</p>
      </div>

      <div className="info-section">
        <h2>Que es la Superhero API</h2>
        <p>
          La <strong>Superhero API</strong> es una base de datos abierta y gratuita que contiene informacion
          detallada de mas de <strong>700 superheroes y villanos</strong> de diferentes universos de comics.
          Fue creada por el desarrollador <strong>Akabab</strong> y esta disponible publicamente en GitHub.
        </p>
        <div className="info-card">
          <div className="info-card-icon">[ URL ]</div>
          <div>
            <strong>URL base</strong>
            <code>https://raw.githubusercontent.com/akabab/superhero-api/master/api/all.json</code>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>Datos disponibles por heroe</h2>
        <div className="info-cards-row">
          <div className="info-card">
            <div className="info-card-icon">[ POW ]</div>
            <div>
              <strong>Estadisticas de poder</strong>
              <p>Inteligencia, fuerza, velocidad, durabilidad, poder y combate. Cada uno en escala del 0 al 100.</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">[ APR ]</div>
            <div>
              <strong>Apariencia</strong>
              <p>Genero, raza, altura, peso, color de ojos y color de cabello del personaje.</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">[ BIO ]</div>
            <div>
              <strong>Biografia</strong>
              <p>Nombre completo, primera aparicion, editorial, lugar de nacimiento y alias conocidos.</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">[ CON ]</div>
            <div>
              <strong>Conexiones</strong>
              <p>Grupos a los que pertenece el personaje y sus relaciones con otros.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>Editoriales incluidas</h2>
        <div className="info-publishers">
          {[
            { name: "Marvel Comics",     color: "#ef4444", desc: "Spider-Man, Iron Man, Thor, Hulk, X-Men..." },
            { name: "DC Comics",         color: "#3b82f6", desc: "Superman, Batman, Wonder Woman, Flash..." },
            { name: "Dark Horse Comics", color: "#8b5cf6", desc: "Hellboy, Ghost, X, The Mask..." },
            { name: "Image Comics",      color: "#22c55e", desc: "Spawn, Invincible, The Walking Dead..." },
            { name: "NBC - Heroes",      color: "#f59e0b", desc: "Personajes de la serie de television Heroes" },
          ].map((pub) => (
            <div key={pub.name} className="publisher-badge" style={{ borderColor: pub.color }}>
              <span className="publisher-dot" style={{ background: pub.color }} />
              <div>
                <strong>{pub.name}</strong>
                <p>{pub.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h2>Como funciona la app</h2>
        <div className="info-steps">
          <div className="step">
            <div className="step-num">1</div>
            <div>
              <strong>Carga de datos</strong>
              <p>Al abrir la app se hace un fetch al endpoint JSON de GitHub que trae todos los heroes de una vez.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div>
              <strong>Filtrado local</strong>
              <p>El buscador y los filtros funcionan del lado del cliente usando <code>useMemo</code> para no repetir llamadas a la API.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div>
              <strong>Favoritos persistentes</strong>
              <p>Los heroes favoritos se guardan en <code>localStorage</code> para que no se pierdan al cerrar el navegador.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">4</div>
            <div>
              <strong>Estado global</strong>
              <p>Se usa <code>React Context</code> para compartir los heroes y favoritos entre todas las pestanas sin prop drilling.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>Tecnologias usadas</h2>
        <div className="tech-row">
          {[
            { label: "React",        desc: "Libreria de UI" },
            { label: "Vite",         desc: "Bundler y dev server" },
            { label: "Context API",  desc: "Estado global" },
            { label: "localStorage", desc: "Persistencia de favoritos" },
            { label: "CSS puro",     desc: "Estilos personalizados" },
          ].map((t) => (
            <div key={t.label} className="tech-badge">
              <strong>{t.label}</strong>
              <span>{t.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section info-credit">
        <p>
          Datos provistos por{" "}
          <a href="https://github.com/akabab/superhero-api" target="_blank" rel="noreferrer">
            akabab/superhero-api
          </a>{" "}
          bajo licencia MIT. Esta app es un proyecto academico sin fines comerciales.
        </p>
      </div>
    </div>
  );
}