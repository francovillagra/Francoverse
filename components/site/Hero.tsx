import Link from "next/link";
import { reviewMailto } from "@/lib/contact";
import FindingPanel from "./FindingPanel";

export default function Hero() {
  return (
    <section className="wrap hero" aria-labelledby="nombre">
      <div className="hero-text">
        <h1 className="h1" id="nombre">
          Franco Villagra
        </h1>
        <p className="role">Desarrollador orientado a Ciberseguridad</p>
        <p className="lead">
          Reviso apps hechas con Next.js, Supabase y Vercel. Cada problema llega con su evidencia y cómo corregirlo, en un informe que
          tu equipo puede usar.
        </p>
        <div className="acts">
          <a className="btn" href={reviewMailto()}>
            Pedir una revisión
          </a>
          <Link className="lnk" href="/#servicio">
            Cómo trabajo
          </Link>
        </div>
        <p className="note">
          8 años como auditor externo en el sector público: escribo los hallazgos como en una auditoría, con evidencia, gravedad y
          recomendación.
        </p>
      </div>

      <div className="hero-panel">
        <FindingPanel />
      </div>
    </section>
  );
}
