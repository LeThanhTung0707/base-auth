"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserService, Session } from "@/services/user.service";
import { Loader2, Monitor, Smartphone, Tablet, Trash2, LogOut } from "lucide-react";

// ── Helpers ──────────────────────────────────────────────

function parseDevice(ua: string | null) {
  if (!ua) return { icon: Monitor, label: "Thiết bị không xác định" };
  const lower = ua.toLowerCase();
  if (/iphone|android.*mobile|mobile/i.test(lower))
    return { icon: Smartphone, label: "Điện thoại di động" };
  if (/ipad|tablet/i.test(lower))
    return { icon: Tablet, label: "Máy tính bảng" };
  return { icon: Monitor, label: "Máy tính" };
}

function parseBrowser(ua: string | null) {
  if (!ua) return "Trình duyệt không xác định";
  if (/edg\//i.test(ua)) return "Microsoft Edge";
  if (/chrome/i.test(ua)) return "Google Chrome";
  if (/firefox/i.test(ua)) return "Mozilla Firefox";
  if (/safari/i.test(ua)) return "Safari";
  return "Trình duyệt khác";
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(iso));
}

// ── Change Password Card ──────────────────────────────────

function ChangePasswordCard() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới không khớp!");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }
    setSaving(true);
    try {
      await UserService.changePassword(currentPassword, newPassword);
      toast.success("Đổi mật khẩu thành công!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Đổi mật khẩu thất bại");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đổi mật khẩu</CardTitle>
        <CardDescription>Cập nhật mật khẩu để bảo vệ tài khoản.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div className="space-y-1">
            <label className="text-sm font-medium">Mật khẩu hiện tại</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Mật khẩu mới</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Xác nhận mật khẩu mới</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Đang lưu...</> : "Đổi mật khẩu"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// ── Sessions Card ─────────────────────────────────────────

function SessionsCard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [revokingAll, setRevokingAll] = useState(false);

  const fetchSessions = useCallback(async () => {
    try {
      const data = await UserService.getSessions();
      setSessions(data);
    } catch {
      toast.error("Không thể tải danh sách phiên đăng nhập");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSessions(); }, [fetchSessions]);

  const handleRevoke = async (id: string) => {
    setRevokingId(id);
    try {
      await UserService.revokeSession(id);
      setSessions(prev => prev.filter(s => s.id !== id));
      toast.success("Đã đăng xuất phiên này");
    } catch {
      toast.error("Không thể đăng xuất phiên này");
    } finally {
      setRevokingId(null);
    }
  };

  const handleRevokeAll = async () => {
    setRevokingAll(true);
    try {
      await UserService.revokeOtherSessions();
      await fetchSessions(); // refresh list
      toast.success("Đã đăng xuất tất cả thiết bị khác");
    } catch {
      toast.error("Không thể đăng xuất tất cả");
    } finally {
      setRevokingAll(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
        <div>
          <CardTitle>Nơi bạn đã đăng nhập</CardTitle>
          <CardDescription className="mt-1">
            Danh sách các thiết bị có phiên đăng nhập đang hoạt động.
          </CardDescription>
        </div>
        {sessions.length > 1 && (
          <Button
            variant="outline"
            size="sm"
            className="text-destructive border-destructive hover:bg-destructive/10"
            onClick={handleRevokeAll}
            disabled={revokingAll}
          >
            {revokingAll ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <LogOut className="w-3 h-3 mr-1" />}
            Đăng xuất thiết bị khác
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground py-4">
            <Loader2 className="w-4 h-4 animate-spin" /> Đang tải...
          </div>
        ) : sessions.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">Không có phiên đăng nhập nào.</p>
        ) : (
          <div className="space-y-3">
            {sessions.map((session, i) => {
              const { icon: DeviceIcon, label: deviceLabel } = parseDevice(session.userAgent);
              const browser = parseBrowser(session.userAgent);
              return (
                <div key={session.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/40 transition-colors">
                  <DeviceIcon className="w-8 h-8 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium">{deviceLabel}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{browser}</span>
                      {i === 0 && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Phiên hiện tại</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 flex gap-2 flex-wrap">
                      {session.ip && <span>IP: {session.ip}</span>}
                      <span>Đăng nhập lúc: {formatDate(session.createdAt)}</span>
                    </div>
                  </div>
                  {i !== 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRevoke(session.id)}
                      disabled={revokingId === session.id}
                    >
                      {revokingId === session.id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <Trash2 className="w-4 h-4" />}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Main export ───────────────────────────────────────────

export function SecurityForm() {
  return (
    <div className="space-y-6">
      <ChangePasswordCard />
      <SessionsCard />
    </div>
  );
}
