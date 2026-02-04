import { useBlog } from '../hooks/useBlog';
import PageMeta from '../components/common/PageMeta';
import BlogGrid from '../components/blog/BlogGrid';

export default function Blog() {
	const { posts, loading } = useBlog();

	return (
		<>
			<PageMeta title="Blog" description="Thoughts on AI, frontend, and building products." />
			<div className="max-w-laptop mx-auto mt-30 px-5">
				{/* Hero */}
				<header className="animate-fade-in-up mb-16 opacity-0">
					<h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
						Blog
					</h1>
					<p className="mt-4 max-w-2xl text-lg text-gray-400">
						Thoughts on AI voice, React, OSINT, and building products that ship.
					</p>
				</header>

				{loading ? (
					<div className="animate-fade-in flex min-h-[40vh] items-center justify-center opacity-0">
						<div className="border-brand h-12 w-12 animate-spin rounded-full border-2 border-t-transparent" />
					</div>
				) : (
					<BlogGrid posts={posts} />
				)}
			</div>
		</>
	);
}
