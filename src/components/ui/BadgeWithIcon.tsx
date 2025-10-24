import type { ReactNode } from "react";
import { Pin } from "lucide-react";
import { cn } from "./utils";
import { useTheme } from "../../context/ThemeContext";

interface BadgeWithIconProps {
  icon?: ReactNode;
  text: string;
  color?: string; // tailwind color (e.g. "yellow", "blue", etc.)
}

export function BadgeWithIcon({
  icon = <Pin className="w-4 h-4 text-pink-500" />,
  text,
  color = "yellow",
}: BadgeWithIconProps) {
  const { highContrast } = useTheme();

  // In high contrast mode, use consistent styling
  const bgColor = highContrast ? "bg-neutral-800" : `bg-${color}-50`;
  const borderColor = highContrast ? "border-white" : `border-${color}-400`;
  const textColor = highContrast ? "text-white" : "text-slate-800";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 border shadow-sm transition-all duration-200",
        bgColor,
        borderColor
      )}
    >
      {icon}
      <span className={cn("text-sm font-medium", textColor)}>{text}</span>
    </div>
  );
}