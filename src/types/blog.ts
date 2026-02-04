export interface BlogPost {
	id: number;
	slug: string;
	title: string;
	excerpt: string;
	body: string;
	image: string;
	author: string;
	author_avatar: string;
	published_at: string;
	reading_time_minutes: number;
	tags: string[];
	featured: boolean;
	category_id: number;
}
