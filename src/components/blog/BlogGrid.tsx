import type { BlogPost } from '../../types/blog';
import BlogCard from './BlogCard';

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
	return (
		<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{posts.map((post, index) => (
				<BlogCard key={post.id} post={post} index={index} />
			))}
		</div>
	);
}
