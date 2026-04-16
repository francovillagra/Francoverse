import ProjectsSection from "./ProjectsSection";
import type { Project } from "./ProjectCard";
import { getGitHubProjects, type GitHubRepo } from "@/lib/github";
import { projectMetadata } from "@/lib/project-metadata";

function fallbackTechStack(repo: GitHubRepo) {
  return repo.language ? [repo.language] : ["Repositorio"];
}

function mapRepoToProject(repo: GitHubRepo): Project {
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

export default async function ProjectsSectionServer() {
  const repos = await getGitHubProjects();
  const projects = repos.map(mapRepoToProject);

  return <ProjectsSection projects={projects} />;
}