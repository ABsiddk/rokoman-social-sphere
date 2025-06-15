
import React from "react";
import styles from "./ProfessionTypeCapsule.module.css";
import { useLanguage } from "../../../contexts/LanguageContext";
import { cn } from "../../../lib/utils";

type ProfessionOption = {
  key: string;
  labelKey: string;
};

const PROFESSION_OPTIONS: ProfessionOption[] = [
  { key: "government", labelKey: "register.step4.profession.government" },
  { key: "private", labelKey: "register.step4.profession.private" },
  { key: "business", labelKey: "register.step4.profession.business" },
  { key: "student", labelKey: "register.step4.profession.student" },
  { key: "other", labelKey: "register.step4.profession.other" },
];

interface ProfessionTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ProfessionTypeSelector: React.FC<ProfessionTypeSelectorProps> = ({ value, onChange }) => {
  const { t } = useLanguage();

  const handleSelect = (optionKey: string) => {
    if (value !== optionKey) {
      onChange(optionKey);
    }
  };

  // Tablet-specific: add a responsive wrapper for label + gov+rest buttons in a row
  // On tablets, use 'tabletRow' layout: label column at left, buttons at center

  return (
    <section className="mb-4 w-full flex flex-col items-center">
      <div className={cn(styles.capsuleTabletRow, "w-full")}>
        {/* Tablet/desktop: left label over gov button, but label aligns left on tablets */}
        <div className={styles.labelColForTablet}>
          <label
            className="block text-lg font-bold mb-3 text-left text-[rgb(46,76,130)] dark:text-cyan-200 w-full"
            htmlFor="govt-profession-type-btn"
          >
            {t("register.step4.profession_type")}
          </label>
        </div>
        <div className={cn(styles.capsuleRow, "justify-center")}>
          {/* Government button */}
          <div className={styles.labelButtonColumnTablet}>
            <button
              type="button"
              id="govt-profession-type-btn"
              key={PROFESSION_OPTIONS[0].key}
              aria-pressed={value === PROFESSION_OPTIONS[0].key}
              className={cn(
                styles.capsuleButton,
                value === PROFESSION_OPTIONS[0].key && "selected",
                "super-liquid"
              )}
              onClick={() => handleSelect(PROFESSION_OPTIONS[0].key)}
              tabIndex={0}
            >
              <span className="shine" />
              {t(PROFESSION_OPTIONS[0].labelKey)}
            </button>
          </div>
          {/* Render other profession buttons */}
          <div className={styles.otherButtonsRow}>
            {PROFESSION_OPTIONS.slice(1).map((option) => (
              <button
                type="button"
                key={option.key}
                aria-pressed={value === option.key}
                className={cn(
                  styles.capsuleButton,
                  value === option.key && "selected",
                  "super-liquid"
                )}
                onClick={() => handleSelect(option.key)}
                tabIndex={0}
              >
                <span className="shine" />
                {t(option.labelKey)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionTypeSelector;

