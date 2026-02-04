import { Outlet } from 'react-router';
import PageMeta from '../components/common/PageMeta';
import AppHeader from '../components/header/AppHeader';
import WhosWatching from '../components/profiles/WhosWatching';
import { useAuth } from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { ProjectViewerModal } from '../components/projects/ProjectViewerModal';
import { useProjects } from '../hooks/useProjects';

export default function AppLayout() {
	const { user, authReady } = useAuth();
	const location = useLocation();
	const { selectedProject, relatedProjects } = useProjects();

	// Single loading state until we know auth — avoids blip of WhosWatching for logged-in users
	if (!authReady) {
		return (
			<div className="flex h-screen w-screen items-center justify-center bg-black">
				<Loader2 className="size-6 animate-spin text-white" />
			</div>
		);
	}

	if (!user && location.pathname === '/') {
		return (
			<>
				<PageMeta title="Who's Watching?" description="Who's Watching?" />
				<WhosWatching />
			</>
		);
	}

	return (
		<>
			<PageMeta title="Home" description="Home page" />
			<AppHeader />
			<main className="min-h-screen-visible pb-20">
				<Outlet />
			</main>
			<ProjectViewerModal
				open={!!selectedProject}
				project={selectedProject}
				relatedProjects={relatedProjects}
			/>
		</>
	);
}
