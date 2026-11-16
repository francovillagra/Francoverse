import projects, { type Project, type ProjectVideo } from "@/data/projects";
import { codeAccessMailto } from "@/lib/contact";
import { OpenMark, TickMark } from "./Marks";

/**
 * Grabación de la demo. No arranca sola ni descarga nada hasta que se la reproduce (`preload="none"`): al cargar la
 * página solo se baja la portada. El video no tiene audio, así que el texto de abajo es su alternativa y también lo lee
 * el lector de pantalla (`aria-describedby`).
 */
function DemoVideo({ id, title, video }: { id: string; title: string; video: ProjectVideo }) {
  return (
    <figure className="demo">
      <video
        controls
        playsInline
        preload="none"
        poster={video.poster}
        width={video.width}
        height={video.height}
        aria-label={`Demo en video de ${title}`}
        aria-describedby={`${id}-texto`}
      >
        <source src={video.src} type="video/mp4" />
        Este navegador no puede reproducir el video. <a href={video.src}>Descargar la grabación (MP4)</a>.
      </video>
      <figcaption id={`${id}-texto`}>
        <strong>Demo en video, {video.duration}.</strong> {video.description}
      </figcaption>
    </figure>
  );
}

function ProjectRow({ project, as: Title }: { project: Project; as: "h2" | "h3" }) {
  const { id, title, summary, technologies, proofs = [], demo, liveUrl, video } = project;

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
        {video && <DemoVideo id={`demo-${id}`} title={title} video={video} />}
        <div className="acts">
          {demo === "live" && liveUrl && (
            <a className="btn" href={liveUrl} target="_blank" rel="noopener noreferrer">
              Ver demo en vivo
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
  // La marca «no disponible» solo se explica si alguna fila la muestra (hoy ninguna: las demos detenidas tienen grabación).
  const showsPaused = projects.some((project) => project.demo === "paused");
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
          {showsPaused && (
            <span>
              <OpenMark />
              No disponible por ahora
            </span>
          )}
        </p>
      </div>
    </section>
  );
}
