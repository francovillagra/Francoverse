import { CONTACT_EMAIL, reviewMailto } from "@/lib/contact";

export default function ContactSection() {
  return (
    <section className="sec band-dark" id="contacto" aria-labelledby="t-contacto">
      <div className="wrap ct">
        <div className="ct-main">
          <h2 className="h2" id="t-contacto">
            Contacto
          </h2>
          <p>Escríbeme con el nombre de la app y su stack, y te propongo un alcance por escrito.</p>
          <div className="acts">
            <a className="btn" href={reviewMailto()}>
              Pedir una revisión
            </a>
            <a className="lnk" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <div className="ct-links">
          <a href="/cv-franco-villagra.pdf" download="CV-Franco-Villagra.pdf">
            Descargar CV (PDF)
          </a>
          <a href="https://linkedin.com/in/franco-villagra" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/francovillagra" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
