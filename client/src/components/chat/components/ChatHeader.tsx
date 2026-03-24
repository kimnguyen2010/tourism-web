import { X } from "lucide-react";
import { Button } from "../../ui/button";

type ChatHeaderProps = {
  onClose: () => void;
};

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-start justify-between border-b border-sky-100 bg-[linear-gradient(135deg,#0f766e_0%,#0f172a_100%)] px-5 py-4 text-white">
      <div>
        <p className="text-sm font-semibold">Tourism Assistant</p>
        <p className="mt-1 text-sm text-sky-100/85">Hỏi lịch trình, chi phí, địa điểm và mẹo đi chơi.</p>
      </div>
      <Button variant="ghost" size="icon" className="size-9 text-white hover:bg-white/10 hover:text-white" onClick={onClose}>
        <X className="size-5" />
      </Button>
    </div>
  );
}
