/*
	This component originally used Framer Motion to animate the modal in and out, like with the Lightbox component.
	However, this caused a lot of jank on mobile, so I switched to a more traditional approach.
	Instead of using Framer Motion, we use a CSS transition to animate the modal in and out.
	This is a lot more performant and doesn't cause the same amount of jank.
*/

import {
	X,
	Play,
	Plus,
	ThumbsUp,
	Share2,
	ExternalLink,
	Github,
	Bookmark,
	ArrowUpRightFromSquare
} from 'lucide-react';
import type { Project } from '../../types/projects';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import Image from '../ui/Image';

interface ProjectViewerModalProps {
	open: boolean;
	project: Project | null;
	relatedProjects?: Project[];
	onClose: () => void;
}

export const ProjectViewerModal = memo(function ProjectViewerModal({
	open,
	project,
	relatedProjects = [],
	onClose
}: ProjectViewerModalProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);
	const [shouldRender, setShouldRender] = useState(open);

	// Memoize filtered related projects
	const displayedRelatedProjects = useMemo(
		() => (project ? relatedProjects.filter((p) => p.id !== project.id).slice(0, 4) : []),
		[relatedProjects, project]
	);

	// Keep rendered during exit animation
	if (open && !shouldRender) {
		setShouldRender(true);
	}

	// Handle enter animation - only when open becomes true
	useEffect(() => {
		if (!open) return;
		const rafId = requestAnimationFrame(() => {
			setVisible(true);
		});
		return () => cancelAnimationFrame(rafId);
	}, [open]);

	// Handle exit animation - only when open becomes false
	useEffect(() => {
		if (open) return;
		queueMicrotask(() => setVisible(false));
		const timeout = setTimeout(() => setShouldRender(false), 150);
		return () => clearTimeout(timeout);
	}, [open]);

	// Only enable focus trap after animation completes
	useFocusTrap(containerRef, visible, { onEscape: onClose });

	if (!shouldRender) return null;

	return (
		<div
			ref={containerRef}
			className={`scrollbar-branded fixed inset-0 z-1000 flex items-start justify-center overflow-y-auto overscroll-none bg-black/95 transition-opacity duration-150 ease-out ${
				visible ? 'opacity-100' : 'opacity-0'
			}`}
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-label={project ? `Project: ${project.title}` : 'Project details'}
		>
			<div
				className="relative my-10 w-full max-w-4xl shrink-0 rounded-lg bg-zinc-900 shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close button */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
					aria-label="Close project details"
				>
					<X className="h-5 w-5" />
				</button>

				{project && (
					<>
						{/* Hero */}
						<div className="relative h-80 overflow-hidden rounded-t-lg sm:h-100">
							<Image
								src={project.image}
								alt={project.title}
								width={1280}
								height={400}
								className="absolute inset-0 h-full w-full object-cover"
								decoding="async"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
							<div className="absolute right-0 bottom-0 left-0 p-6">
								<h1 className="text-3xl font-bold tracking-wide text-white uppercase drop-shadow-md sm:text-4xl">
									{project.title}
								</h1>
								<div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/90">
									<span className="rounded bg-white/20 px-2 py-0.5 text-xs font-medium uppercase">
										{project.project_type}
									</span>
									{project.current_episode && <span>{project.current_episode}</span>}
									{project.progress != null && (
										<span>{Math.round(Number(project.progress) * 100)}% complete</span>
									)}
								</div>
								<div className="mt-4 flex flex-wrap items-center gap-2">
									<a
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 rounded bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-gray-200"
									>
										<Play className="h-4 w-4 fill-current" />
										View live
									</a>
									{project.github_link && (
										<a
											href={project.github_link}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded border border-white/60 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
										>
											<Github className="h-4 w-4" />
											Source
										</a>
									)}
									<button
										type="button"
										className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/10 text-white transition hover:bg-white/20"
										aria-label="Add to list"
									>
										<Plus className="h-5 w-5" />
									</button>
									<button
										type="button"
										className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/10 text-white transition hover:bg-white/20"
										aria-label="Like"
									>
										<ThumbsUp className="h-4 w-4" />
									</button>
									<button
										type="button"
										className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/10 text-white transition hover:bg-white/20"
										aria-label="Share"
									>
										<Share2 className="h-4 w-4" />
									</button>
								</div>
							</div>
						</div>

						{/* Content */}
						<div className="p-6 text-white">
							{/* Tags */}
							{project.tags?.length > 0 && (
								<section className="mb-8">
									<div className="flex flex-wrap gap-2">
										<p className="text-sm text-gray-100">
											Tags: <span className="text-sm text-gray-400">{project.tags.join(', ')}</span>
										</p>
									</div>
								</section>
							)}

							{/* Overview */}
							<section className="mb-8">
								<h2 className="mb-2 text-lg font-semibold">Overview</h2>
								<p className="text-sm leading-relaxed text-gray-300">{project.description}</p>
							</section>

							{/* Technologies */}
							{project.tech_stack?.length > 0 && (
								<section className="mb-8">
									<h2 className="mb-2 text-lg font-semibold">Technologies</h2>
									<div className="flex flex-wrap gap-2">
										{project.tech_stack.map((tech) => (
											<span
												key={tech}
												className="rounded bg-white/10 px-3 py-1 text-sm text-gray-200"
											>
												{tech}
											</span>
										))}
									</div>
								</section>
							)}

							{/* Key features */}
							{project.key_features?.length > 0 && (
								<section className="mb-8">
									<h2 className="mb-2 text-lg font-semibold">Key features</h2>
									<ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
										{project.key_features.map((feature) => (
											<li key={feature}>{feature}</li>
										))}
									</ul>
								</section>
							)}

							{/* Links */}
							<section className="mb-8">
								<h2 className="mb-2 text-lg font-semibold">Links</h2>
								<div className="flex flex-wrap gap-3">
									<a
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
										className="text-brand inline-flex items-center gap-2 text-sm hover:underline"
									>
										<ExternalLink className="h-4 w-4" />
										Live site
									</a>
									<span className="inline-flex items-center gap-2 text-sm text-gray-500">
										<Bookmark className="h-4 w-4" />
										Documentation{' '}
										{project.github_link ? (
											<a href={project.github_link} target="_blank" rel="noopener noreferrer">
												<ArrowUpRightFromSquare className="h-4 w-4" />
											</a>
										) : (
											'(proprietary...sorry)'
										)}
									</span>
								</div>
							</section>

							{/* Related projects */}
							{displayedRelatedProjects.length > 0 && (
								<section className="mb-8">
									<h2 className="mb-3 text-lg font-semibold">More in this category</h2>
									<div className="scrollbar-branded flex gap-4 overflow-x-auto pb-2">
										{displayedRelatedProjects.map((p) => (
											<a
												key={p.id}
												href={p.link}
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-40 shrink-0 flex-col overflow-hidden rounded-lg bg-zinc-800 transition hover:ring-2 hover:ring-white/40"
											>
												<img
													src={p.image}
													alt={p.title}
													width={320}
													height={180}
													className="aspect-video w-full object-cover"
													loading="lazy"
													decoding="async"
												/>
												<p className="truncate p-2 text-sm font-medium text-white">{p.title}</p>
											</a>
										))}
									</div>
								</section>
							)}

							{/* About */}
							<section>
								<h2 className="mb-2 text-lg font-semibold">About Brian</h2>
								<p className="text-sm leading-relaxed text-gray-300">
									Brian is a senior software engineer with a passion for building products that help
									people live better lives. With 7+ years of experience in the industry, he has
									built products for startups and enterprises alike, with expertise in building
									scalable and efficient systems. React is his strong suit, but he is also
									proficient in other technologies such as Python, and PostgreSQL.
								</p>
							</section>
						</div>
					</>
				)}
			</div>
		</div>
	);
});
