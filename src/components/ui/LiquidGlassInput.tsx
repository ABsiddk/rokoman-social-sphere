
import React, { useRef, useLayoutEffect, useState } from "react";
import styles from "./LiquidGlassInput.module.css";

interface LiquidGlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const isMobile = () =>
  typeof window !== "undefined" &&
  (window.innerWidth <= 600 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

// Detect Bengali/Bangla or CJK scripts for width adjustment
const isWideScript = (text: string = "") =>
  /[\u0980-\u09FF\u0900-\u097F\u3040-\u30FF\u4E00-\u9FFF]/.test(text);

const LiquidGlassInput = React.forwardRef<HTMLInputElement, LiquidGlassInputProps>(
  ({ className = "", style, error, ...props }, ref) => {
    const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);
    const spanRef = useRef<HTMLSpanElement | null>(null);

    // Language or script of placeholder/value detected
    const lang = (
      typeof props.value === "string" && isWideScript(props.value)
    ) || (typeof props.placeholder === "string" && isWideScript(props.placeholder))
      ? "bn"
      : "en";

    // Auto-size for text/date inputs unless user set width
    const autoSize = !style?.width && !className?.includes("w-");
    const relevantType = !props.type || props.type === "text" || props.type === "date";
    // For BCS batch/date fields, always enable
    const autowidthForce = (props.id === "bcsSession" || props.type === "date");

    useLayoutEffect(() => {
      if ((autoSize && relevantType) || autowidthForce) {
        if (!spanRef.current) return;
        const isMobileNow = isMobile();

        // Use value or placeholder for width measurement
        let valueForWidth: string =
          typeof props.value === "string" && props.value.length > 0
            ? props.value
            : props.placeholder || "";
        // Add one space for caret room
        spanRef.current.textContent = valueForWidth + " ";

        // Font size adjust for script and device
        let fontSize = isMobileNow ? (lang === 'bn' ? "1rem" : "0.95rem") : "1rem";

        spanRef.current.style.fontFamily = "inherit";
        spanRef.current.style.letterSpacing = "inherit";
        spanRef.current.style.fontWeight = "500";
        spanRef.current.style.fontSize = fontSize;

        // Use minimal padding for mobile (0.6rem), standard for desktop, extra for wide scripts
        const pxPad = isMobileNow
          ? (lang === 'bn' ? 11 : 9.6)
          : (lang === 'bn' ? 18 : 16);

        const min = isMobileNow ? 48 : 54;

        // Calculate available grid width for start/end date
        // Subtract 40px for padding, 8px for gap, divide by 2 for side-by-side
        let max = 600;
        if (isMobileNow && (props.type === "date" || props.id === "bcsSession")) {
          max = Math.max(
            Math.floor((window.innerWidth - 40 - 8) / 2), // 40px = px-4*2, 8px = gap-2
            70
          );
        }

        let measured = Math.ceil(spanRef.current.offsetWidth + pxPad * 2);
        setInputWidth(Math.max(min, Math.min(measured, max)));
      }
    }, [props.placeholder, props.value, autoSize, relevantType, lang, autowidthForce]);

    return (
      <div
        className={styles.liquidGlassInputContainer}
        style={{
          width: ((autoSize && relevantType) || autowidthForce) && inputWidth ? inputWidth : undefined,
          minWidth: ((autoSize && relevantType) || autowidthForce) ? (isMobile() ? 48 : 54) : undefined,
          ...style,
        }}
      >
        <input
          ref={ref}
          className={`${styles.liquidGlassInput} ${className} ${error ? "border-red-500" : ""}`}
          style={{
            width: ((autoSize && relevantType) || autowidthForce) && inputWidth ? inputWidth : style?.width,
            minWidth: ((autoSize && relevantType) || autowidthForce) ? (isMobile() ? 48 : 54) : undefined,
            transition: "width 0.27s cubic-bezier(.61,.14,.55,.5)",
            fontSize: isMobile() ? (lang === 'bn' ? "1rem" : "0.95rem") : "1rem",
            padding: isMobile() ? (lang === 'bn' ? "0 0.7rem" : "0 0.6rem") : (lang === 'bn' ? "0 1.1rem" : "0 1rem"),
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
            fontSize: isMobile() ? (lang === 'bn' ? "1rem" : "0.95rem") : "1rem",
            letterSpacing: "inherit",
            whiteSpace: "pre",
            visibility: "hidden",
            pointerEvents: "none",
            padding: isMobile() ? (lang === 'bn' ? "0 0.7rem" : "0 0.6rem") : (lang === 'bn' ? "0 1.1rem" : "0 1rem"),
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
