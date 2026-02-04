import GridShape from '../../components/common/GridShape';
import { Link } from 'react-router';
import PageMeta from '../../components/common/PageMeta';

export default function NotFound() {
	return (
		<>
			<PageMeta
				title="404 - Page Not Found"
				description="We can't seem to find the page you are looking for!"
			/>
			<div className="relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden p-6">
				<GridShape />
				<div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
					<h1 className="text-title-md xl:text-title-2xl text-muted mb-8 font-bold">ERROR</h1>

					<img
						src="/images/error/404.svg"
						alt="404"
						width={200}
						height={200}
						className="dark:hidden"
						decoding="async"
					/>
					<img
						src="/images/error/404-dark.svg"
						alt="404"
						width={200}
						height={200}
						className="hidden dark:block"
						decoding="async"
					/>

					<p className="text-muted mt-10 mb-6 text-base sm:text-lg">
						We can't seem to find the page you are looking for!
					</p>

					<Link
						to="/"
						className="shadow-theme-xs inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
					>
						Back to Home Page
					</Link>
				</div>
				{/* <!-- Footer --> */}
				<p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-gray-500 dark:text-gray-400">
					&copy; {new Date().getFullYear()} - Brian Acebo
				</p>
			</div>
		</>
	);
}
