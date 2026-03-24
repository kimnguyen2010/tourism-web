import { cn } from "../../../lib/utils";
import type { ChatMessage } from "../types/chat.types";

type ChatMessagesProps = {
  messages: ChatMessage[];
  loading: boolean;
};

export function ChatMessages({ messages, loading }: ChatMessagesProps) {
  return (
    <div className="space-y-3 pb-4">
      {messages.map((message, index) => (
        <article
          key={`${message.role}-${index}`}
          className={cn(
            "rounded-[22px] px-4 py-3 text-sm shadow-sm",
            message.role === "assistant"
              ? "mr-10 rounded-tl-md bg-slate-100 text-slate-700"
              : "ml-10 rounded-tr-md bg-sky-900 text-white"
          )}
        >
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-60">
            {message.role === "assistant" ? "Bot" : "Bạn"}
          </p>
          <p className="whitespace-pre-wrap leading-6">{message.content}</p>
        </article>
      ))}
      {loading ? (
        <div className="mr-10 rounded-[22px] rounded-tl-md bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm">
          Bot đang soạn câu trả lời...
        </div>
      ) : null}
    </div>
  );
}
