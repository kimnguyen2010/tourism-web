import { Eye, EyeOff } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { ROUTE_PATHS } from "../routes/paths";

type Mode = "login" | "register";

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, register, loading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const title = useMemo(() => (mode === "login" ? "Đăng nhập để chat" : "Tạo tài khoản mới"), [mode]);

  if (isAuthenticated && !loading) {
    navigate(ROUTE_PATHS.home, { replace: true });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (mode === "login") {
        await login({ email, password });
        toast({
          title: "Đăng nhập thành công",
          description: "Bạn có thể bắt đầu trò chuyện với trợ lý du lịch ngay bây giờ."
        });
        navigate(ROUTE_PATHS.home, { replace: true });
      } else {
        await register({ name, email, password });
        toast({
          title: "Tạo tài khoản thành công",
          description: "Bạn hãy đăng nhập để bắt đầu sử dụng tài khoản mới."
        });
        setMode("login");
        setName("");
        setPassword("");
        setShowPassword(false);
      }
    } catch (authError) {
      const message = authError instanceof Error ? authError.message : "Có lỗi xảy ra.";
      setError(message);
      toast({
        title: mode === "login" ? "Đăng nhập thất bại" : "Đăng ký thất bại",
        description: message,
        variant: "error"
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#fff7ed_0%,#f8fbff_50%,#ecfeff_100%)] px-6 py-12 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_55%,#082f49_100%)]">
      <Card className="w-full max-w-md border-slate-200/80 bg-white/90 dark:border-slate-800/80 dark:bg-slate-900/85">
        <CardHeader className="space-y-5">
          <Badge className="w-fit bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950/60 dark:text-sky-200 dark:ring-sky-800">Tài khoản</Badge>
          <div className="space-y-2">
            <CardTitle className="text-3xl">{title}</CardTitle>
            <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">Dùng tài khoản để trò chuyện với trợ lý du lịch và giữ phiên đăng nhập ổn định.</p>
          </div>
          <div className="flex rounded-full bg-slate-100 p-1 dark:bg-slate-800">
            <Button variant={mode === "login" ? "default" : "ghost"} className="flex-1 rounded-full" onClick={() => setMode("login")}>Đăng nhập</Button>
            <Button variant={mode === "register" ? "default" : "ghost"} className="flex-1 rounded-full" onClick={() => setMode("register")}>Đăng ký</Button>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 pb-2">
            {mode === "register" ? (
              <div className="space-y-2.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Họ và tên</label>
                <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nguyễn Văn A" />
              </div>
            ) : null}
            <div className="space-y-2.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
              <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ban@example.com" />
            </div>
            <div className="space-y-2.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Mật khẩu</label>
              <div className="flex items-center rounded-md border border-slate-200 bg-white pr-2 shadow-sm dark:border-slate-700 dark:bg-slate-950/70">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="border-0 shadow-none focus-visible:ring-0"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-9 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>
            </div>
            {error ? <p className="pt-1 text-sm text-rose-600 dark:text-rose-400">{error}</p> : null}
          </CardContent>
          <CardFooter className="mt-4 flex-col items-stretch gap-4 pt-2">
            <Button type="submit" className="w-full rounded-full" disabled={submitting || loading}>
              {submitting ? "Đang xử lý..." : mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
            </Button>
            <Button variant="ghost" className="w-full rounded-full" onClick={() => navigate(ROUTE_PATHS.home)}>
              Quay về trang chủ
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
