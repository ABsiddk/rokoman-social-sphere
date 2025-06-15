
import React from "react";
import styles from "../registration/phone-password/LiquidGlassButton.module.css";

interface LiquidGlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const LiquidGlassButton = React.forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(
  ({ className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      className={`
        ${styles.liquidGlassButton}
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
      <span className={styles.liquidGlassButtonContent}>{children}</span>
    </button>
  )
);

LiquidGlassButton.displayName = "LiquidGlassButton";
export default LiquidGlassButton;
