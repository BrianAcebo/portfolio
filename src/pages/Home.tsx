import { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { Info, Play } from 'lucide-react';
import { Lightbox } from '../components/common/Lightbox';
import { VideoWithCustomControls } from '../components/common/VideoWithCustomControls';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import { useCategories } from '../hooks/useCategories';
import Image from '../components/ui/Image';

export default function Home() {
	const { featuredProject, featuredProjectLoading } = useProjects();
	const { categories, categoriesLoading } = useCategories();
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const { setSelectedProject } = useProjects();

	return (
		<div>
			{featuredProjectLoading ? (
				<div
					className="relative h-[90svh] w-full animate-pulse bg-gray-700"
					aria-busy="true"
					aria-live="polite"
				/>
			) : featuredProject ? (
				<>
					<div className="relative flex h-[90svh] w-full items-center justify-center">
						<Image
							src={featuredProject.image}
							alt={featuredProject.title}
							width={1920}
							height={1080}
							className="absolute inset-0 z-0 h-full w-full object-cover object-center"
							loading="eager"
							fetchPriority="high"
							decoding="async"
						/>
						<div className="absolute inset-0 z-0 block h-full w-full bg-linear-to-t from-black via-black/50 to-transparent md:hidden"></div>
						<div className="animate-fade-in-up max-w-laptop mx-auto -mt-15 w-full px-5 opacity-0 md:-mt-5 md:px-8 xl:px-12">
							<span className="text-brand mb-2 block text-xl font-bold tracking-wider uppercase sm:text-2xl md:text-3xl">
								Featured
							</span>
							<div className="space-y-4">
								<h1 className="-ml-1 text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
									{featuredProject.title}
								</h1>
								<div className="flex items-center gap-3">
									<div className="bg-brand w-10 rounded-sm p-1 text-center">
										<p className="text-xs leading-3 font-bold text-white">TOP 10</p>
									</div>
									<p className="text-base font-bold text-white sm:text-xl">#1 in Projects Today</p>
								</div>
								<p className="max-w-lg text-sm text-white sm:text-base">
									{featuredProject.overview}
								</p>
								<div className="flex items-center gap-3">
									<button
										type="button"
										onClick={() => setIsLightboxOpen(true)}
										className="inline-flex items-center gap-2 rounded-sm bg-gray-100 px-4 py-2 text-black"
										aria-label="Play intro video"
									>
										<Play className="size-4 fill-current" />
										<span className="text-sm font-bold sm:text-base">Play</span>
									</button>
									<button
										type="button"
										onClick={() => setSelectedProject(featuredProject)}
										className="inline-flex items-center gap-2 rounded-sm bg-gray-600 px-4 py-2 text-white"
										aria-label="More info about featured project"
									>
										<Info className="size-5" />
										<span className="text-sm font-bold sm:text-base">More Info</span>
									</button>
								</div>
							</div>
							<div className="relative mt-10 mr-0 ml-auto w-full max-w-30 border-l-2 border-white bg-gray-600/20 px-4 py-2 sm:max-w-40">
								<span className="text-base text-white sm:text-lg">TV-MA</span>
							</div>
						</div>
						<div className="from-bg via-bg/50 absolute bottom-0 z-40 h-20 w-full bg-linear-to-t to-transparent" />
					</div>
				</>
			) : (
				<div className="relative h-[90svh] w-full bg-gray-900" aria-label="No featured project" />
			)}

			<div className="max-w-laptop relative z-50 mx-auto -mt-30 px-5 md:px-8 xl:px-12">
				{categoriesLoading ? (
					<div className="animate-fade-in flex min-h-[40vh] items-center justify-center opacity-0">
						<div className="border-brand h-12 w-12 animate-spin rounded-full border-2 border-t-transparent" />
					</div>
				) : (
					<div className="space-y-10 sm:space-y-20">
						{categories.map((category) => (
							<ProjectsGrid key={category.id} title={category.name} projects={category.projects} />
						))}
					</div>
				)}
			</div>

			<Lightbox
				open={isLightboxOpen}
				onClose={() => setIsLightboxOpen(false)}
				ariaLabel="Watch intro video"
			>
				<VideoWithCustomControls
					src="/videos/paperboatcrm-intro.mp4"
					className="w-full"
					autoPlay
					playsInline
				/>
			</Lightbox>
		</div>
	);
}
