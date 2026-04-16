import ProjectsSection from "./ProjectsSection";
import { getGitHubProjects } from "@/lib/github";
import { mapRepoToProject } from "@/lib/projects";

export default async function ProjectsSectionServer() {
  const repos = await getGitHubProjects();
  const projects = repos.map(mapRepoToProject);

  return <ProjectsSection projects={projects} />;
}