// Marcas de estado. Nunca van solas: cada una acompaña un texto que dice lo mismo (el color no es el único aviso).
type MarkProps = { width?: number; height?: number; className?: string };

const join = (...parts: string[]) => parts.filter(Boolean).join(" ");

/** Tilde: algo comprobado en el código o en producción. */
export function TickMark({ width = 21, height = 20, className = "" }: MarkProps) {
  return (
    <svg className={join("mk mk-ok", className)} width={width} height={height} viewBox="0 0 26 24" aria-hidden="true">
      <path d="M2.5 13 C5 15 7.5 18 9 21.5 C12.5 11.5 17.5 5.5 24 2" />
    </svg>
  );
}

/** Cruz: un hallazgo abierto. */
export function CrossMark({ width = 34, height = 34, className = "" }: MarkProps) {
  return (
    <svg className={join("mk mk-bad", className)} width={width} height={height} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5 L19 19 M19 5 L5 19" />
    </svg>
  );
}

/** Círculo punteado: algo que hoy no está disponible. */
export function OpenMark({ width = 20, height = 20, className = "" }: MarkProps) {
  return (
    <svg className={join("mk mk-open", className)} width={width} height={height} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
    </svg>
  );
}
