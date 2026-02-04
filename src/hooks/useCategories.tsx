import { useEffect, useState } from 'react';
import type { Category } from '../types/projects';
import { api } from '../utils/api';

export const useCategories = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [categoriesLoading, setCategoriesLoading] = useState(false);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setCategoriesLoading(true);
				const response = await api.get('/api/categories', {
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (!response.ok) {
					throw new Error('Failed to fetch categories');
				}
				const data = await response.json();
				setCategories(data);
			} catch (error) {
				console.error(error);
			} finally {
				setCategoriesLoading(false);
			}
		};
		fetchCategories();
	}, []);

	return { categories, categoriesLoading };
};
