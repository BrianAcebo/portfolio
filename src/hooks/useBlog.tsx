import { useEffect, useState } from 'react';
import type { BlogPost } from '../types/blog';
import { api } from '../utils/api';

export function useBlog() {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setLoading(true);
				const response = await api.get('/api/posts');
				if (!response.ok) throw new Error('Failed to fetch posts');
				const data = await response.json();
				setPosts(Array.isArray(data) ? data : []);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchPosts();
	}, []);

	return { posts, loading };
}
