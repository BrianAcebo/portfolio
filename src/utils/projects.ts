import type { Project } from '../types/projects';

export const getRelatedProjects = (
	projects: Project[],
	selectedProject: Project | null,
	limit = 4
): Project[] => {
	if (!selectedProject) return [];

	return projects
		.filter((p) => {
			const isRelated =
				p.tags.some((t) => selectedProject.tags.includes(t)) ||
				p.category_id === selectedProject.category_id ||
				p.project_type === selectedProject.project_type;
			return p.id !== selectedProject.id && isRelated;
		})
		.slice(0, limit);
};
