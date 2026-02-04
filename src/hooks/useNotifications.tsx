import { useEffect, useState } from 'react';
import type { Notification } from '../types/notifications';
import { api } from '../utils/api';

export const useNotifications = () => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [notificationsLoading, setNotificationsLoading] = useState(false);

	const addNotification = (notification: Notification) => {
		setNotifications((prev) => [...prev, notification]);
	};

	const removeNotification = (id: string) => {
		setNotifications((prev) => prev.filter((notification) => notification.id !== id));
	};

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				setNotificationsLoading(true);
				const response = await api.get('/api/notifications');
				if (!response.ok) {
					throw new Error('Failed to fetch notifications');
				}
				const data = await response.json();
				setNotifications(data);
			} catch (error) {
				console.error(error);
			} finally {
				setNotificationsLoading(false);
			}
		};
		fetchNotifications();
	}, []);

	return {
		notifications,
		setNotifications,
		addNotification,
		removeNotification,
		notificationsLoading
	};
};
