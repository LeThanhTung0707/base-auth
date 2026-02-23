import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';

const NOTIFICATION_WS_URL = process.env.NEXT_PUBLIC_NOTIFICATION_WS_URL || 'http://localhost:4003';

export function useNotificationSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const socketInstance = io(NOTIFICATION_WS_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    socketInstance.on('connect', () => {
      console.log('✅ Notification Socket Connected');
    });

    socketInstance.on('connected', (data) => {
      console.log('🔒 Socket Authenticated for user:', data.userId);
    });

    socketInstance.on('new_notification', (notification) => {
      console.log('🔔 Instant Notification Received:', notification);
      
      // Instantly invalidate the GET /notifications cache 
      // This will force React Query to immediately fetch the new data
      queryClient.invalidateQueries({ queryKey: ['notifications', user.id] });
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ Notification Socket Disconnected');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [user, queryClient]); // Re-evaluate when user logs in/out

  return socket;
}
