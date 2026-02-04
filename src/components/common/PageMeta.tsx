import { Helmet } from 'react-helmet-async'

interface PageMetaProps {
	isSmallTitle?: boolean
	title: string
	description: string
	noIndex?: boolean
}

export default function PageMeta({
	isSmallTitle,
	title,
	description,
	noIndex
}: PageMetaProps) {
	return (
		<Helmet>
			<title>{isSmallTitle ? title : `${title} | Brian Acebo`}</title>
			<meta
				name="description"
				content={description}
			/>
			{noIndex && (
				<meta
					name="robots"
					content="noindex, nofollow, noarchive"
				/>
			)}
		</Helmet>
	)
}
