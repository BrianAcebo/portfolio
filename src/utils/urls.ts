/**
 * URL utilities for API requests
 *
 * VITE_API_URL - The backend API URL
 * - Dev: http://localhost:3000 (or use Vite proxy)
 * - Prod: https://api.brianacebo.com maybe? maybe not?
 */

// Get the API base URL
const getApiBase = (): string => {
	// Use VITE_API_URL if set, otherwise use same-origin (Vite proxy)
	if (typeof window !== 'undefined') {
		const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
		return apiUrl || window.location.origin;
	}
	return 'http://localhost:3000';
};

// Build API URL for a given endpoint
export const buildApiUrl = (endpoint: string): string => {
	const base = getApiBase();
	const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
	return `${base}${path}`;
};
