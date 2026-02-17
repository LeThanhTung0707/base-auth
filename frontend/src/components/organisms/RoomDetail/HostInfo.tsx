import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HostInfoProps {
  ownerId: string; // In real app, we fetch user info by this ID
  hostName?: string;
}

export function HostInfo({ hostName = "Chủ nhà siêu cấp" }: HostInfoProps) {
  return (
    <div className="py-6 border-b flex items-center justify-between">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Toàn bộ căn hộ. Chủ nhà {hostName}</h3>
        <p className="text-sm text-muted-foreground">
          2 khách · 1 phòng ngủ · 1 giường · 1 phòng tắm
        </p>
      </div>
      <Avatar className="w-12 h-12">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
