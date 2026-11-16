import type { Metadata } from "next";
import Link from "next/link";

// Next ya agrega `noindex` a las páginas 404. Acá además se reemplazan dos cosas que heredaba de la raíz: la dirección
// canónica (apuntaba a la portada) y `robots` («index, follow», que contradecía a `noindex`).
export const metadata: Metadata = {
  title: "Página no encontrada | Franco Villagra",
  description: "La dirección pedida no existe en este sitio.",
  alternates: { canonical: null },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="contenido">
      <div className="wrap page">
        <h1 className="h2">Esta página no existe</h1>
        <div className="prose">
          <p>
            Error 404: la dirección no corresponde a ninguna página de este sitio. Puede estar mal escrita, o la página
            puede haber cambiado de lugar.
          </p>
        </div>
        <div className="acts">
          <Link className="btn" href="/">
            Volver al inicio
          </Link>
          <Link className="lnk" href="/proyectos">
            Ver los proyectos
          </Link>
        </div>
      </div>
    </main>
  );
}
