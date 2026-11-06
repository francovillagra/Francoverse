import { reviewMailto, sampleReportMailto } from "@/lib/contact";

const STEPS = [
  {
    title: "Alcance por escrito",
    text: "Se acuerda qué se revisa y cómo. Acceso de solo lectura al repositorio y NDA si lo piden. No hago pruebas sobre producción sin autorización escrita.",
  },
  {
    title: "Revisión",
    text: "Código, configuración y dependencias, incluidas las políticas RLS de Supabase.",
  },
  {
    title: "Informe",
    text: "Cada hallazgo con su gravedad, la evidencia, el impacto y cómo corregirlo, más un plan de corrección ordenado por prioridad.",
  },
  {
    title: "Llamada de devolución",
    text: "30 minutos para repasar el informe con quien lo va a corregir.",
  },
  {
    title: "Verificación de las correcciones (opcional)",
    text: "Compruebo que lo corregido funciona.",
  },
];

export default function ServiceSection() {
  return (
    <section className="sec band" id="servicio" aria-labelledby="t-servicio">
      <div className="wrap sv">
        <div className="sv-head">
          <h2 className="h2" id="t-servicio">
            Revisión de seguridad express
          </h2>
          <p className="sv-lead">
            Para apps hechas con Next.js, Supabase y Vercel. Reviso el código, la configuración (incluidas las políticas RLS de
            Supabase) y las dependencias, y entrego un informe priorizado en 3 a 5 días hábiles.
          </p>
          <p className="sv-sample">Informe de muestra: 6 páginas y 10 hallazgos, a pedido.</p>
          <p className="sv-sample">
            Es una revisión acotada: no reemplaza una auditoría de cumplimiento ni un test de penetración completo.
          </p>
          <div className="acts">
            <a className="btn" href={reviewMailto()}>
              Pedir una revisión
            </a>
            <a className="lnk" href={sampleReportMailto()}>
              Pedir el informe de muestra
            </a>
          </div>
        </div>
        <ol className="steps" role="list">
          {STEPS.map((step, index) => (
            <li className="step" key={step.title}>
              <span className="n" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
