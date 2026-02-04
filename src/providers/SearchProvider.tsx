import { useCallback, useState } from 'react';
import SearchContext from '../contexts/SearchContext';
import { api } from '../utils/api';
import type { Project } from '../types/projects';

export default function SearchProvider({ children }: { children: React.ReactNode }) {
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState<Project[]>([]);

	const handleSearch = useCallback(async (query: string) => {
		try {
			const response = await api.get(`/api/search?query=${encodeURIComponent(query)}`);
			if (!response.ok) {
				throw new Error('Failed to search');
			}
			const data = await response.json();
			setSearchResults(data);
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<SearchContext.Provider
			value={{ search, setSearch, searchResults, setSearchResults, handleSearch }}
		>
			{children}
		</SearchContext.Provider>
	);
}
