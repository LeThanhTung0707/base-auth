import { Clock } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-4">
      <Clock className="w-12 h-12 opacity-40" />
      <h2 className="text-2xl font-semibold">Sắp ra mắt</h2>
      <p className="text-sm max-w-xs">
        Tính năng quản lý thông báo đang được phát triển. Hãy quay lại sau nhé!
      </p>
    </div>
  );
}
