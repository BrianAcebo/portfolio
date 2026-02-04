import { useParams, Link } from 'react-router-dom';
import { useBlogPost } from '../hooks/useBlogPost';
import ReactMarkdown from 'react-markdown';
import PageMeta from '../components/common/PageMeta';
import { format } from 'date-fns';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { useMemo } from 'react';
import { useBlog } from '../hooks/useBlog';
import BlogGrid from '../components/blog/BlogGrid';
import NotFound from '../components/error/NotFound';

export default function BlogPost() {
	const { slug } = useParams<{ slug: string }>();
	const { post, loading } = useBlogPost(slug);
	const { posts } = useBlog();

	// TODO: Handle this in the backend
	const relatedPosts = useMemo(() => {
		return posts
			.filter(
				(p) =>
					(p.id !== post?.id && p.tags.some((t) => post?.tags.includes(t))) ||
					p.category_id === post?.category_id
			)
			.slice(0, 3);
	}, [posts, post]);

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="border-brand h-12 w-12 animate-spin rounded-full border-2 border-t-transparent" />
			</div>
		);
	}

	if (!post) {
		return <NotFound />;
	}

	return (
		<>
			<PageMeta title={post.title} description={post.excerpt} />
			<article className="min-h-screen">
				{/* Hero */}
				<header className="relative flex h-[50vh] min-h-[320px] items-end justify-start overflow-hidden">
					<img
						src={post.image}
						alt=""
						className="absolute inset-0 h-full w-full object-cover opacity-90"
					/>
					<div className="from-bg via-bg/80 absolute inset-0 bg-linear-to-t to-transparent" />
					<div className="max-w-laptop inset-0 mx-auto mt-auto mb-0 flex w-full flex-col justify-end p-5 md:px-8 md:py-10 xl:px-12">
						<Link
							to="/blog"
							className="hover:text-brand animate-fade-in-up mb-6 inline-flex w-fit items-center gap-2 text-sm text-white/80 opacity-0 transition"
						>
							<ArrowLeft className="h-4 w-4" />
							Back to blog
						</Link>
						<h1 className="animate-fade-in-up animate-stagger-2 max-w-4xl text-3xl font-bold tracking-tight text-white uppercase opacity-0 drop-shadow-lg md:text-4xl lg:text-5xl">
							{post.title}
						</h1>
						<div className="animate-fade-in-up animate-stagger-3 mt-4 flex flex-wrap items-center gap-6 text-sm text-white/80 opacity-0">
							<span className="flex items-center gap-2">
								<User className="h-4 w-4" />
								{post.author}
							</span>
							<span>{format(new Date(post.published_at), 'MMMM d, yyyy')}</span>
							<span className="flex items-center gap-2">
								<Clock className="h-4 w-4" />
								{post.reading_time_minutes} min read
							</span>
						</div>
					</div>
				</header>

				{/* Content */}
				<div className="mx-auto max-w-4xl px-5 py-12">
					{/* Tags */}
					<div className="animate-fade-in-up animate-stagger-4 mb-10 flex flex-wrap gap-2 opacity-0">
						{post.tags.map((tag) => (
							<span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-300">
								{tag}
							</span>
						))}
					</div>

					{/* Body (markdown) */}
					<div className="prose prose-invert prose-lg animate-fade-in-up animate-stagger-5 [&_a]:text-brand max-w-none opacity-0 [&_a]:no-underline hover:[&_a]:underline [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:leading-relaxed [&_p]:text-gray-300 [&_pre]:rounded-lg [&_pre]:bg-white/10 [&_pre]:p-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-gray-300">
						<ReactMarkdown>{post.body}</ReactMarkdown>
					</div>

					{/* Author card */}
					<div className="animate-fade-in-up animate-stagger-6 mt-16 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 opacity-0">
						{post.author_avatar && (
							<img
								src={post.author_avatar}
								alt={post.author}
								className="h-14 w-14 rounded-full object-cover ring-2 ring-white/20"
							/>
						)}
						<div>
							<p className="font-semibold text-white">{post.author}</p>
							<p className="text-sm text-gray-400">Author</p>
						</div>
					</div>

					<Link
						to="/blog"
						className="text-brand animate-fade-in-up animate-stagger-7 mt-10 inline-flex items-center gap-2 opacity-0 transition hover:underline"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to all posts
					</Link>
				</div>
			</article>

			{/* Related posts */}
			{relatedPosts.length > 0 && (
				<div className="mx-auto max-w-3xl px-6 py-12 md:px-10">
					<h2 className="text-muted mb-5 text-3xl font-bold">Related posts</h2>
					<BlogGrid posts={relatedPosts} />
				</div>
			)}
		</>
	);
}
