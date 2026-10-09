import { ArrowUpRight, Check } from "lucide-react";
import { SCANNER_URL, reviewMailto } from "@/lib/contact";

const REVIEW_COVERS = [
  "Autenticación, sesiones y control de acceso: qué puede ver y hacer cada usuario.",
  "Base de datos en Supabase: políticas RLS, claves expuestas y permisos de storage.",
  "Next.js y Vercel: variables de entorno, headers, previews públicos y rutas de API sin proteger.",
  "Dependencias con vulnerabilidades conocidas, y cuáles importan de verdad.",
  "Lo que se ve desde afuera: HTTPS, certificado, cookies e información expuesta.",
];

const REVIEW_DELIVERS = [
  "Un informe en PDF con cada hallazgo: evidencia, riesgo y cómo corregirlo, ordenado por prioridad.",
  "Una llamada de 30 minutos para repasarlo juntos.",
  "Opcional: re-chequeo de las correcciones.",
];

const PIPELINE_ITEMS = [
  "Chequeos automáticos en GitHub Actions: dependencias vulnerables, secretos filtrados y análisis estático del código.",
  "Queda funcionando y documentado: te explico qué hace cada paso y cómo leer los resultados.",
];

const HOW_I_WORK = [
  "Solo sobre sistemas tuyos o con tu autorización por escrito.",
  "Alcance, plazo y precio acordados antes de empezar.",
  "Sin pruebas destructivas ni de carga.",
  "Confidencialidad sobre todo lo que vea.",
];

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm text-fg/70 leading-relaxed">
          <Check size={14} aria-hidden="true" className="mt-1 shrink-0 text-fg/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const label = "text-xs font-mono tracking-widest uppercase text-fg/60";

export default function ServicesSection() {
  return (
    <div className="flex flex-col px-6 py-20 max-w-5xl mx-auto">
      <div className="max-w-3xl mb-10">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide text-fg/95">Servicios</h2>
        <p className="mt-4 text-fg/70 text-base leading-relaxed">
          Reviso aplicaciones web y te digo, en lenguaje claro, qué corregir primero.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <article className="flex flex-col rounded-lg border border-line p-6 md:col-span-3 md:p-8">
          <p className={label}>Servicio principal</p>
          <h3 className="mt-3 text-xl md:text-2xl font-light text-fg/95">Revisión de seguridad express</h3>
          <p className="mt-3 text-sm text-fg/70 leading-relaxed">
            Para aplicaciones hechas con Next.js, Supabase y Vercel que van a salir a producción o ya tienen usuarios.
          </p>

          <h4 className={`mt-6 ${label}`}>Qué reviso</h4>
          <CheckList items={REVIEW_COVERS} />

          <h4 className={`mt-6 ${label}`}>Qué recibís</h4>
          <CheckList items={REVIEW_DELIVERS} />

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={reviewMailto()}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Pedí una revisión
            </a>
            <a
              href={SCANNER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-fg/70 underline underline-offset-4 transition-colors hover:text-fg/95"
            >
              Probá el escáner gratis
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </article>

        <div className="flex flex-col gap-6 md:col-span-2">
          <article className="rounded-lg border border-line p-6">
            <p className={label}>Complemento</p>
            <h3 className="mt-3 text-lg font-light text-fg/95">Seguridad automática en tu repositorio</h3>
            <CheckList items={PIPELINE_ITEMS} />
          </article>

          <article className="rounded-lg border border-line p-6">
            <h3 className={label}>Cómo trabajo</h3>
            <CheckList items={HOW_I_WORK} />
          </article>
        </div>
      </div>

      <p className="mt-6 max-w-3xl text-xs text-fg/60 leading-relaxed">
        Es una revisión acotada: no reemplaza una auditoría de cumplimiento ni un test de penetración completo.
      </p>
    </div>
  );
}
