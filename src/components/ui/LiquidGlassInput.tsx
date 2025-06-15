
import React, { useRef, useLayoutEffect, useState } from "react";
import styles from "./LiquidGlassInput.module.css";

interface LiquidGlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const isMobile = () =>
  typeof window !== "undefined" &&
  (window.innerWidth <= 600 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

const LiquidGlassInput = React.forwardRef<HTMLInputElement, LiquidGlassInputProps>(
  ({ className = "", style, error, ...props }, ref) => {
    const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);
    const spanRef = useRef<HTMLSpanElement | null>(null);

    // Auto-size only for text/date input and if user hasn’t set width already.
    const autoSize = !style?.width && !className?.includes("w-");
    const relevantType = !props.type || props.type === "text" || props.type === "date";

    useLayoutEffect(() => {
      if (autoSize && relevantType && spanRef.current) {
        const isMobileNow = isMobile();

        let valueForWidth =
          typeof props.value === "string" && props.value.length > 0
            ? props.value
            : props.placeholder || "";
        // Add one space at the end for caret
        spanRef.current.textContent = valueForWidth + " ";

        // Font sizing and padding: match mobile/desktop
        spanRef.current.style.fontFamily = "inherit";
        spanRef.current.style.letterSpacing = "inherit";
        spanRef.current.style.fontWeight = "500";
        spanRef.current.style.fontSize = isMobileNow ? "0.95rem" : "1rem";
        // Padding must match input padding in px (1rem=16px, 0.95rem~15.2px)
        const pxPad = isMobileNow ? 9.6 : 16;
        // Add both left+right padding (x2)
        const min = isMobileNow ? 48 : 54;
        // For side-by-side grid, subtract grid gap (gap-2 = 8px)
        const formOuterPad = isMobileNow ? 20 : 0; // container px-4 => 16px, let's use 20px for safety

        let measured = spanRef.current.offsetWidth + pxPad * 2;
        // On mobile, cap so two fit side-by-side
        let max = isMobileNow
          ? Math.max(
              Math.floor((window.innerWidth - formOuterPad * 2 - 8) / 2), // 8px grid gap for gap-2
              70 // never get smaller than this, but allow long Bangla placeholder!
            )
          : 600;
        setInputWidth(Math.max(min, Math.min(measured, max)));
      }
    }, [props.placeholder, props.value, autoSize, relevantType]);

    return (
      <div
        className={styles.liquidGlassInputContainer}
        style={{
          width: autoSize && relevantType && inputWidth ? inputWidth : undefined,
          minWidth: autoSize && relevantType ? (isMobile() ? 48 : 54) : undefined,
          ...style,
        }}
      >
        <input
          ref={ref}
          className={`${styles.liquidGlassInput} ${className} ${error ? "border-red-500" : ""}`}
          style={{
            width: autoSize && relevantType && inputWidth ? inputWidth : style?.width,
            minWidth: autoSize && relevantType ? (isMobile() ? 48 : 54) : undefined,
            transition: "width 0.27s cubic-bezier(.61,.14,.55,.5)",
            fontSize: isMobile() ? "0.95rem" : "1rem",
            padding: isMobile() ? "0 0.6rem" : "0 1rem",
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
            fontSize: isMobile() ? "0.95rem" : "1rem",
            letterSpacing: "inherit",
            whiteSpace: "pre",
            visibility: "hidden",
            pointerEvents: "none",
            padding: isMobile() ? "0 0.6rem" : "0 1rem",
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

