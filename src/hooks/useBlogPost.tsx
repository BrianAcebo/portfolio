import { useEffect, useState } from 'react';
import type { BlogPost } from '../types/blog';
import { api } from '../utils/api';

export function useBlogPost(slug: string | undefined) {
	const [post, setPost] = useState<BlogPost | null>(null);
	const [loading, setLoading] = useState(!!slug);

	useEffect(() => {
		if (!slug) {
			setPost(null);
			setLoading(false);
			return;
		}
		const fetchPost = async () => {
			try {
				setLoading(true);
				const response = await api.get(`/api/post/${encodeURIComponent(slug)}`);
				if (!response.ok) {
					setPost(null);
					return;
				}
				const data = await response.json();
				setPost(data);
			} catch (error) {
				console.error(error);
				setPost(null);
			} finally {
				setLoading(false);
			}
		};
		fetchPost();
	}, [slug]);

	return { post, loading };
}
