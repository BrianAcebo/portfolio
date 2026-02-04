import PageMeta from '../components/common/PageMeta';
import { Phone, Mail, MapPin, Download } from 'lucide-react';
import { useCallback } from 'react';

const RESUME_PDF = '/files/brian-acebo-resume.pdf';

const TECHNOLOGIES = [
	{ name: 'TypeScript', level: 85 },
	{ name: 'React', level: 90 },
	{ name: 'Product Systems', level: 75 },
	{ name: 'SQL', level: 30 },
	{ name: 'Python', level: 40 },
	{ name: 'Tailwind CSS', level: 80 },
	{ name: 'GraphQL', level: 20 }
] as const;

export default function Resume() {
	const handleDownload = useCallback(() => {
		const link = document.createElement('a');
		link.href = RESUME_PDF;
		link.download = 'brian-acebo-resume.pdf';
		link.setAttribute('target', '_blank');
		link.setAttribute('rel', 'noopener noreferrer');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, []);

	const renderTechnologies = useCallback(() => {
		return (
			<ul className="w-full gap-2 space-y-3 text-gray-300 sm:w-100">
				{TECHNOLOGIES.map((tech) => (
					<li key={tech.name} className="flex items-center gap-3">
						<span className="w-1/2 sm:w-auto sm:min-w-35">{tech.name}</span>
						<div className="h-1.5 w-1/2 max-w-32 min-w-20 flex-1 overflow-hidden rounded-full bg-gray-600 sm:w-auto">
							<div
								className="bg-brand h-full rounded-full transition-[width] duration-500"
								style={{ width: `${tech.level}%` }}
							/>
						</div>
					</li>
				))}
			</ul>
		);
	}, []);

	return (
		<>
			<PageMeta
				title="Resume"
				description="Brian Acebo — Senior Product Engineer. Resume and work experience."
			/>
			<div className="mx-auto mt-30 max-w-4xl px-6 pb-16 md:px-10">
				{/* Hero + Download */}
				<header className="animate-fade-in-up mb-12 flex flex-col gap-6 opacity-0 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Resume</h1>
						<p className="mt-4 text-xl text-gray-400">Work experience and background.</p>
					</div>
					<button
						type="button"
						onClick={handleDownload}
						className="hover:bg-brand/90 flex shrink-0 items-center gap-2 self-start rounded-md bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors"
					>
						<Download className="h-4 w-4 shrink-0" />
						Download Resume
					</button>
				</header>

				{/* Contact */}
				<section className="animate-fade-in-up animate-stagger-2 mb-12 opacity-0">
					<h2 className="mb-4 text-2xl font-semibold text-white">Contact</h2>
					<div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-300">
						<a
							href="tel:786-274-0326"
							className="flex items-center gap-2 transition-colors hover:text-white"
						>
							<Phone className="h-4 w-4 shrink-0" />
							786-274-0326
						</a>
						<a
							href="mailto:brianacebo@gmail.com"
							className="flex items-center gap-2 transition-colors hover:text-white"
						>
							<Mail className="h-4 w-4 shrink-0" />
							brianacebo@gmail.com
						</a>
						<span className="flex items-center gap-2">
							<MapPin className="h-4 w-4 shrink-0" />
							Fort Lauderdale, FL
						</span>
					</div>
					<a
						href="https://brianacebo.com"
						target="_blank"
						rel="noopener noreferrer"
						className="mt-2 inline-block text-gray-400 transition-colors hover:text-white"
					>
						https://brianacebo.com
					</a>
				</section>

				{/* Summary */}
				<section className="animate-fade-in-up animate-stagger-3 mb-12 opacity-0">
					<h2 className="mb-4 text-2xl font-semibold text-white">Summary</h2>
					<p className="leading-relaxed text-gray-300">
						Senior product engineer with 7+ years of experience building scalable, user-focused web
						applications. Specializes in React and TypeScript with supporting backend skills in
						Python and PostgreSQL. Takes end-to-end ownership of products—from concept and UX
						through architecture, performance, and long-term scalability. Experienced across
						AI-powered platforms, SaaS products, and real-time systems, with a focus on shipping
						work that solves real problems and creates measurable impact.
					</p>
				</section>

				{/* Education & Technologies */}
				<section className="animate-fade-in-up animate-stagger-4 mb-12 flex flex-col gap-12 opacity-0 md:flex-row">
					<div>
						<h2 className="mb-4 text-2xl font-semibold text-white">Education</h2>
						<div className="space-y-4">
							<div>
								<p className="text-sm text-gray-500">2014-2018</p>
								<p className="text-sm font-medium text-white">Hollywood Hills Military Academy</p>
								<p className="mt-1 text-gray-300">
									Leadership, Strategic Thinking, Discipline, Adaptability
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">2018+</p>
								<p className="text-sm font-medium text-white">Self-Taught Software Engineer</p>
								<p className="mt-1 text-gray-300">
									Began coding in high school, building real projects and client work by age 18.
									Chose to pursue hands-on experience and full-time development roles instead of a
									traditional college path.
								</p>
							</div>
						</div>
					</div>
					<div>
						<h2 className="mb-4 text-2xl font-semibold text-white">Technologies</h2>
						{renderTechnologies()}
					</div>
				</section>

				{/* Work Experience */}
				<section className="animate-fade-in-up animate-stagger-5 opacity-0">
					<h2 className="mb-6 text-2xl font-semibold text-white">Work Experience</h2>
					<div className="space-y-8">
						<div>
							<div className="flex flex-wrap items-baseline justify-between gap-2">
								<h3 className="text-lg font-semibold text-white">Front-End Application Engineer</h3>
								<span className="text-sm text-gray-500">Nascent (July 2025 – Current)</span>
							</div>
							<p className="mt-2 leading-relaxed text-gray-300">
								Built high-performance user interfaces for a crypto-native investment and trading
								firm. Worked exclusively on the trade execution engine of an internal, web-based
								trading and analytics platform used by professional traders to monitor markets,
								analyze data, and execute trades in real time. Collaborated closely with traders and
								backend engineers to refine product usability and functionality, ensure reliability
								of financial data under heavy load, and optimize real-time updates for speed and
								accuracy.
							</p>
						</div>

						<div>
							<div className="flex flex-wrap items-baseline justify-between gap-2">
								<h3 className="text-lg font-semibold text-white">Front-End Engineer</h3>
								<span className="text-sm text-gray-500">Compose (Sep 2022 – May 2025)</span>
							</div>
							<p className="mt-2 leading-relaxed text-gray-300">
								Served as a Frontend Engineer developing UI for the company's internal SaaS product
								while also contributing to client-facing builds through its sister company, Udundi.
								Built scalable interfaces using React, SvelteKit, and TypeScript, with a strong
								focus on performance, user experience, and scalability for large user bases. Set
								technical direction, mentored junior developers, and collaborated closely with
								design and product teams to ship polished experiences across both SaaS and
								high-traffic client storefronts.
							</p>
						</div>

						<div>
							<div className="flex flex-wrap items-baseline justify-between gap-2">
								<h3 className="text-lg font-semibold text-white">
									Founder / Chief Executive Officer
								</h3>
								<span className="text-sm text-gray-500">Hryzn, Inc. (Nov 2021 – Mar 2022)</span>
							</div>
							<p className="mt-2 leading-relaxed text-gray-300">
								Co-founded and engineered a scalable social networking platform using SvelteKit,
								Node.js, and MongoDB. Designed all frontend features, UI states, and responsive
								layouts from scratch. Integrated marketing analytics and user behavior tracking to
								drive product iterations. Managed deployment, performance tuning, and user growth
								strategies.
							</p>
						</div>

						<div>
							<div className="flex flex-wrap items-baseline justify-between gap-2">
								<h3 className="text-lg font-semibold text-white">Software Engineer</h3>
								<span className="text-sm text-gray-500">Wilki Digital (Mar 2019 – Nov 2021)</span>
							</div>
							<p className="mt-2 leading-relaxed text-gray-300">
								Delivered modern, responsive websites and dashboards for clients using React, Vue,
								and Tailwind. Created CMS integrations, animation layers, and custom components for
								marketing pages. Led small project teams, provided technical consultation, and
								handled client presentations.
							</p>
						</div>

						<div>
							<div className="flex flex-wrap items-baseline justify-between gap-2">
								<h3 className="text-lg font-semibold text-white">Freelance Web Developer</h3>
								<span className="text-sm text-gray-500">N/A (Oct 2018 – Mar 2019)</span>
							</div>
							<p className="mt-2 leading-relaxed text-gray-300">
								Provided augmentation work to existing development teams. Worked with clients to
								build and maintain an online presence for small businesses. Offered consultation
								services to help scale plateaued online businesses. Integrated 3rd-party APIs and
								marketing tools (Mailchimp, Stripe, Calendly).
							</p>
						</div>

						<div>
							<div className="flex flex-wrap items-baseline justify-between gap-2">
								<h3 className="text-lg font-semibold text-white">Front End Developer</h3>
								<span className="text-sm text-gray-500">
									Advantage Services (Apr 2018 – Oct 2018)
								</span>
							</div>
							<p className="mt-2 leading-relaxed text-gray-300">
								Designed and developed front end for client web sites. Collaborated with designers
								to ensure aesthetic UI and a quality user experience. Optimized, designed, and
								maintained coding solutions for existing clients. Constantly worked with executive
								management to exceed client demands.
							</p>
						</div>

						<div>
							<div className="flex flex-wrap items-baseline justify-between gap-2">
								<h3 className="text-lg font-semibold text-white">Assistant Marketing Manager</h3>
								<span className="text-sm text-gray-500">
									Leaf Home Water Solutions (Mar 2022 – Sep 2022)
								</span>
							</div>
							<p className="mt-2 leading-relaxed text-gray-300">
								Leadership role setting up and working shows/events, delegating tasks, and managing
								projects to exceed a desired outcome. Worked in a fast-paced customer-facing role,
								directly engaging prospects to deliver an exceptional experience for our sales
								funnel. Top performing marketer in our office, raising our lead count by over 400%
								and promoted to assistant manager.
							</p>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
