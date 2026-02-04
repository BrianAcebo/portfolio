import { Fragment, useEffect } from 'react';
import { useSearch } from '../hooks/useSearch';
import { useSearchParams, Link } from 'react-router-dom';
import PageMeta from '../components/common/PageMeta';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/projects/ProjectCard';
import { useState } from 'react';

export default function Search() {
	const { search, setSearch, searchResults, handleSearch, setSearchResults } = useSearch();
	const { projects } = useProjects();
	const [searchParams] = useSearchParams();
	const query = searchParams.get('query') ?? '';
	const [tags, setTags] = useState<string[]>([]);

	useEffect(() => {
		const tags = new Set<string>();
		searchResults
			.flatMap((result) => result.tags)
			.forEach((tag) => {
				if (!tags.has(tag)) {
					tags.add(tag);
				}
			});
		queueMicrotask(() => setTags(Array.from(tags)));
	}, [searchResults]);

	useEffect(() => {
		setSearch(query);

		if (!query) {
			setSearchResults(structuredClone(projects));
			return;
		}

		handleSearch(query);
	}, [query, setSearch, setSearchResults, handleSearch, projects]);

	return (
		<>
			<PageMeta title="Search" description={query ? `Search results for "${query}"` : 'Search'} />
			<div className="max-w-laptop mx-auto mt-30 px-5 sm:mx-auto md:px-8 xl:px-12">
				{query && tags.length > 0 && (
					<div className="mb-6 flex flex-col items-start gap-2 sm:flex-row">
						<p className="text-gray-400">More to explore:</p>
						<div className="flex flex-wrap items-center gap-3">
							{tags.map((tag, i) => (
								<Fragment key={tag}>
									<Link
										to={`/search?query=${encodeURIComponent(tag)}`}
										className="hover:text-brand text-sm text-gray-300 transition sm:text-base"
									>
										{tag}
									</Link>
									{i !== tags.length - 1 && <div className="h-5 w-px bg-gray-100" />}
								</Fragment>
							))}
						</div>
					</div>
				)}
				{searchResults.length > 0 ? (
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
						{searchResults.map((project, index) => (
							<ProjectCard key={project.title} project={project} index={index} />
						))}
					</div>
				) : (
					<div className="text-center text-gray-400">No results found for "{search}"</div>
				)}
			</div>
		</>
	);
}
