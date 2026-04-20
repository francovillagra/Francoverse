import ProjectsSection from "./ProjectsSection";
import { getGitHubProjects } from "@/lib/github";
import { mapRepoToProject } from "@/lib/projects";
import { projectMetadata } from "@/lib/project-metadata";

type ProjectsSectionServerProps = {
  limit?: number;
  featuredOnly?: boolean;
  showViewAll?: boolean;
};

export default async function ProjectsSectionServer({
  limit,
  featuredOnly = false,
  showViewAll = false,
}: ProjectsSectionServerProps) {
  const repos = await getGitHubProjects();

  const filteredRepos = featuredOnly
    ? repos.filter((repo) => projectMetadata[repo.name]?.featured)
    : repos;

  const projects = filteredRepos.map(mapRepoToProject);

  return (
    <ProjectsSection
      projects={projects}
      limit={limit}
      showViewAll={showViewAll}
    />
  );
}