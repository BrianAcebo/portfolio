import { createContext } from 'react';
import type { SearchContextType } from '../types/search';

const SearchContext = createContext<SearchContextType>({
	search: '',
	setSearch: () => {},
	searchResults: [],
	setSearchResults: () => {},
	handleSearch: (query: string) => Promise.resolve()
});

export default SearchContext;
