import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface LightboxProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	ariaLabel?: string;
}

export function Lightbox({ open, onClose, children, ariaLabel }: LightboxProps) {
	const [mounted, setMounted] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted || !open) return;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	}, [mounted, open]);

	const handleClose = useCallback(() => {
		onClose();
	}, [onClose]);

	useFocusTrap(containerRef, mounted && open, { onEscape: handleClose });

	if (!mounted || !open) {
		return null;
	}

	return createPortal(
		<div
			ref={containerRef}
			className="fixed inset-0 z-1000 flex items-center justify-center bg-black/75 px-4 py-10 backdrop-blur-sm"
			role="dialog"
			aria-modal="true"
			aria-label={ariaLabel ?? 'Lightbox dialog'}
			onClick={handleClose}
		>
			<div
				className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 shadow-xl"
				onClick={(event) => event.stopPropagation()}
			>
				<button
					type="button"
					onClick={handleClose}
					className="absolute top-5 right-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black"
					aria-label="Close"
				>
					<X className="h-5 w-5" />
				</button>
				<div className="bg-black text-white">{children}</div>
			</div>
		</div>,
		document.body
	);
}
