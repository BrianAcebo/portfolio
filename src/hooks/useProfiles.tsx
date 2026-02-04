import { useEffect, useState } from 'react';
import type { Profile } from '../types/profiles';
import { api } from '../utils/api';

export const useProfiles = () => {
	const [profiles, setProfiles] = useState<Profile[]>([]);
	const [profilesLoading, setProfilesLoading] = useState(false);

	useEffect(() => {
		const fetchProfiles = async () => {
			try {
				setProfilesLoading(true);
				const response = await api.get('/api/profiles');
				if (!response.ok) {
					throw new Error('Failed to fetch profiles');
				}
				const data = await response.json();
				setProfiles(data);
			} catch (error) {
				console.error(error);
			} finally {
				setProfilesLoading(false);
			}
		};
		fetchProfiles();
	}, []);

	return { profiles, profilesLoading };
};
