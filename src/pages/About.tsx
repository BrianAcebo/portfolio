import PageMeta from '../components/common/PageMeta';
import { Mail, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';

export default function About() {
	return (
		<>
			<PageMeta
				title="About"
				description="About Brian Acebo — Senior Product Engineer with 7+ years of experience building scalable, AI-enabled products."
			/>
			<div className="mx-auto mt-30 max-w-4xl px-5 pb-16">
				{/* Hero */}
				<header className="animate-fade-in-up mb-16 flex flex-col items-start gap-6 opacity-0 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">About Me</h1>
						<p className="mt-4 text-xl text-gray-400">Senior Product Engineer</p>
					</div>
					<div className="shrink-0">
						<img
							src="/images/general/profile-2.png"
							alt="Brian Acebo"
							className="h-auto w-32 sm:w-40"
						/>
					</div>
				</header>

				{/* Intro */}
				<section className="animate-fade-in-up animate-stagger-2 mb-12 opacity-0">
					<p className="text-lg leading-relaxed text-gray-300">
						I'm a product engineer who builds software with a clear focus on outcomes, not just
						implementation.
					</p>
					<p className="mt-4 leading-relaxed text-gray-300">
						My work sits at the intersection of engineering, design, and business. Rather than
						focusing on a single layer of the stack, I take ownership of products end-to-end — from
						early concept and user experience, to system architecture, performance, and long-term
						scalability.
					</p>
					<p className="mt-4 leading-relaxed text-gray-300">
						Over the years, I've worked on AI-powered platforms, internal and customer-facing SaaS
						products, real-time systems, and data-driven applications. This has shaped how I
						approach development: every technical decision is made with usability, reliability, and
						real-world impact in mind.
					</p>
					<p className="mt-4 leading-relaxed text-gray-300">
						I don't just turn designs into code. I help define how a product should work, why it
						should work that way, and how it can improve over time.
					</p>
				</section>

				{/* How I Work */}
				<section className="animate-fade-in-up animate-stagger-3 mb-12 opacity-0">
					<h2 className="mb-4 text-2xl font-semibold text-white">How I Work</h2>
					<p className="leading-relaxed text-gray-300">
						I approach software as a living system, not a collection of features.
					</p>
					<p className="mt-4 leading-relaxed text-gray-300">
						Before writing code, I focus on understanding the problem:
					</p>
					<ul className="mt-4 space-y-2 text-gray-300">
						<li className="flex items-start gap-3">
							<span className="bg-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
							<span>Who is this for?</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="bg-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
							<span>What friction does it remove?</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="bg-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
							<span>How does it create value?</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="bg-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
							<span>What happens when it scales?</span>
						</li>
					</ul>
					<p className="mt-6 leading-relaxed text-gray-300">
						From there, I design and build solutions that balance clarity, performance, and
						maintainability. I use modern tools — including AI-assisted development — to move
						faster, while maintaining high standards for quality and reliability.
					</p>
				</section>

				{/* My Role */}
				<section className="animate-fade-in-up animate-stagger-4 mb-12 opacity-0">
					<h2 className="mb-4 text-2xl font-semibold text-white">What I Do</h2>
					<p className="mb-4 leading-relaxed text-gray-300">My role often involves:</p>
					<ul className="space-y-2 text-gray-300">
						<li className="flex items-start gap-3">
							<span className="bg-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
							<span>Designing user flows and product architecture</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="bg-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
							<span>Building robust front-end systems with React and TypeScript</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="bg-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
							<span>Backend development with Python and PostgreSQL</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="bg-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
							<span>Integrating APIs, AI services, and automation pipelines</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="bg-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
							<span>
								Implementing feature sets like billing, analytics, and operational tooling
							</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="bg-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
							<span>Iterating based on real user behavior and feedback</span>
						</li>
					</ul>
					<p className="mt-6 leading-relaxed text-gray-400 italic">
						I care deeply about shipping work that lasts.
					</p>
				</section>

				{/* What I Believe */}
				<section className="animate-fade-in-up animate-stagger-5 mb-12 opacity-0">
					<h2 className="mb-4 text-2xl font-semibold text-white">What I Believe</h2>
					<p className="leading-relaxed text-gray-300">
						Great products aren't created by writing more code — they're created by making better
						decisions.
					</p>
					<p className="mt-4 leading-relaxed text-gray-300">I believe strong engineers should:</p>
					<ul className="mt-4 space-y-2 text-gray-300">
						<li className="flex items-start gap-3">
							<span className="bg-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
							<span>Think in systems, not tickets</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="bg-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
							<span>Take responsibility for outcomes</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="bg-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
							<span>Communicate clearly with technical and non-technical teams</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="bg-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
							<span>Build with the future in mind</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="bg-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
							<span>Continuously improve their craft</span>
						</li>
					</ul>
					<p className="mt-6 leading-relaxed text-gray-400 italic">
						Technology changes quickly, but these principles don't.
					</p>
				</section>

				{/* Today */}
				<section className="animate-fade-in-up animate-stagger-6 mb-12 opacity-0">
					<h2 className="mb-4 text-2xl font-semibold text-white">Today</h2>
					<p className="leading-relaxed text-gray-300">
						Today, I focus on building scalable, AI-enabled products that help businesses operate
						more efficiently and serve their customers better.
					</p>
					<p className="mt-4 leading-relaxed text-gray-300">
						Whether I'm working on a startup, a growing SaaS platform, or a complex internal system,
						my goal is always the same: build thoughtful software that solves real problems and
						creates measurable impact.
					</p>
					<p className="mt-4 leading-relaxed text-gray-300">
						If you're looking for someone who can move from idea to execution — and take
						responsibility for everything in between — I'd love to connect.
					</p>
				</section>

				{/* Contact / Links */}
				<section className="animate-fade-in-up animate-stagger-7 opacity-0">
					<h2 className="mb-4 text-2xl font-semibold text-white">Get in Touch</h2>
					<div className="flex flex-wrap gap-6">
						<a
							href="mailto:brianacebo@gmail.com?subject=Hello from your portfolio!"
							className="hover:text-brand flex items-center gap-2 text-gray-300 transition"
						>
							<Mail className="h-5 w-5 shrink-0" />
							<span>brianacebo@gmail.com</span>
						</a>
						<a
							href="https://github.com/BrianAcebo"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-brand flex items-center gap-2 text-gray-300 transition"
						>
							<Github className="h-5 w-5 shrink-0" />
							<span>GitHub</span>
							<ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-60" />
						</a>
						<a
							href="https://linkedin.com/in/brianacebo"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-brand flex items-center gap-2 text-gray-300 transition"
						>
							<Linkedin className="h-5 w-5 shrink-0" />
							<span>LinkedIn</span>
							<ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-60" />
						</a>
					</div>
					<p className="mt-4 flex items-center gap-2 text-sm text-gray-500">
						<MapPin className="h-4 w-4 shrink-0" />
						Based in the US
					</p>
				</section>
			</div>
		</>
	);
}
