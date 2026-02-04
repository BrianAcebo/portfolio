/* 
	Made this wrapper because stupid eslint is complaining about the fetchpriority prop.
	Rather than having the disable lint comment everywhere, I just made this wrapper.
*/

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	alt: string;
	width: number;
	height: number;
	className?: string;
	loading?: 'lazy' | 'eager';
	decoding?: 'async' | 'sync';
	fetchPriority?: 'high' | 'low';
}

export default function Image({
	src,
	alt,
	width,
	height,
	className,
	loading = 'lazy',
	decoding = 'async',
	fetchPriority = 'low',
	...props
}: ImageProps) {
	return (
		<img
			src={src}
			alt={alt}
			width={width}
			height={height}
			className={className}
			loading={loading}
			decoding={decoding}
			/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
			// @ts-ignore
			fetchpriority={fetchPriority}
			{...props}
		/>
	);
}
