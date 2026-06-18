import type { GitHubRepo } from "@/lib/github";
import { projectMetadata } from "@/lib/project-metadata";
import type { Project } from "@/data/projects";

function fallbackTechnologies(repo: GitHubRepo) {
  return repo.language ? [repo.language] : ["Repositorio"];
}

export function mapRepoToProject(repo: GitHubRepo): Project {
  const meta = projectMetadata[repo.name];

  return {
    id: repo.name,
    title: meta?.displayTitle || repo.name,
    description:
      meta?.description ||
      repo.description ||
      "Proyecto sin descripción publicada todavía.",
    image: meta?.imageUrl || "/projects/placeholder.jpg",
    featured: false,
    completedAt: '',
    technologies: meta?.techStack || fallbackTechnologies(repo),
    liveUrl: repo.homepage || undefined,
    githubUrl: repo.html_url,
  };
}

export function getUniqueTechnologies(projects: Project[]) {
  return [...new Set(projects.flatMap((project) => project.technologies))].sort();
}
