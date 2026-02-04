import { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import type { Project } from '../../types/projects';
import { cn } from '../../utils/common';
import { useProjects } from '../../hooks/useProjects';
import { STAGGER_DELAY_MS } from '../../constants';

interface ProjectCardProps {
	project: Project;
	index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
	const { setSelectedProject } = useProjects();
	const [isHovered, setIsHovered] = useState(false);

	// Animate the card with a stagger effect based on the index position
	const style = {
		animationDelay: `${index * STAGGER_DELAY_MS}ms`
	};

	return (
		<div
			className="group animate-fade-in-up relative shrink-0 cursor-pointer opacity-0 transition-transform duration-300 ease-out"
			style={style}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => setSelectedProject(project)}
			onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
			role="button"
			tabIndex={0}
			aria-label={`View details for ${project.title}`}
		>
			<div
				className={cn(
					'relative aspect-square w-full overflow-hidden rounded-lg bg-black shadow-xl transition-all duration-300 ease-out',
					isHovered ? 'z-20 scale-110' : 'z-0 scale-100'
				)}
			>
				{/* Poster image */}
				<img
					src={project.image}
					alt={project.title}
					className="absolute inset-0 h-full w-full object-cover"
				/>

				{/* Dark gradient at bottom for title readability */}
				<div
					className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300"
					aria-hidden
				/>

				{/* Title overlay (always visible at bottom of image) */}
				<div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3 pb-4">
					<div>
						<p className="truncate text-lg font-bold tracking-wide text-white uppercase drop-shadow-sm">
							{project.title}
						</p>
						{project.featured && (
							<span className="bg-brand mt-1.5 inline-block rounded px-2 py-0.5 text-xs font-bold text-white">
								Featured
							</span>
						)}
					</div>
					<div>
						<p className="text-xs text-white/70 uppercase">{project.project_type}</p>
					</div>
				</div>

				{/* TOP 10 badge (top-right) */}
				{project.featured && (
					<div className="bg-brand absolute top-0 right-0 flex flex-col items-center px-2 py-1 text-[10px] leading-tight font-bold text-white shadow-lg">
						<span>TOP</span>
						<span>10</span>
					</div>
				)}

				{/* Hover panel: controls + episode info + progress */}
				<div
					className={`absolute inset-x-0 bottom-0 bg-black/95 px-3 pt-6 pb-3 transition-all duration-300 ease-out ${
						isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
					}`}
				>
					{/* Action buttons */}
					<div className="flex items-center gap-2">
						<button
							type="button"
							className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white/80 bg-white text-black transition hover:scale-105 hover:border-white"
							aria-label="Play"
						>
							<Play className="h-5 w-5 fill-current pl-0.5" />
						</button>
						<button
							type="button"
							className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/60 bg-transparent text-white transition hover:scale-105 hover:border-white"
							aria-label="Add to list"
						>
							<Plus className="h-5 w-5" />
						</button>
						<button
							type="button"
							className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/60 bg-transparent text-white transition hover:scale-105 hover:border-white"
							aria-label="Like"
						>
							<ThumbsUp className="h-4 w-4" />
						</button>
						<button
							type="button"
							className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/60 bg-transparent text-white transition hover:scale-105 hover:border-white"
							aria-label="More info"
						>
							<ChevronDown className="h-5 w-5" />
						</button>
					</div>

					{/* Episode / project info */}
					{project.current_episode && (
						<p className="mt-2 truncate text-sm text-white/90">
							{project.current_episode} &quot;{project.title}&quot;
						</p>
					)}

					{/* Progress bar (only if progress is provided) */}
					{project.progress && (
						<div className="mt-2 flex items-center gap-2">
							<div className="h-1 flex-1 rounded-full bg-white/30">
								<div
									className="bg-brand h-full rounded-full transition-all duration-300"
									style={{ width: `${Math.min(100, Number(project.progress) * 100)}%` }}
								/>
							</div>
							<span className="text-xs text-white/80">
								{Math.round(Number(project.progress) * 100)}%
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
