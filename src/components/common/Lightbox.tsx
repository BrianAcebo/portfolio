import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface LightboxProps {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
	ariaLabel?: string;
}

export function Lightbox({ open, onClose, children, ariaLabel = 'Lightbox' }: LightboxProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useFocusTrap(containerRef, open, { onEscape: onClose });

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					ref={containerRef}
					className="fixed inset-0 z-1000 flex items-center justify-center overscroll-contain bg-black/90"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					onClick={onClose}
					role="dialog"
					aria-modal="true"
					aria-label={ariaLabel}
				>
					<button
						type="button"
						onClick={onClose}
						className="absolute top-3 right-3 z-10 flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 sm:top-4 sm:right-4 sm:h-10 sm:min-h-0 sm:w-10 sm:min-w-0"
						aria-label="Close lightbox"
					>
						<X className="h-6 w-6 sm:h-5 sm:w-5" />
					</button>

					<div
						className="mx-4 max-h-[85vh] w-[calc(100vw-2rem)] overflow-hidden rounded-lg bg-black text-white sm:mx-0"
						onClick={(e) => e.stopPropagation()}
					>
						{children}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default Lightbox;
