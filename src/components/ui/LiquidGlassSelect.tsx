
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "./select";
import { cn } from "../../lib/utils";

interface Option {
  value: string;
  label: string;
}

interface LiquidGlassSelectProps {
  value: string;
  onValueChange: (val: string) => void;
  options: Option[];
  placeholder: string;
  id?: string;
  className?: string;
  error?: string;
}

const gradient =
  "bg-gradient-to-br from-white via-stone-100 to-blue-50 dark:from-[rgb(55,65,81)] dark:via-gray-700 dark:to-[#393e56] border-none text-gray-900 dark:text-white";
const hoverGradient =
  "hover:from-blue-100 hover:to-sky-200 dark:hover:from-[#47506E] dark:hover:via-[#29598E] dark:hover:to-[#29383A]";
const optionHover =
  "data-[state=checked]:bg-emerald-600/70 data-[state=checked]:text-white hover:bg-emerald-500/10 hover:text-emerald-900 dark:hover:text-emerald-300";

const LiquidGlassSelect: React.FC<LiquidGlassSelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder,
  id,
  className,
  error,
}) => (
  <Select value={value} onValueChange={onValueChange}>
    <SelectTrigger
      id={id}
      className={cn(
        "w-full text-base rounded-xl shadow-md border border-gray-300 dark:border-gray-700 px-3 py-2 transition focus:ring-2 focus:ring-emerald-600",
        "backdrop-blur-xl",
        gradient,
        hoverGradient,
        className,
        error ? "border-red-500" : "",
        "animate-fade-in"
      )}
    >
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent className={cn("rounded-xl shadow-2xl mt-2 p-1 border-none !bg-white/90 dark:!bg-[rgb(55,65,81)] dark:text-white z-[1000]")}>
      {options.map(opt => (
        <SelectItem
          key={opt.value}
          value={opt.value}
          className={cn(
            "rounded-md px-3 py-2 m-1 transition duration-200",
            optionHover
          )}
        >
          {opt.label}
        </SelectItem>
      ))}
    </SelectContent>
    {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
  </Select>
);

export default LiquidGlassSelect;
