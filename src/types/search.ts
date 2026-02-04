import type { Project } from './projects';

export interface SearchContextType {
	search: string;
	setSearch: (search: string) => void;
	searchResults: Project[];
	setSearchResults: (searchResults: Project[]) => void;
	handleSearch: (query: string) => Promise<void>;
}
