import type { Project } from '../../types/projects';
import ProjectCard from './ProjectCard';

interface ProjectsGridProps {
	title: string;
	projects: Project[];
}

export default function ProjectsGrid({ title, projects }: ProjectsGridProps) {
	return (
		<div>
			<h2 className="text-muted mb-5 text-xl font-bold sm:text-3xl">{title}</h2>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				{projects.map((project, index) => (
					<ProjectCard key={project.id} project={project} index={index + 1} />
				))}
			</div>
		</div>
	);
}
