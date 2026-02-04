import { Link } from 'react-router-dom';

export default function Logo() {
	return (
		<Link
			to="/"
			className="-ml-1 inline-flex items-baseline gap-0 text-2xl font-bold tracking-tight text-red-600 uppercase [text-shadow:0_0_1px_rgba(0,0,0,0.3)] dark:text-red-500"
		>
			<img src="/images/logos/logo.svg" alt="Logo" className="w-28 sm:w-36 md:w-40" />
		</Link>
	);
}
