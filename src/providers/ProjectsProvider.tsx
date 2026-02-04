import { useEffect, useMemo, useState } from 'react';
import { ProjectsContext } from '../contexts/ProjectsContext';
import { api } from '../utils/api';
import type { Project } from '../types/projects';
import { getRelatedProjects } from '../utils/projects';

export default function ProjectsProvider({ children }: { children: React.ReactNode }) {
	const [projects, setProjects] = useState<Project[]>([]);
	const [projectsLoading, setProjectsLoading] = useState(false);
	const [featuredProject, setFeaturedProject] = useState<Project | null>(null);
	const [featuredProjectLoading, setFeaturedProjectLoading] = useState(false);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	const featuredProjectId = 1;

	const relatedProjects = useMemo(
		() => getRelatedProjects(projects, selectedProject, 4),
		[projects, selectedProject]
	);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				setProjectsLoading(true);
				const response = await api.get('/api/projects');
				if (!response.ok) {
					throw new Error('Failed to fetch projects');
				}
				const data = await response.json();
				setProjects(data);
			} catch (error) {
				console.error(error);
			} finally {
				setProjectsLoading(false);
			}
		};
		fetchProjects();
	}, []);

	useEffect(() => {
		const fetchFeaturedProject = async () => {
			try {
				const response = await api.get(`/api/project/${featuredProjectId}`);
				if (!response.ok) {
					throw new Error('Failed to fetch featured project');
				}
				const data = await response.json();
				setFeaturedProject(data);
			} catch (error) {
				console.error(error);
			} finally {
				setFeaturedProjectLoading(false);
			}
		};
		fetchFeaturedProject();
	}, [projects]);

	const value = useMemo(
		() => ({
			projects,
			projectsLoading,
			featuredProject,
			featuredProjectLoading,
			selectedProject,
			setSelectedProject,
			relatedProjects
		}),
		[
			projects,
			projectsLoading,
			featuredProject,
			featuredProjectLoading,
			selectedProject,
			setSelectedProject,
			relatedProjects
		]
	);

	return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}
