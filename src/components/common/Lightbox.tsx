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
						className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
						aria-label="Close lightbox"
					>
						<X className="h-5 w-5" />
					</button>

					<div
						className="max-h-[85vh] max-w-[70vw] overflow-hidden rounded-lg bg-black text-white"
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
