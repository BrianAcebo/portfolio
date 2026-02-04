import { STAGGER_DELAY_MS } from '../../constants';
import type { Project } from '../../types/projects';
import ProjectCard from './ProjectCard';

interface ProjectsGridProps {
	title?: string;
	projects?: Project[];
	loading?: boolean;
}

export default function ProjectsGrid({ title, projects, loading = false }: ProjectsGridProps) {
	if (loading || !projects?.length) {
		return (
			<div>
				<div className="mb-5 h-10 w-60 animate-pulse bg-black/70"></div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
					{Array.from({ length: 4 }).map((_, index) => (
						<div
							key={index}
							className="animate-fade-in-up opacity-0"
							style={{ animationDelay: `${index * STAGGER_DELAY_MS}ms` }}
						>
							<div className="flex aspect-square w-full animate-pulse items-end rounded-lg bg-black/70 p-3">
								<div className="bg-bg h-5 w-30 animate-pulse"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

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
