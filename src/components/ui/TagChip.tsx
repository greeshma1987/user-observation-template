import { useState } from "react";
import { Pin, X } from "lucide-react";
import { cn } from "./utils";
import { useTheme } from "../../context/ThemeContext";

interface TagChipProps {
  text: string;
  color?: "yellow" | "blue" | "green" | "pink" | "purple";
  editable?: boolean;
  onDelete?: () => void;
}

export function TagChip({
  text,
  color = "yellow",
  editable = true,
  onDelete,
}: TagChipProps) {
  const { highContrast } = useTheme();
  const [label, setLabel] = useState(text);
  const [isPinned, setIsPinned] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Explicit color map (no dynamic tailwind)
  const colorMap = {
    yellow: "bg-yellow-50 border-yellow-300 text-slate-800 focus-within:ring-yellow-400",
    blue: "bg-blue-50 border-blue-300 text-blue-800 focus-within:ring-blue-400",
    green: "bg-green-50 border-green-300 text-green-800 focus-within:ring-green-400",
    pink: "bg-pink-50 border-pink-300 text-pink-800 focus-within:ring-pink-400",
    purple: "bg-purple-50 border-purple-300 text-purple-800 focus-within:ring-purple-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-[5px] border shadow-sm",
        "transition-all duration-200 select-none group cursor-pointer",
        "hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        "focus-within:ring-2 focus-within:ring-offset-2",
        highContrast
          ? "bg-neutral-900 border-white/80 text-white focus-within:ring-white"
          : colorMap[color]
      )}
      tabIndex={0}
      role="button"
    >
      {/* Pin toggle */}
      <span
        className="relative top-[1px] flex items-center"
        onClick={(e) => {
          e.stopPropagation();
          setIsPinned(!isPinned);
        }}
      >
        <Pin
          className={cn(
            "w-4 h-4 transition-transform cursor-pointer shrink-0",
            isPinned
              ? "rotate-45 text-pink-500"
              : highContrast
              ? "text-slate-300 group-hover:text-pink-400"
              : "text-slate-400 group-hover:text-pink-400"
          )}
          aria-label={isPinned ? "Unpin tag" : "Pin tag"}
        />
      </span>

      {/* Editable text */}
      {isEditing ? (
        <input
          type="text"
          value={label}
          autoFocus
          onBlur={() => setIsEditing(false)}
          onChange={(e) => setLabel(e.target.value)}
          className={cn(
            "border-none outline-none text-sm font-medium w-auto min-w-[40px] leading-none bg-transparent",
            highContrast ? "text-white" : "text-slate-800"
          )}
          aria-label="Edit tag label"
        />
      ) : (
        <span
          className={cn(
            "text-sm font-medium truncate leading-none cursor-text",
            highContrast ? "text-white" : "text-slate-800"
          )}
          onDoubleClick={() => editable && setIsEditing(true)}
        >
          {label}
        </span>
      )}

      {/* Delete icon */}
      {onDelete && (
        <X
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className={cn(
            "w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 cursor-pointer",
            highContrast
              ? "text-slate-300 hover:text-red-400"
              : "text-slate-400 hover:text-red-500"
          )}
          aria-label="Delete tag"
        />
      )}
    </div>
  );
}
