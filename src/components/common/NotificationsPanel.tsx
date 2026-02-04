import { useEffect, useRef, useState } from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import { cn } from '../../utils/common';
import { Bell, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationsPanel() {
	const { notifications, removeNotification, notificationsLoading } = useNotifications();
	const [isOpen, setIsOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	}, [isOpen]);

	return (
		<div ref={panelRef} className="group relative flex items-center justify-center">
			<button
				type="button"
				onClick={() => setIsOpen((o) => !o)}
				className="flex shrink-0 items-center justify-center p-1 text-sm font-medium text-white hover:text-gray-300"
				aria-label="Notifications"
				aria-expanded={isOpen}
			>
				<Bell className="size-5 shrink-0 sm:size-6" />
				{notifications.length > 0 && (
					<span className="absolute top-0 right-0 size-3.5 rounded-full bg-red-500 text-[10px] font-medium text-white sm:-top-0.5 sm:-right-0.5 sm:size-4 sm:text-xs">
						{notifications.length}
					</span>
				)}
			</button>
			<div
				className={cn(
					'absolute top-0 right-0 z-50 h-fit w-fit pt-10',
					isOpen ? 'block' : 'hidden md:group-hover:block'
				)}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="scrollbar-branded h-60 w-80 space-y-4 overflow-y-auto rounded border border-gray-400 bg-black/90 p-4 sm:h-96 sm:w-90">
					{notificationsLoading ? (
						<div className="flex size-full items-center justify-center">
							<Loader2 className="size-6 animate-spin" />
						</div>
					) : notifications.length > 0 ? (
						notifications.map((notification) => (
							<button
								onClick={() => removeNotification(notification.id)}
								key={notification.id}
								className="flex items-start gap-2"
							>
								<img
									src={notification.source_image}
									alt={notification.source_type}
									width={80}
									height={80}
									className="h-20 w-2/5 object-cover object-center"
									loading="lazy"
									decoding="async"
								/>
								<div className="w-3/5 text-left">
									<h2 className="text-sm font-medium text-gray-300">{notification.title}</h2>
									<p className="text-xs text-gray-500">
										{formatDistanceToNow(new Date(notification.createdAt), {
											addSuffix: true
										})}
									</p>
								</div>
							</button>
						))
					) : (
						<div className="flex size-full items-center justify-center">
							<p className="font-bold text-white">No Notifications</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
