export interface Notification {
	id: string;
	title: string;
	description: string;
	createdAt: string;
	read: boolean;
	source_id: number;
	source_type: string;
	source_image: string;
	source_slug: string;
}
