import SkillsSection from "./SkillsSection";
import { getGitHubProjects } from "@/lib/github";
import { mapRepoToProject } from "@/lib/projects";

export default async function SkillsSectionServer() {
  const repos = await getGitHubProjects();
  const projects = repos.map(mapRepoToProject);

  return <SkillsSection projects={projects} />;
}