import { ProfileForm } from "@/components/organisms/ProfileForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Về trang chủ
      </Link>
      <h1 className="text-3xl font-bold mb-8">Cài đặt tài khoản</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <nav className="flex flex-col gap-2">
            <a href="/account" className="font-semibold text-primary hover:underline">
              Profile
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Security
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Payments
            </a>
             <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Notifications
            </a>
          </nav>
        </aside>
        <div className="lg:col-span-3">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
