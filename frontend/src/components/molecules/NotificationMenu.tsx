"use client";

import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useAuthQuery } from "@/hooks/useAuthQuery";
import NotificationService, { Notification } from "@/services/notification.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationSocket } from "@/hooks/useNotificationSocket";

export function NotificationMenu() {
  const { data: user } = useAuthQuery();
  const queryClient = useQueryClient();
  
  // Activate WebSockets listener natively mapping onto React Query invalidations
  useNotificationSocket();

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: () => NotificationService.getNotifications(),
    enabled: !!user?.id,
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => NotificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', user?.id] });
    },
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 animate-pulse block" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
            {notifications.length === 0 ? (
                 <div className="p-4 text-center text-sm text-muted-foreground">
                    No new notifications
                 </div>
            ) : (
                notifications.map((notification) => (
                    <DropdownMenuItem
                        key={notification.id}
                        className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                        onClick={() => {
                          if (!notification.isRead) {
                            markAsReadMutation.mutate(notification.id);
                          }
                        }}
                    >
                        <div className="flex justify-between w-full">
                            <span className={`font-medium ${!notification.isRead ? "text-primary font-bold" : ""}`}>
                                {notification.title}
                            </span>
                            <span className="text-xs text-muted-foreground">{new Date(notification.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className={`text-sm line-clamp-2 ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                            {notification.message}
                        </p>
                    </DropdownMenuItem>
                ))
            )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-primary font-medium cursor-pointer">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
