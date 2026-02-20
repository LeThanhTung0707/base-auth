"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Owner {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

interface HostInfoProps {
  owner?: Owner | null;
}

export function HostInfo({ owner }: HostInfoProps) {
  const displayName = owner
    ? [owner.firstName, owner.lastName].filter(Boolean).join(" ") || owner.email
    : "Chủ nhà";

  const initials = owner
    ? ([owner.firstName, owner.lastName].filter(Boolean).map(s => s![0].toUpperCase()).join("") || owner.email[0].toUpperCase())
    : "?";

  return (
    <div className="py-6 border-b flex items-center justify-between">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Toàn bộ căn hộ. Chủ nhà {displayName}</h3>
        <p className="text-sm text-muted-foreground">
          2 khách · 1 phòng ngủ · 1 giường · 1 phòng tắm
        </p>
      </div>
      <Avatar className="w-12 h-12">
        <AvatarImage src={owner?.avatar || "/default-avatar.png"} alt={displayName} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
}
