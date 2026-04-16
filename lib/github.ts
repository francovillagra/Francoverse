export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics?: string[];
  language: string | null;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "francovillagra";

export async function getGitHubProjects(): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`Error al obtener repositorios de GitHub: ${response.status}`);
  }

  const repos = (await response.json()) as GitHubRepo[];

  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    );
}