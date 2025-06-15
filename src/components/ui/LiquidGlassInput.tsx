
import React from "react";
import styles from "./LiquidGlassInput.module.css";

interface LiquidGlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const LiquidGlassInput = React.forwardRef<HTMLInputElement, LiquidGlassInputProps>(
  ({ className = "", style, error, ...props }, ref) => {
    return (
      <div className={styles.liquidGlassInputContainer} style={{ position: "relative" }}>
        <input
          ref={ref}
          className={`${styles.liquidGlassInput} ${className} ${error ? "border-red-500" : ""}`}
          style={style}
          {...props}
        />
        <span className={styles.liquidGlassShine} />
        {error && (
          <span className="mt-1 text-red-600 text-xs font-semibold">{error}</span>
        )}
      </div>
    );
  }
);

LiquidGlassInput.displayName = "LiquidGlassInput";
export default LiquidGlassInput;
