import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../utils/api';
import type { Profile } from '../types/profiles';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<Profile | null>(null);
	const [authReady, setAuthReady] = useState(false);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const currentProfileId = localStorage.getItem('currentProfileId');
				if (!currentProfileId) {
					setUser(null);
					return;
				}
				const response = await api.get(`/api/profile/${currentProfileId}`);
				if (!response.ok) {
					setUser(null);
					return;
				}
				const data = await response.json();
				setUser(data);
			} catch {
				setUser(null);
			} finally {
				setAuthReady(true);
			}
		};
		fetchProfile();
	}, []);

	const signOut = useCallback(() => {
		localStorage.removeItem('currentProfileId');
		setUser(null);
	}, []);

	const signIn = useCallback((profile: Profile) => {
		localStorage.setItem('currentProfileId', profile.id.toString());
		setUser(profile);
	}, []);

	const changeProfile = useCallback((profile: Profile) => {
		localStorage.setItem('currentProfileId', profile.id.toString());
		setUser(profile);
	}, []);

	const value = useMemo(
		() => ({ user, authReady, setUser, signOut, signIn, changeProfile }),
		[user, authReady, signOut, signIn, changeProfile]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
