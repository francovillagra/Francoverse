type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  topics?: string[];
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
};

export type PortfolioProject = {
  id: number;
  name: string;
  description: string;
  repoUrl: string;
  demoUrl: string | null;
  language: string;
  stars: number;
  updatedAt: string;
  topics: string[];
};

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "francovillagra";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function getGitHubProjects(): Promise<PortfolioProject[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    {
      headers,
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`Error al obtener repositorios de GitHub: ${response.status}`);
  }

  const repos = (await response.json()) as GitHubRepo[];

  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .filter((repo) => repo.topics?.includes("portfolio") || repo.name === "Francoverse")
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    )
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || "Proyecto sin descripción publicada todavía.",
      repoUrl: repo.html_url,
      demoUrl: repo.homepage || null,
      language: repo.language || "No especificado",
      stars: repo.stargazers_count,
      updatedAt: repo.pushed_at,
      topics: repo.topics || [],
    }));
}