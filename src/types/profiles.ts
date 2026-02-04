export interface Profile {
	id: number;
	name: string;
	email: string;
	avatar: string;
	created_at: string;
	updated_at: string;
}

export interface AuthContextType {
	user: Profile | null;
	authReady: boolean;
	setUser: (user: Profile) => void;
	signOut: () => void;
	signIn: (profile: Profile) => void;
	changeProfile: (profile: Profile) => void;
}
