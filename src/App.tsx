import { BrowserRouter as Router, Routes, Route } from 'react-router';
import ScrollToTop from './components/common/ScrollToTop';
import { Toaster } from 'sonner';
import AppLayout from './layouts/AppLayout';
import NotFound from './components/error/NotFound';
import Home from './pages/Home';
import Search from './pages/Search';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Resume from './pages/Resume';
import './index.css';

function App() {
	return (
		<>
			<Toaster richColors closeButton />
			<Router>
				<ScrollToTop />
				<Routes>
					<Route element={<AppLayout />}>
						<Route index path="/" element={<Home />} />
						<Route path="/search" element={<Search />} />
						<Route path="/blog" element={<Blog />} />
						<Route path="/blog/:slug" element={<BlogPost />} />
						<Route path="/about" element={<About />} />
						<Route path="/resume" element={<Resume />} />
					</Route>

					{/* Fallback Route */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
