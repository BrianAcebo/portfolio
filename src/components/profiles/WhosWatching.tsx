import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useProfiles } from '../../hooks/useProfiles';
import Logo from '../common/Logo';
import { Loader2 } from 'lucide-react';

export default function WhosWatching() {
	const { profiles, profilesLoading } = useProfiles();
	const { signIn } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="bg-bg relative flex h-screen w-screen items-center justify-center">
			<div className="absolute top-7 left-7 z-10 sm:top-10 sm:left-10">
				<Logo />
			</div>
			<div className="z-10 space-y-6 text-center">
				<h1 className="text-2xl font-bold text-white sm:text-4xl">Who's Watching?</h1>
				<div className="flex flex-wrap items-center justify-center gap-5">
					{profilesLoading ? (
						<Loader2 className="size-6 animate-spin" />
					) : profiles.length > 0 ? (
						profiles.map((profile) => (
							<button
								key={profile.id}
								className="bg-white/10 p-3 transition-transform duration-300 ease-out hover:scale-105"
								onClick={() => {
									signIn(profile);
									navigate('/');
								}}
							>
								<img
									src={profile.avatar}
									alt={profile.name}
									width={160}
									height={160}
									className="mb-2 size-30 object-cover object-center sm:size-40"
									loading="lazy"
									decoding="async"
								/>
								<span className="text-muted text-sm font-medium sm:text-base">{profile.name}</span>
							</button>
						))
					) : (
						<div className="text-2xl font-bold text-white">No profiles found</div>
					)}
				</div>
				<button className="z-10 border border-white px-3 py-2 text-sm uppercase transition-colors duration-300 hover:bg-white/10 sm:text-base">
					Manage Profiles
				</button>
			</div>
		</div>
	);
}
