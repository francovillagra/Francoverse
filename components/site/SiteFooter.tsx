import { STATIC_EXPORT } from "@/lib/site-url";

export default function SiteFooter() {
  return (
    <footer className="band-dark">
      <div className="wrap">
        <div className="foot">
          <p>Franco Villagra, Buenos Aires, Argentina.</p>
          {/* Vercel Web Analytics solo existe en Vercel: en el sitio estático no se carga ni se menciona. */}
          {!STATIC_EXPORT && <p>Este sitio usa Vercel Web Analytics para contar visitas.</p>}
        </div>
      </div>
    </footer>
  );
}
