
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

// For alignment: map label with gov button on web, center on mobile
const ProfessionTypeSelector: React.FC<ProfessionTypeSelectorProps> = ({ value, onChange }) => {
  const { t } = useLanguage();

  const handleSelect = (optionKey: string) => {
    if (value !== optionKey) {
      onChange(optionKey);
    }
    // If you ONLY want to deselect by clicking the same button, uncomment below:
    // else onChange('');
  };

  // Responsive: left align on md+, center on mobile
  return (
    <section className="mb-4">
      {/* On desktop, label above gov button, all buttons left aligned */}
      <div className="w-full flex flex-col md:items-start items-center">
        <label className="block text-lg font-bold mb-3 text-left text-[rgb(46,76,130)] dark:text-cyan-200 w-full md:w-auto">
          {t("register.step4.profession_type")}
        </label>
        <div className={cn(
          styles.capsuleRow,
          "w-full",
          "md:justify-start justify-center"
        )}>
          {PROFESSION_OPTIONS.map((option) => (
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
    </section>
  );
};

export default ProfessionTypeSelector;
