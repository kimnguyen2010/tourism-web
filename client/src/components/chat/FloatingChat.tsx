import { Bot, X } from "lucide-react";
import { useState, type ComponentProps } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { QUICK_SUGGESTIONS } from "./constants/chat.constants";
import { ChatComposer } from "./components/ChatComposer";
import { ChatHeader } from "./components/ChatHeader";
import { ChatMessages } from "./components/ChatMessages";
import { QuickSuggestions } from "./components/QuickSuggestions";
import { useFloatingChatLayout } from "./hooks/useFloatingChatLayout";
import { useTourismChat } from "./hooks/useTourismChat";

export function FloatingChat() {
  const [open, setOpen] = useState<boolean>(true);
  const { messages, input, loading, error, setInput, submitMessage } = useTourismChat();
  const { panelHeight, panelWidth, inset } = useFloatingChatLayout();

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event?.preventDefault();
    void submitMessage(input);
  };

  return (
    <div className="fixed z-50 flex flex-col items-end gap-3" style={{ bottom: inset, right: inset }}>
      {open ? (
        <Card className="flex flex-col overflow-hidden border-sky-100/80 dark:border-slate-700/80" style={{ width: panelWidth, height: panelHeight }}>
          <ChatHeader onClose={() => setOpen(false)} />

          <div className="flex min-h-0 flex-1 flex-col px-5 py-4">
            <ScrollArea className="min-h-0 flex-1 pr-1">
              <ChatMessages messages={messages} loading={loading} />
            </ScrollArea>

            <div className="mt-3 space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
              <QuickSuggestions suggestions={QUICK_SUGGESTIONS} onSelect={(value) => void submitMessage(value)} />
              <ChatComposer input={input} loading={loading} error={error} onChange={setInput} onSubmit={handleSubmit} />
            </div>
          </div>
        </Card>
      ) : null}

      <Button
        size="icon"
        className="size-16 rounded-full bg-sky-900 shadow-2xl shadow-sky-950/25 hover:bg-sky-950 dark:bg-sky-400 dark:text-slate-950 dark:shadow-black/30 dark:hover:bg-sky-300"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-7" /> : <Bot className="size-7" />}
      </Button>
    </div>
  );
}
