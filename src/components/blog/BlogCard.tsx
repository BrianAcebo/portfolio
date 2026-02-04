import type { BlogPost } from '../../types/blog';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { STAGGER_DELAY_MS } from '../../constants';

interface BlogCardProps {
	post: BlogPost;
	index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
	// Animate the card with a stagger effect based on the index position
	const style = {
		animationDelay: `${index * STAGGER_DELAY_MS}ms`
	};

	return (
		<Link
			to={`/blog/${post.slug}`}
			className="group hover:border-brand/50 hover:shadow-brand/10 animate-fade-in-up relative block overflow-hidden border border-white/10 bg-white/5 opacity-0 shadow-xl transition-all duration-300 hover:bg-white/10 hover:shadow-2xl"
			style={style}
		>
			<div className="relative aspect-16/10 overflow-hidden">
				<img
					src={post.image}
					alt={post.title}
					width={640}
					height={400}
					className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					loading="lazy"
					decoding="async"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
				<div className="absolute right-0 bottom-0 left-0 p-4">
					<div className="flex flex-wrap items-center gap-2 text-xs text-white/80">
						<span className="flex items-center gap-1">
							<Clock className="h-3.5 w-3.5" />
							{post.reading_time_minutes} min read
						</span>
						<span>{formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}</span>
					</div>
					<h2 className="group-hover:text-brand mt-1 line-clamp-2 text-lg font-bold tracking-wide text-white uppercase drop-shadow-md transition-colors">
						{post.title}
					</h2>
				</div>
				{post.featured && (
					<span className="bg-brand/90 absolute top-3 right-3 flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold text-white">
						<Sparkles className="h-3 w-3" />
						Featured
					</span>
				)}
			</div>
			<div className="p-4">
				<p className="line-clamp-2 text-sm leading-relaxed text-gray-400">{post.excerpt}</p>
				<div className="mt-3 flex flex-wrap gap-2">
					{post.tags.slice(0, 3).map((tag) => (
						<span key={tag} className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-gray-300">
							{tag}
						</span>
					))}
				</div>
				<span className="text-brand mt-3 inline-flex items-center gap-1 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
					Read article
					<ArrowRight className="h-3.5 w-3.5" />
				</span>
			</div>
		</Link>
	);
}
