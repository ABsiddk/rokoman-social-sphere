
import React from "react";
import styles from "./LiquidGlassSiennaButton.module.css";

interface LiquidGlassSiennaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const LiquidGlassSiennaButton = React.forwardRef<HTMLButtonElement, LiquidGlassSiennaButtonProps>(
  ({ className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      className={`
        ${styles.liquidGlassSiennaButton}
        px-5 py-3 rounded-xl 
        font-semibold
        text-base 
        shadow-md 
        focus:outline-none
        transition-all duration-200
        animate-fade-in
        hover:scale-105 
        active:scale-100
        backdrop-blur-sm 
        ${className}
      `}
      {...props}
    >
      <span className={styles.liquidGlassSiennaButtonContent}>{children}</span>
    </button>
  )
);

LiquidGlassSiennaButton.displayName = "LiquidGlassSiennaButton";
export default LiquidGlassSiennaButton;
