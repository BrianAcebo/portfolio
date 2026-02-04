import { useEffect, useRef, useState } from 'react';
import Logo from '../common/Logo';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/common';
import SearchBar from './SearchBar';
import NotificationsPanel from '../common/NotificationsPanel';
import ProfilesPanel from '../profiles/ProfilesPanel';
import { Menu, X } from 'lucide-react';

export default function AppHeader() {
	const headerRef = useRef<HTMLDivElement>(null);
	const { pathname } = useLocation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	// Set the header height CSS var
	useEffect(() => {
		const el = headerRef.current;
		if (!el) return;

		const updateHeight = () => {
			const height = el.offsetHeight;
			document.documentElement.style.setProperty('--header-height', `${height}px`);
		};
		updateHeight();

		const updateHeader = () => {
			if (window.scrollY > 100) {
				el.classList.replace('bg-transparent', 'bg-black');
				el.classList.replace('py-4', 'py-2');
				el.classList.replace('py-3', 'py-2');
			} else {
				el.classList.replace('bg-black', 'bg-transparent');
				el.classList.replace('py-2', 'py-4');
			}
		};
		updateHeader();

		const observer = new ResizeObserver(updateHeight);
		observer.observe(el);

		window.addEventListener('load', updateHeight);
		window.addEventListener('scroll', updateHeader);

		return () => {
			window.removeEventListener('load', updateHeight);
			window.removeEventListener('scroll', updateHeader);
			observer.disconnect();
		};
	}, []);

	// Close mobile menu on route change (defer to avoid cascading render)
	useEffect(() => {
		queueMicrotask(() => setMobileMenuOpen(false));
	}, [pathname]);

	const LINKS = [
		{ label: 'Home', href: '/' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'About', href: '/about' },
		{ label: 'Resume', href: '/resume' },
		{ label: 'TV Shows', href: '/tv', fake: true },
		{ label: 'Movies', href: '/movies', fake: true },
		{ label: 'New & Popular', href: '/new', fake: true },
		{ label: 'My List', href: '/my-list', fake: true },
		{ label: 'Browse by Languages', href: '/browse', fake: true }
	];

	const linkClass = (href: string) => {
		const isHome = href === '/';
		const isActive = (!isHome && pathname.includes(href)) || (isHome && pathname === '/');
		return cn(
			'block text-sm font-medium text-white transition-colors hover:text-red-500',
			isActive && 'font-bold text-red-500'
		);
	};

	return (
		<>
			<header
				ref={headerRef}
				className="fixed top-0 z-100 w-full bg-transparent transition-all duration-300"
			>
				<div className="max-w-laptop mx-auto flex w-full items-center justify-between gap-2 py-3 pr-5 pl-3 sm:gap-4 md:px-8 xl:px-12">
					<div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden sm:gap-6 md:gap-10">
						<button
							type="button"
							onClick={() => setMobileMenuOpen((o) => !o)}
							className="flex shrink-0 items-center justify-center p-2 text-white hover:text-gray-300 md:hidden"
							aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
							aria-expanded={mobileMenuOpen}
						>
							{mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
						</button>
						<Logo />
						<nav className="hidden xl:block">
							<ul className="flex items-center gap-4 lg:gap-5">
								{LINKS.map((link) => (
									<li key={link.href}>
										{link.fake ? (
											<span className={cn('cursor-pointer', linkClass(link.href))}>
												{link.label}
											</span>
										) : (
											<Link to={link.href} className={linkClass(link.href)}>
												{link.label}
											</Link>
										)}
									</li>
								))}
							</ul>
						</nav>
					</div>
					<div className="flex min-w-0 shrink-0 items-center gap-4 md:gap-6">
						<div className="hidden md:block">
							<SearchBar />
						</div>
						<NotificationsPanel />
						<ProfilesPanel />
					</div>
				</div>
			</header>

			{/* Mobile / tablet menu overlay */}
			<div
				className={cn(
					'fixed inset-0 z-90 bg-black/80 transition-opacity duration-300 md:hidden',
					mobileMenuOpen ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0'
				)}
				onClick={() => setMobileMenuOpen(false)}
				aria-hidden={!mobileMenuOpen}
			/>
			<aside
				className={cn(
					'fixed top-0 left-0 z-95 h-full w-72 max-w-[85vw] bg-black shadow-xl transition-transform duration-300 ease-out md:hidden',
					mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
				)}
				aria-label="Main navigation"
			>
				<div className="flex h-full flex-col px-6 pt-[calc(var(--header-height,80px)+1rem)] pb-8">
					<div className="mb-6 md:hidden">
						<SearchBar />
					</div>
					<nav>
						<ul className="flex flex-col gap-3">
							{LINKS.map((link) => (
								<li key={link.href}>
									{link.fake ? (
										<span className={cn('cursor-pointer', linkClass(link.href))}>{link.label}</span>
									) : (
										<Link to={link.href} className={linkClass(link.href)}>
											{link.label}
										</Link>
									)}
								</li>
							))}
						</ul>
					</nav>
				</div>
			</aside>
		</>
	);
}
