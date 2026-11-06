import Link from "next/link";
import { reviewMailto } from "@/lib/contact";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="wrap">
      <div className="nav">
        <Link className="brand" href="/">
          Franco Villagra
        </Link>
        <nav className="nav-links" aria-label="Principal">
          <Link href="/#servicio">Servicio</Link>
          <Link href="/#proyectos">Proyectos</Link>
          <Link href="/#contacto">Contacto</Link>
          <ThemeToggle />
          <a className="pill" href={reviewMailto()}>
            Pedir una revisión
          </a>
        </nav>
      </div>
    </header>
  );
}
