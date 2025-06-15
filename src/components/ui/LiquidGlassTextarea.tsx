
import React from "react";
import { cn } from "@/lib/utils";

export interface LiquidGlassTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

const LiquidGlassTextarea = React.forwardRef<HTMLTextAreaElement, LiquidGlassTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-1 font-semibold text-[rgb(77,89,119)] dark:text-[rgb(155,174,205)] transition-colors">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full min-h-[90px] resize-y rounded-xl px-3 py-2 bg-white dark:bg-gray-900/70 bg-opacity-80 dark:bg-opacity-70 border border-[rgba(42,210,172,0.55)] shadow focus:ring-2 focus:ring-cyan-300 dark:focus:ring-emerald-600 text-gray-700 dark:text-cyan-100 transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-cyan-300 font-medium backdrop-blur-lg animate-fade-in",
            error && "border-red-400 focus:ring-red-300",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 mt-1 block">{error}</span>
        )}
      </div>
    );
  }
);
LiquidGlassTextarea.displayName = "LiquidGlassTextarea";

export default LiquidGlassTextarea;
