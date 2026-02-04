import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

function formatTime(seconds: number): string {
	if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60);
	return `${m}:${s.toString().padStart(2, '0')}`;
}

interface VideoWithCustomControlsProps {
	src: string;
	className?: string;
	autoPlay?: boolean;
	playsInline?: boolean;
}

export function VideoWithCustomControls({
	src,
	className = '',
	autoPlay = false,
	playsInline = true
}: VideoWithCustomControlsProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);
	const [isMuted, setIsMuted] = useState(false);
	const [showControls, setShowControls] = useState(true);
	const hideControlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const rafRef = useRef<number | null>(null);
	const isSeekingRef = useRef(false);

	const video = videoRef.current;

	const togglePlay = () => {
		if (!video) return;
		if (video.paused) {
			video.play();
			setIsPlaying(true);
		} else {
			video.pause();
			setIsPlaying(false);
		}
	};

	const handleTimeUpdate = () => {
		if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
	};

	const handleLoadedMetadata = () => {
		const el = videoRef.current;
		if (el && Number.isFinite(el.duration) && el.duration > 0) {
			setDuration(el.duration);
		}
	};

	const handleDurationChange = () => {
		const el = videoRef.current;
		if (el && Number.isFinite(el.duration) && el.duration > 0) {
			setDuration(el.duration);
		}
	};

	const handleEnded = () => {
		setIsPlaying(false);
		setCurrentTime(0);
	};

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		if (videoRef.current) {
			videoRef.current.currentTime = value;
			setCurrentTime(value);
		}
	};

	const handleSeekStart = () => {
		isSeekingRef.current = true;
	};

	const handleSeekEnd = () => {
		isSeekingRef.current = false;
		if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		if (video) {
			video.volume = value;
			setVolume(value);
			setIsMuted(value === 0);
		}
	};

	const toggleMute = () => {
		if (!video) return;
		if (isMuted || volume === 0) {
			video.volume = volume || 1;
			setVolume(volume || 1);
			setIsMuted(false);
		} else {
			video.volume = 0;
			setIsMuted(true);
		}
	};

	const toggleFullscreen = () => {
		if (!video) return;
		const container = video.parentElement;
		if (!container) return;
		if (!document.fullscreenElement) {
			container.requestFullscreen?.();
		} else {
			document.exitFullscreen?.();
		}
	};

	const handleMouseMove = () => {
		setShowControls(true);
		if (hideControlsTimeoutRef.current) {
			clearTimeout(hideControlsTimeoutRef.current);
		}
		hideControlsTimeoutRef.current = setTimeout(() => {
			if (isPlaying) setShowControls(false);
			hideControlsTimeoutRef.current = null;
		}, 2500);
	};

	// Smooth progress: sync currentTime from video every frame while playing
	useEffect(() => {
		if (!isPlaying) return;

		const tick = () => {
			const el = videoRef.current;
			if (el && !el.paused && !isSeekingRef.current) {
				setCurrentTime(el.currentTime);
				// Duration can become available after metadata (e.g. streaming); keep syncing
				if (Number.isFinite(el.duration) && el.duration > 0) {
					setDuration(el.duration);
				}
			}
			rafRef.current = requestAnimationFrame(tick);
		};
		rafRef.current = requestAnimationFrame(tick);
		return () => {
			if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		};
	}, [isPlaying]);

	useEffect(() => {
		return () => {
			if (hideControlsTimeoutRef.current) clearTimeout(hideControlsTimeoutRef.current);
		};
	}, []);

	return (
		<div
			className="group relative bg-black"
			onMouseMove={handleMouseMove}
			onMouseLeave={() => (isPlaying ? setShowControls(false) : null)}
		>
			<video
				ref={videoRef}
				className={className}
				src={src}
				autoPlay={autoPlay}
				playsInline={playsInline}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onDurationChange={handleDurationChange}
				onLoadedData={handleLoadedMetadata}
				onEnded={handleEnded}
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
				onClick={togglePlay}
			/>

			{/* Center play/pause overlay (only when paused or controls visible) */}
			{(!isPlaying || showControls) && (
				<button
					type="button"
					onClick={togglePlay}
					className="opacity absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:opacity-100"
					aria-label={isPlaying ? 'Pause' : 'Play'}
				>
					<span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30">
						{isPlaying ? (
							<Pause className="h-10 w-10 fill-current" />
						) : (
							<Play className="h-10 w-10 fill-current pl-1" />
						)}
					</span>
				</button>
			)}

			{/* Bottom control bar */}
			<div
				className={`absolute right-0 bottom-0 left-0 z-10 flex flex-col gap-2 bg-linear-to-t from-black/90 to-transparent px-4 pt-8 pb-3 transition-opacity ${
					showControls ? 'opacity-100' : 'opacity-0'
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Progress bar */}
				<div className="relative h-1.5 w-full rounded-full bg-gray-600">
					<div
						className="absolute inset-y-0 left-0 rounded-l-full bg-white"
						style={{
							width:
								duration > 0 && Number.isFinite(duration)
									? `${Math.min(100, (currentTime / duration) * 100)}%`
									: '0%'
						}}
					/>
					<input
						type="range"
						min={0}
						max={duration > 0 ? duration : 100}
						step={0.1}
						value={currentTime}
						onChange={handleSeek}
						onMouseDown={handleSeekStart}
						onMouseUp={handleSeekEnd}
						onTouchStart={handleSeekStart}
						onTouchEnd={handleSeekEnd}
						className="[&::-webkit-slider-thumb]:bg-brand absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full bg-transparent [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-webkit-slider-thumb]:block [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
						aria-label="Seek"
					/>
				</div>

				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={togglePlay}
							className="text-white transition hover:text-white/80"
							aria-label={isPlaying ? 'Pause' : 'Play'}
						>
							{isPlaying ? (
								<Pause className="h-5 w-5 fill-current" />
							) : (
								<Play className="h-5 w-5 fill-current" />
							)}
						</button>

						{/* Volume */}
						<div className="flex items-center gap-1">
							<button
								type="button"
								onClick={toggleMute}
								className="text-white transition hover:text-white/80"
								aria-label={isMuted ? 'Unmute' : 'Mute'}
							>
								{isMuted || volume === 0 ? (
									<VolumeX className="h-5 w-5" />
								) : (
									<Volume2 className="h-5 w-5" />
								)}
							</button>
							<div className="relative h-1 w-20 rounded-full bg-gray-600">
								<div
									className="absolute inset-y-0 left-0 rounded-l-full bg-white"
									style={{
										width: `${(isMuted ? 0 : volume) * 100}%`
									}}
								/>
								<input
									type="range"
									min={0}
									max={1}
									step={0.05}
									value={isMuted ? 0 : volume}
									onChange={handleVolumeChange}
									className="absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full bg-transparent [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-webkit-slider-thumb]:block [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
									aria-label="Volume"
								/>
							</div>
						</div>

						<span className="text-sm text-white/90">
							{formatTime(currentTime)} / {formatTime(duration)}
						</span>
					</div>

					<button
						type="button"
						onClick={toggleFullscreen}
						className="text-white transition hover:text-white/80"
						aria-label="Fullscreen"
					>
						<Maximize className="h-5 w-5" />
					</button>
				</div>
			</div>
		</div>
	);
}
