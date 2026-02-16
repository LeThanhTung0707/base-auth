import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionLink?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ 
  title = "Không có dữ liệu", 
  description = "Hiện tại chưa có dữ liệu nào để hiển thị.",
  actionLabel, 
  actionLink,
  icon 
}: EmptyStateProps) {
  return (
    <div className="text-center py-20 bg-muted/10 rounded-lg border border-dashed text-muted-foreground flex flex-col items-center justify-center">
      {icon && <div className="mb-4 text-muted-foreground/50">{icon}</div>}
      <h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
      <p className="mb-6 text-sm max-w-sm mx-auto">{description}</p>
      
      {actionLabel && actionLink && (
        <Link href={actionLink}>
           <Button variant="outline">{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
