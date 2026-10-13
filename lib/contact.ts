export const CONTACT_EMAIL = "fvillagra.dev@gmail.com";

export const SCANNER_URL = "https://web-vulnerability-scanner-red.vercel.app";

/** Enlace de correo para pedir una revisión, con el asunto y una guía de qué contar ya escritos. */
export function reviewMailto(): string {
  const subject = "Quiero una revisión de seguridad";
  const body = [
    "Hola Franco, quiero una revisión de seguridad.",
    "",
    "Sitio o aplicación:",
    "Tecnologías (Next.js, Supabase, Vercel, otras):",
    "Qué me preocupa o qué quiero asegurar:",
    "Plazo que tengo en mente:",
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
