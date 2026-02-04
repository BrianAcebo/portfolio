import { Search as SearchIcon, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/common';
import { useSearch } from '../../hooks/useSearch';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { DEBOUNCE_MS } from '../../constants';

export default function SearchInput({ isMobile = false }: { isMobile?: boolean }) {
	const [isOpen, setIsOpen] = useState(false);
	const [initialLoad, setInitialLoad] = useState(true);

	const searchRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	// Page user was on when they opened search — redirect back here when they clear/close
	const pathBeforeSearchRef = useRef<string>('/');
	const isOpenRef = useRef(false);
	// True when user navigated away from /search (e.g. clicked a link) — prevents debounced effect from redirecting back
	const userLeftSearchPageRef = useRef(false);

	const { search, setSearch } = useSearch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const debouncedSearch = useDebounce(search, DEBOUNCE_MS);

	// When leaving search page: clear search and mark so we don't redirect back (debounce can still fire with old value).
	// Always keep pathBeforeSearchRef = last non-search path so all SearchBar instances (header + mobile) share the same "back" target.
	useEffect(() => {
		if (pathname !== '/search') {
			pathBeforeSearchRef.current = pathname;
			userLeftSearchPageRef.current = true;
			setSearch('');
		} else {
			userLeftSearchPageRef.current = false;
		}
	}, [pathname, setSearch]);

	const handleOpenSearchInput = useCallback(() => {
		if (pathname !== '/search') {
			pathBeforeSearchRef.current = pathname;
			userLeftSearchPageRef.current = false; // allow typing to navigate to search from this page
		}
		isOpenRef.current = true;
		setIsOpen(true);

		// Needs to wait because the input is invisible/w-0 until the transition is complete
		setTimeout(() => {
			inputRef.current?.focus();
		}, 300);
	}, [pathname]);

	const handleCloseSearchInput = useCallback(() => {
		isOpenRef.current = false;
		setIsOpen(false);
		setSearch('');
		navigate(pathBeforeSearchRef.current);
	}, [setSearch, navigate]);

	useEffect(() => {
		// Navigate to search when user types, from any page — unless they just left search (clicked a link)
		if (debouncedSearch && !initialLoad && !userLeftSearchPageRef.current) {
			navigate(`/search?query=${debouncedSearch}`);
		}
	}, [debouncedSearch, navigate, initialLoad]);

	useEffect(() => {
		// When search is cleared: close and redirect back only if search was open or they're on search page (not on every page — that overrides link clicks)
		if (!search && !initialLoad && (isOpenRef.current || pathname === '/search')) {
			queueMicrotask(() => handleCloseSearchInput());
		}
		const handleClickOutside = (event: MouseEvent) => {
			if (!isOpenRef.current) return;
			const target = event.target as Node;
			if (target instanceof HTMLElement && target.closest('a')) return;
			if (!search && pathname !== '/search' && !searchRef.current?.contains(target)) {
				handleCloseSearchInput();
			}
		};
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, [handleCloseSearchInput, search, pathname, initialLoad]);

	useEffect(() => {
		// Same here ^^^
		queueMicrotask(() => setInitialLoad(false));
	}, []);

	return (
		<div
			ref={searchRef}
			className={`${cn('flex items-center justify-end gap-2 transition-all duration-300', isOpen ? 'border border-white bg-black/50 p-1' : '-mr-2 border-none p-0')}`}
		>
			<button
				type="button"
				onClick={handleOpenSearchInput}
				className="flex items-center justify-center"
				aria-label="Open search"
			>
				<SearchIcon className="size-6" />
			</button>
			<input
				id={isMobile ? 'mobile-header-search' : 'header-search'}
				name={isMobile ? 'mobile-header-search' : 'header-search'}
				className={`${cn('text-sm font-medium text-white transition-all duration-300 outline-none focus:outline-none', isOpen ? 'visible w-full' : 'invisible w-0')}`}
				ref={inputRef}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				type="search"
				placeholder="Title, people, genres"
				autoComplete="off"
			/>
			<button
				type="button"
				onClick={handleCloseSearchInput}
				className={cn('flex items-center justify-center', isOpen ? 'block' : 'hidden')}
				aria-label="Close search"
			>
				<X className="size-4" />
			</button>
		</div>
	);
}
