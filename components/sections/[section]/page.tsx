// app/section/[section]/page.tsx
import Link from "next/link";

type Params = { section: string };
type Props = { params: Promise<Params> };

export default async function SectionPage({ params }: Props) {
  const { section } = await params;

  return (
    <main className="flex flex-col items-center justify-center h-dvh text-white p-6">
      <h1 className="text-4xl font-bold mb-4 capitalize">
        {section.replace("-", " ")}
      </h1>

      <p className="text-center max-w-xl mb-8">
        Esta es la sección de {section}. Aquí podrás agregar contenido específico más adelante.
      </p>

      <Link
        href="/"
        className="bg-gradient-to-r from-purple-500 to-cyan-500 py-2 px-4 rounded-lg text-white text-center hover:opacity-90 transition"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
