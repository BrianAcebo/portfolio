import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import ScrollToTop from './components/common/ScrollToTop';
import { Toaster } from 'sonner';
import AppLayout from './layouts/AppLayout';
import NotFound from './components/error/NotFound';
import { Loader2 } from 'lucide-react';
import './index.css';

// Lazy load pages for code splitting - reduces initial bundle size
const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const About = lazy(() => import('./pages/About'));
const Resume = lazy(() => import('./pages/Resume'));

// Minimal loading fallback
const PageLoader = () => (
	<div className="flex min-h-[50vh] items-center justify-center">
		<Loader2 className="size-6 animate-spin text-white" />
	</div>
);

function App() {
	return (
		<>
			<Toaster richColors closeButton />
			<Router>
				<ScrollToTop />
				<Routes>
					<Route element={<AppLayout />}>
						<Route
							index
							path="/"
							element={
								<Suspense fallback={<PageLoader />}>
									<Home />
								</Suspense>
							}
						/>
						<Route
							path="/search"
							element={
								<Suspense fallback={<PageLoader />}>
									<Search />
								</Suspense>
							}
						/>
						<Route
							path="/blog"
							element={
								<Suspense fallback={<PageLoader />}>
									<Blog />
								</Suspense>
							}
						/>
						<Route
							path="/blog/:slug"
							element={
								<Suspense fallback={<PageLoader />}>
									<BlogPost />
								</Suspense>
							}
						/>
						<Route
							path="/about"
							element={
								<Suspense fallback={<PageLoader />}>
									<About />
								</Suspense>
							}
						/>
						<Route
							path="/resume"
							element={
								<Suspense fallback={<PageLoader />}>
									<Resume />
								</Suspense>
							}
						/>
					</Route>

					{/* Fallback Route */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
