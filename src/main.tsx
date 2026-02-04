import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { HelmetProvider } from 'react-helmet-async';
import SearchProvider from './providers/SearchProvider.tsx';
import AuthProvider from './providers/AuthProvider.tsx';
import ProjectsProvider from './providers/ProjectsProvider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HelmetProvider>
			<SearchProvider>
				<ProjectsProvider>
					<AuthProvider>
						<App />
					</AuthProvider>
				</ProjectsProvider>
			</SearchProvider>
		</HelmetProvider>
	</StrictMode>
);
