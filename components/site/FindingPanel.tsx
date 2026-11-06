"use client";

import { useEffect, useRef, useState } from "react";
import { CrossMark, TickMark } from "./Marks";

// Pasado este tiempo el ejemplo pasa solo de "Antes" a "Después", una única vez; si la persona toca un botón, deja de hacerlo.
const AUTO_FLIP_MS = 2400;

/** Un hallazgo de ejemplo (datos ficticios), con el antes y el después de corregirlo. */
export default function FindingPanel() {
  const [after, setAfter] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Con "reducir movimiento" el cambio solo ocurre cuando la persona lo pide.
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer.current = setTimeout(() => setAfter(true), AUTO_FLIP_MS);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const show = (value: boolean) => {
    if (timer.current) clearTimeout(timer.current);
    setAfter(value);
  };

  return (
    <>
      <div className={`panel ${after ? "is-after" : "is-before"}`}>
        <div className="panel-top">
          <p>Ejemplo de hallazgo</p>
          <div className="seg" role="group" aria-label="Estado del hallazgo">
            <button type="button" aria-pressed={!after} onClick={() => show(false)}>
              Antes
            </button>
            <button type="button" aria-pressed={after} onClick={() => show(true)}>
              Después
            </button>
          </div>
        </div>
        <div className="panel-body">
          <div className="margin">
            <CrossMark className="only-before" />
            <TickMark width={46} height={43} className="tick only-after" />
          </div>
          <div className="f">
            <h2 className="f-title">Tabla sin RLS: cualquiera puede leer los datos de otros usuarios</h2>
            <p className="f-status only-before">Abierto, gravedad alta</p>
            <p className="f-status only-after">Corregido y verificado</p>

            <div className="only-before">
              <p className="f-label">Qué pasa</p>
              <p className="f-text">
                La tabla profiles no tiene RLS activo. Con la clave pública de la app, cualquiera puede pedir todas sus filas.
              </p>
              <p className="f-label">Evidencia</p>
              <pre className="code">{`GET /rest/v1/profiles?select=id,email
apikey: <clave pública>

200 OK
[
  { "id": "7f3a…", "email": "`}<span className="bad">ana@ejemplo.com</span>{`" },
  { "id": "c91b…", "email": "`}<span className="bad">luis@ejemplo.com</span>{`" },
  { "id": "2d08…", "email": "`}<span className="bad">marta@ejemplo.com</span>{`" }
]`}</pre>
              <p className="f-label">Corrección recomendada</p>
              <p className="f-text">Activar RLS en la tabla y crear una política para que cada usuario lea solo su fila.</p>
            </div>

            <div className="only-after">
              <p className="f-label">Corrección aplicada</p>
              <pre className="code">{`alter table public.profiles
  enable row level security;

create policy "cada usuario ve su fila"
  on public.profiles for select
  using (auth.uid() = id);`}</pre>
              <p className="f-label">Verificación</p>
              <p className="f-text">Mismo pedido, sin sesión: ya no devuelve filas ajenas.</p>
              <pre className="code">{`GET /rest/v1/profiles?select=id,email
apikey: <clave pública>

200 OK
[]`}</pre>
            </div>
          </div>
        </div>
      </div>
      <p className="panel-foot">Ejemplo con datos ficticios, basado en un tipo de hallazgo de mi informe de muestra.</p>
    </>
  );
}
