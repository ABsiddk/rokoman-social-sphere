
import React, { useState, useMemo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import styles from "./LiquidGlassInput.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

// Props:
// label: string
// placeholder: string
// suggestions: Array<{ en: string; bn: string; }>
// value: string
// onChange: (val: string) => void
// autoComplete?: string
// error?: string
// id?: string
// className?: string
// style?: React.CSSProperties

type Suggestion = { en: string; bn: string; };

interface SearchableInputProps {
  label: string;
  placeholder?: string;
  suggestions: Suggestion[];
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  error?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  maxLength?: number;
}

const SearchableInput: React.FC<SearchableInputProps> = ({
  label,
  placeholder,
  suggestions,
  value,
  onChange,
  autoComplete,
  error,
  id,
  className,
  style,
  maxLength = 40,
}) => {
  const { language } = useLanguage();
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync prop value & inputValue
  useEffect(() => {
    setInputValue(value);
  }, [value, language]);

  // Prepare filtered suggestions
  const filteredSuggestions = useMemo(() => {
    const userEntry = inputValue.trim().toLowerCase();
    return suggestions.filter(s =>
      (s[language] || s.en).toLowerCase().includes(userEntry)
    );
  }, [inputValue, suggestions, language]);
  
  // Handle selection
  function handleSelect(sugg: Suggestion) {
    setInputValue(sugg[language] || sugg.en);
    onChange(sugg[language] || sugg.en);
    setShowDropdown(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
  }

  // Allow keyboard navigation and Enter to select
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, filteredSuggestions.length));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < filteredSuggestions.length) {
        handleSelect(filteredSuggestions[activeIndex]);
      } else {
        if (inputValue.trim()) {
          onChange(inputValue.trim());
          setShowDropdown(false);
        }
      }
      e.preventDefault();
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  }

  // Main input change
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    setShowDropdown(true);
    setActiveIndex(-1);
    onChange(e.target.value);
  }

  // Liquid-glass dropdown box
  return (
    <div className={cn("w-full mb-1", styles.liquidGlassInputContainer, className)} style={style}>
      <label
        htmlFor={id}
        className="block font-semibold text-base mb-1 select-none"
        style={{
          color: "var(--sgp-input-label-color, #275086)",
        }}
      >
        {label}
      </label>
      <div className="relative w-full">
        <input
          ref={inputRef}
          id={id}
          className={cn(
            styles.liquidGlassInput,
            "transition-all focus:outline-none shadow-slate-100 ring-offset-1",
            "bg-white/80 dark:bg-[#2d3748] dark:bg-opacity-80 dark:text-white",
            error ? "border-red-400" : "",
            "backdrop-blur-md px-3 py-2",
            "font-semibold text-[1.06rem] ",
            "super-liquid"
          )}
          style={style}
          type="text"
          autoComplete={autoComplete}
          spellCheck
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          maxLength={maxLength}
          onFocus={() => setShowDropdown(true)}
          onBlur={() =>
            setTimeout(() => setShowDropdown(false), 120)
          }
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-controls={id && showDropdown ? id + "-sgp-list" : undefined}
        />
        <span className={styles.liquidGlassShine} />
        {showDropdown && (
          <ul
            id={id + "-sgp-list"}
            className="absolute top-full left-0 z-30 mt-1 w-full max-h-52 bg-white/90 dark:bg-[#2d3748]/95 dark:text-white drop-shadow-xl shadow-cyan-200/15 backdrop-blur-lg rounded-lg transition-all animate-fade-in overflow-auto"
            style={{
              border: "1.5px solid #abf7ee33",
              boxShadow: "0 8px 54px 0 #12e0e822, 0 2.5px 8.5px 0 #36fdda25",
            }}
            role="listbox"
          >
            {filteredSuggestions.length === 0 && (
              <li
                className="px-3 py-2 text-gray-500 dark:text-gray-300 cursor-default text-sm"
                key="no-suggestion"
              >
                {language === "bn" ? "কোনো অপশন নেই, টাইপ করুন..." : "No results, type to add..."}
              </li>
            )}
            {filteredSuggestions.map((s, i) => (
              <li
                onMouseDown={() => handleSelect(s)}
                key={s.en + s.bn}
                className={cn(
                  "px-3 py-2 cursor-pointer select-none transition-colors",
                  i === activeIndex
                    ? "bg-cyan-200/80 dark:bg-cyan-900/50 text-primary"
                    : "hover:bg-cyan-100/80 dark:hover:bg-cyan-700/40"
                )}
                role="option"
                aria-selected={i === activeIndex}
                tabIndex={-1}
              >
                {s[language] || s.en}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <div className="text-red-500 mt-0.5 text-xs font-medium">{error}</div>
      )}
    </div>
  );
};

export default SearchableInput;
