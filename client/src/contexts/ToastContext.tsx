import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type ToastVariant = "success" | "error";

type ToastItem = {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  toast: (input: { title: string; description?: string; variant?: ToastVariant }) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, variant = "success" }: { title: string; description?: string; variant?: ToastVariant }) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((current) => [...current, { id, title, description, variant }]);
      window.setTimeout(() => removeToast(id), 3000);
    },
    [removeToast]
  );

  const value = useMemo<ToastContextValue>(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-6 top-6 z-[100] flex w-full max-w-sm flex-col gap-3">
        {toasts.map((item) => (
          <div
            key={item.id}
            className={[
              "pointer-events-auto rounded-2xl border px-4 py-3 shadow-xl backdrop-blur",
              item.variant === "success"
                ? "border-emerald-200 bg-white/95 text-slate-900"
                : "border-rose-200 bg-white/95 text-slate-900"
            ].join(" ")}
          >
            <div className="flex items-start gap-3">
              <div
                className={[
                  "mt-0.5 size-2.5 shrink-0 rounded-full",
                  item.variant === "success" ? "bg-emerald-500" : "bg-rose-500"
                ].join(" ")}
              />
              <div className="space-y-1">
                <p className="text-sm font-semibold">{item.title}</p>
                {item.description ? <p className="text-sm leading-6 text-slate-500">{item.description}</p> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast phải được dùng trong ToastProvider.");
  }

  return context;
}
