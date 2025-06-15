
import React, { useRef, useLayoutEffect, useState } from "react";
import styles from "./LiquidGlassInput.module.css";

interface LiquidGlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const LiquidGlassInput = React.forwardRef<HTMLInputElement, LiquidGlassInputProps>(
  ({ className = "", style, error, ...props }, ref) => {
    const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);
    const spanRef = useRef<HTMLSpanElement | null>(null);

    // Only auto-size for type text or date and when no explicit width style or class
    const autoSize = !style?.width && !className?.includes("w-");
    const relevantType = !props.type || props.type === "text" || props.type === "date";

    useLayoutEffect(() => {
      if (autoSize && relevantType && props.placeholder && spanRef.current) {
        // Add an extra character for caret space
        const valueForWidth =
          (props.value && typeof props.value === "string"
            ? props.value
            : props.placeholder) + " ";
        spanRef.current.textContent = valueForWidth;
        const measured = spanRef.current.offsetWidth;

        // Set clamp between 74px and 98vw/330px
        const min = 74;
        const max = Math.min(window.innerWidth * 0.98, 330);
        setInputWidth(Math.max(min, Math.min(measured + 12, max))); // +12 for icon/padding fudge
      }
    }, [props.placeholder, props.value, autoSize, relevantType]);

    return (
      <div
        className={styles.liquidGlassInputContainer}
        style={{
          position: "relative",
          width: autoSize && relevantType && inputWidth ? inputWidth : undefined,
          minWidth: autoSize && relevantType ? 74 : undefined,
          ...style,
        }}
      >
        <input
          ref={ref}
          className={`${styles.liquidGlassInput} ${className} ${error ? "border-red-500" : ""}`}
          style={{
            width:
              autoSize && relevantType && inputWidth
                ? inputWidth
                : style?.width,
            minWidth: autoSize && relevantType ? 74 : undefined,
            maxWidth: 330,
            transition: "width 0.27s cubic-bezier(.61,.14,.55,.5)",
            ...style,
          }}
          {...props}
        />
        <span className={styles.liquidGlassShine} />
        {/* Hidden span used for measuring width, not visible to users */}
        <span
          ref={spanRef}
          style={{
            position: "absolute",
            top: "-200%",
            left: 0,
            fontWeight: 500,
            fontSize: "1rem",
            letterSpacing: "inherit",
            whiteSpace: "pre",
            visibility: "hidden",
            pointerEvents: "none",
            padding: "0 1rem",
            fontFamily: "inherit",
          }}
          aria-hidden
        ></span>
        {error && (
          <span className="mt-1 text-red-600 text-xs font-semibold">{error}</span>
        )}
      </div>
    );
  }
);

LiquidGlassInput.displayName = "LiquidGlassInput";
export default LiquidGlassInput;

