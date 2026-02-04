import { createContext } from 'react';
import type { ProjectsContextType } from '../types/projects';

export const ProjectsContext = createContext<ProjectsContextType>({
	projects: [],
	projectsLoading: false,
	featuredProject: null,
	featuredProjectLoading: false,
	selectedProject: null,
	setSelectedProject: () => {},
	relatedProjects: []
});
