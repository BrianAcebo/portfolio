import { createContext } from 'react';
import type { AuthContextType } from '../types/profiles';

export const AuthContext = createContext<AuthContextType>({
	user: null,
	authReady: false,
	setUser: () => {},
	signOut: () => {},
	signIn: () => {},
	changeProfile: () => {}
});
