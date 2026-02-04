import { useCallback, useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
	'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Returns an array of focusable elements within the given container.
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
	return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
		(el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
	);
}

interface UseFocusTrapOptions {
	/** Called when user presses Escape; use to close the modal */
	onEscape?: () => void;
}

/**
 * Traps focus inside the given container. Tab cycles within; Shift+Tab cycles backward.
 * Focus moves to the first focusable element when the trap activates; focus is restored on cleanup.
 */
export function useFocusTrap(
	containerRef: React.RefObject<HTMLElement | null>,
	isActive: boolean,
	options: UseFocusTrapOptions = {}
) {
	const { onEscape } = options;
	const previousActiveElement = useRef<HTMLElement | null>(null);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!containerRef.current) return;

			if (e.key === 'Escape') {
				onEscape?.();
				return;
			}

			if (e.key !== 'Tab') return;

			const focusable = getFocusableElements(containerRef.current);
			if (focusable.length === 0) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const current = document.activeElement as HTMLElement | null;

			if (e.shiftKey) {
				if (current === first) {
					e.preventDefault();
					last.focus();
				}
			} else {
				if (current === last) {
					e.preventDefault();
					first.focus();
				}
			}
		},
		[containerRef, onEscape]
	);

	useEffect(() => {
		if (!isActive || !containerRef.current) return;

		previousActiveElement.current = document.activeElement as HTMLElement | null;
		const focusable = getFocusableElements(containerRef.current);
		if (focusable.length > 0) {
			focusable[0].focus();
		}

		containerRef.current.addEventListener('keydown', handleKeyDown);
		return () => {
			containerRef.current?.removeEventListener('keydown', handleKeyDown);
			previousActiveElement.current?.focus();
		};
	}, [isActive, containerRef, handleKeyDown]);

	return { previousActiveElement };
}
