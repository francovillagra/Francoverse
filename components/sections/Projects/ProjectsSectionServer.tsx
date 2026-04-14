import ProjectsSection from "./ProjectsSection";
import type { Project } from "./ProjectCard";
import { getGitHubProjects, type GitHubRepo } from "@/lib/github";

function getImageForRepo(repoName: string) {
  const images: Record<string, string> = {
    Francoverse: "/projects/openb.jpg",
    ChallengeTelecomX: "/projects/telecom.jpg",
    SomosEquipo: "/projects/trabajoenequipo.jpg",
  };

  return images[repoName] || "/projects/placeholder.jpg";
}

function getTechStack(repo: GitHubRepo) {
  const topicMap: Record<string, string[]> = {
    Francoverse: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    ChallengeTelecomX: ["Python", "Pandas", "Matplotlib", "Jupyter"],
    SomosEquipo: ["FastAPI", "Python", "REST", "JSON"],
  };

  if (topicMap[repo.name]) {
    return topicMap[repo.name];
  }

  return repo.language ? [repo.language] : ["Repositorio"];
}

function mapRepoToProject(repo: GitHubRepo): Project {
  return {
    title: repo.name,
    description: repo.description || "Proyecto sin descripción publicada todavía.",
    imageUrl: getImageForRepo(repo.name),
    techStack: getTechStack(repo),
    demoUrl: repo.homepage || "",
    repoUrl: repo.html_url,
  };
}

export default async function ProjectsSectionServer() {
  const repos = await getGitHubProjects();
  const projects = repos.map(mapRepoToProject);

  return <ProjectsSection projects={projects} />;
}