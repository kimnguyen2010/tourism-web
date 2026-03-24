import { Button } from "../../ui/button";

type QuickSuggestionsProps = {
  suggestions: readonly string[];
  onSelect: (value: string) => void;
};

export function QuickSuggestions({ suggestions, onSelect }: QuickSuggestionsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {suggestions.map((item) => (
        <Button key={item} variant="secondary" size="sm" className="rounded-full" onClick={() => onSelect(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
}

