export interface Project {
	id: number;
	title: string;
	overview: string;
	description: string;
	image: string;
	category_id: number;
	link: string;
	github_link: string;
	project_type: string;
	featured: boolean;
	progress: number;
	tags: string[];
	current_episode: string;
	tech_stack: string[];
	key_features: string[];
}

export interface Category {
	id: number;
	name: string;
	projects: Project[];
}

export interface ProjectsContextType {
	projects: Project[];
	projectsLoading: boolean;
	featuredProject: Project | null;
	featuredProjectLoading: boolean;
	selectedProject: Project | null;
	setSelectedProject: (project: Project | null) => void;
	relatedProjects: Project[];
}
