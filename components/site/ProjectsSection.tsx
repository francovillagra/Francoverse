import projects, { type Project } from "@/data/projects";
import { codeAccessMailto } from "@/lib/contact";
import { OpenMark, TickMark } from "./Marks";

function ProjectRow({ project, as: Title }: { project: Project; as: "h2" | "h3" }) {
  const { title, summary, technologies, proofs = [], demo, liveUrl } = project;

  return (
    <article className="row">
      <div className="row-name">
        <Title>{title}</Title>
        <p className="stack">{technologies.join(", ")}</p>
      </div>
      <div className="row-body">
        <p>{summary}</p>
        <ul className="proofs" role="list">
          {proofs.map((proof) => (
            <li key={proof}>
              <TickMark />
              <span className="sr">Comprobado: </span>
              {proof}
            </li>
          ))}
          {demo === "live" && (
            <li>
              <TickMark />
              <span className="sr">Comprobado: </span>Demo en línea
            </li>
          )}
          {demo === "paused" && (
            <li>
              <OpenMark />
              <span className="sr">No disponible: </span>Demo en pausa: la base de datos de la demo está detenida
            </li>
          )}
        </ul>
        <div className="acts">
          {demo === "live" && liveUrl && (
            <a className="btn" href={liveUrl} target="_blank" rel="noopener noreferrer">
              Ver demo
              <span className="sr"> (se abre en una pestaña nueva)</span>
            </a>
          )}
          <a className="lnk" href={codeAccessMailto(title)}>
            Pedir acceso al código
          </a>
        </div>
      </div>
    </article>
  );
}

/** Los proyectos, uno por fila, cada uno con lo que hoy se puede comprobar. */
export default function ProjectsSection({ headingAs: Heading = "h2" }: { headingAs?: "h1" | "h2" }) {
  return (
    <section className="sec" id="proyectos" aria-labelledby="t-proyectos">
      <div className="wrap">
        <Heading className="h2" id="t-proyectos">
          Proyectos
        </Heading>
        <p className="pr-lead">Cada afirmación lleva su comprobación. El código se comparte a pedido, bajo NDA.</p>
        <div className="rows">
          {/* Los títulos de cada proyecto bajan un nivel respecto del de la sección (h1 → h2, h2 → h3). */}
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} as={Heading === "h1" ? "h2" : "h3"} />
          ))}
        </div>
        <p className="legend">
          <span>
            <TickMark />
            Comprobado en el código o en producción
          </span>
          <span>
            <OpenMark />
            No disponible por ahora
          </span>
        </p>
      </div>
    </section>
  );
}
