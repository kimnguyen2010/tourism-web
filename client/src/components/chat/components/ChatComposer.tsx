import type { ComponentProps } from "react";
import { SendHorizonal } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

type ChatComposerProps = {
  input: string;
  loading: boolean;
  error: string;
  onChange: (value: string) => void;
  onSubmit: ComponentProps<"form">["onSubmit"];
};

export function ChatComposer({ input, loading, error, onChange, onSubmit }: ChatComposerProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 p-1.5 shadow-sm">
        <Input
          type="text"
          value={input}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Nhập tin nhắn..."
          className="h-8 border-0 bg-transparent px-2 shadow-none focus-visible:ring-0"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="size-8 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
          disabled={loading}
        >
          <SendHorizonal className="size-4" />
        </Button>
      </div>
      {error ? <div className="text-xs text-rose-600">{error}</div> : null}
    </form>
  );
}
