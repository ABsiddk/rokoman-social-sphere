
import React, { useRef, useLayoutEffect, useState } from "react";
import styles from "./LiquidGlassInput.module.css";

interface LiquidGlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const LiquidGlassInput = React.forwardRef<HTMLInputElement, LiquidGlassInputProps>(
  ({ className = "", style, error, ...props }, ref) => {
    const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);
    const spanRef = useRef<HTMLSpanElement | null>(null);

    // Auto-size only for text/date input and if user hasn’t set width already.
    const autoSize = !style?.width && !className?.includes("w-");
    const relevantType = !props.type || props.type === "text" || props.type === "date";

    useLayoutEffect(() => {
      if (autoSize && relevantType && spanRef.current) {
        // Set width to length of the greater of: current value or placeholder, plus minimal caret space
        let valueForWidth =
          typeof props.value === "string" && props.value.length > 0
            ? props.value
            : props.placeholder || "";
        // Single space at the end for caret
        spanRef.current.textContent = valueForWidth + " ";
        // Copy font styles from input for more accurate measurement
        const computed = window.getComputedStyle(spanRef.current);
        spanRef.current.style.fontFamily = computed.fontFamily || "inherit";
        spanRef.current.style.fontWeight = computed.fontWeight || "500";
        spanRef.current.style.fontSize = computed.fontSize || "1rem";
        spanRef.current.style.letterSpacing = computed.letterSpacing || "inherit";

        const measured = spanRef.current.offsetWidth;
        // Remove all max-width constraints, clamp only minimally (min 54px, max ~98vw for safety)
        const min = 54;
        const max = Math.min(window.innerWidth * 0.98, 600);
        setInputWidth(Math.max(min, Math.min(measured + 2, max))); // +2 for focus visual fudge
      }
    }, [props.placeholder, props.value, autoSize, relevantType]);

    return (
      <div
        className={styles.liquidGlassInputContainer}
        style={{
          width: autoSize && relevantType && inputWidth ? inputWidth : undefined,
          minWidth: autoSize && relevantType ? 54 : undefined,
          ...style,
        }}
      >
        <input
          ref={ref}
          className={`${styles.liquidGlassInput} ${className} ${error ? "border-red-500" : ""}`}
          style={{
            width: autoSize && relevantType && inputWidth ? inputWidth : style?.width,
            minWidth: autoSize && relevantType ? 54 : undefined,
            transition: "width 0.27s cubic-bezier(.61,.14,.55,.5)",
            ...style,
          }}
          {...props}
        />
        <span className={styles.liquidGlassShine} />
        {/* Hidden span for measuring width */}
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
            padding: "0 0.18rem",
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

