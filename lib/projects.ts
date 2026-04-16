import type { GitHubRepo } from "@/lib/github";
import { projectMetadata } from "@/lib/project-metadata";
import type { Project } from "@/components/sections/Projects/ProjectCard";

function fallbackTechStack(repo: GitHubRepo) {
  return repo.language ? [repo.language] : ["Repositorio"];
}

export function mapRepoToProject(repo: GitHubRepo): Project {
  const meta = projectMetadata[repo.name];

  return {
    title: meta?.displayTitle || repo.name,
    description: repo.description || "Proyecto sin descripción publicada todavía.",
    imageUrl: meta?.imageUrl || "/projects/placeholder.jpg",
    techStack: meta?.techStack || fallbackTechStack(repo),
    demoUrl: repo.homepage || "",
    repoUrl: repo.html_url,
  };
}

export function getUniqueTechnologies(projects: Project[]) {
  return [...new Set(projects.flatMap((project) => project.techStack))].sort();
}