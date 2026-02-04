import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useProfiles } from '../../hooks/useProfiles';
import { cn } from '../../utils/common';
import { CircleQuestionMark, Loader2, Pencil, Smile, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfilesPanel() {
	const { profiles, profilesLoading } = useProfiles();
	const { user, signOut, changeProfile } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	}, [isOpen]);

	return (
		<div ref={panelRef} className="group relative flex items-center justify-center">
			<button
				type="button"
				onClick={() => setIsOpen((o) => !o)}
				className="flex shrink-0 rounded-lg bg-gray-800 p-1 text-sm font-medium text-white hover:ring-2 hover:ring-gray-500"
				aria-label="Profile menu"
				aria-expanded={isOpen}
			>
				<img
					src={user?.avatar}
					alt={user?.name ?? 'Profile'}
					width={28}
					height={28}
					className="size-6 object-cover object-center sm:size-7"
					loading="lazy"
					decoding="async"
				/>
			</button>
			<div
				className={cn(
					'absolute top-0 right-0 z-50 h-fit w-fit pt-12',
					isOpen ? 'block' : 'hidden md:group-hover:block'
				)}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="scrollbar-branded h-fit w-50 overflow-y-auto border border-gray-400 bg-black/90 pt-4">
					{profilesLoading ? (
						<div className="flex size-full items-center justify-center">
							<Loader2 className="size-6 animate-spin" />
						</div>
					) : profiles.length > 0 ? (
						<>
							<div className="space-y-4 px-3 pb-4">
								{profiles.map((profile) => {
									return (
										<button
											type="button"
											key={profile.name}
											className="flex items-center gap-2"
											onClick={() => changeProfile(profile)}
										>
											<div className="rounded-lg bg-gray-800 p-1">
												<img
													src={profile.avatar}
													alt={profile.name}
													width={32}
													height={32}
													className="size-6 object-cover object-center sm:size-8"
													loading="lazy"
													decoding="async"
												/>
											</div>
											<div className="w-fit text-left">
												<h2 className="text-sm font-medium text-gray-300">{profile.name}</h2>
											</div>
										</button>
									);
								})}
								<button className="text-muted flex w-full items-center gap-2 text-sm">
									<Pencil className="size-4" /> Manage Profiles
								</button>
								<button className="text-muted flex w-full items-center gap-2 text-sm">
									<Smile className="size-4" /> Transfer Profile
								</button>
								<Link to="/about" className="text-muted flex w-full items-center gap-2 text-sm">
									<User className="size-4" /> About Brian
								</Link>
								<button className="text-muted flex w-full items-center gap-2 text-sm">
									<CircleQuestionMark className="size-4" /> Help Center
								</button>
							</div>
							<button
								onClick={signOut}
								className="text-muted flex w-full items-center justify-center gap-2 border-t border-gray-400 py-2 text-center text-sm"
							>
								Sign Out
							</button>
						</>
					) : (
						<div className="flex size-full items-center justify-center">
							<p className="font-bold text-white">No Profiles</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
