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

// Mock data for notifications
const notifications = [
  {
    id: 1,
    title: "Welcome to ThanhTung-AllInOne!",
    description: "Start exploring amazing places to stay.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Profile Update",
    description: "Your profile was successfully updated.",
    time: "1 day ago",
    read: true,
  },
  {
      id: 3,
      title: "New feature!",
      description: "Check out our new Food experiences.",
      time: "2 days ago",
      read: true
  }
];

export function NotificationMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          {/* Unread indicator mockup */}
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 animate-pulse block" />
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
                    >
                        <div className="flex justify-between w-full">
                            <span className={`font-medium ${!notification.read ? "text-primary" : ""}`}>
                                {notification.title}
                            </span>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {notification.description}
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
