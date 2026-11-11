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

/** Enlace de correo para pedir el informe de muestra de la revisión de seguridad. */
export function sampleReportMailto(): string {
  const subject = "Informe de muestra";
  const body = [
    "Hola Franco, quiero ver el informe de muestra de la revisión de seguridad.",
    "",
    "Sitio o aplicación que tengo en mente (opcional):",
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Enlace de correo para pedir acceso al código de un proyecto: se comparte a pedido, bajo NDA. */
export function codeAccessMailto(projectTitle: string): string {
  const subject = `Acceso al código: ${projectTitle}`;
  const body = [
    `Hola Franco, quiero pedir acceso al código de ${projectTitle}.`,
    "",
    "Quién soy y para qué quiero verlo:",
    "Empresa o equipo:",
    "Si hace falta un NDA, lo firmo antes de recibir el acceso.",
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
