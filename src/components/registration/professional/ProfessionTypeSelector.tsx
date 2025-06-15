
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

  // Separate the Government button and place the label right above it
  // Render Government button with label, then render the rest in a row

  // First option is always government
  const [firstOption, ...otherOptions] = PROFESSION_OPTIONS;

  return (
    <section className="mb-4 w-full flex flex-col items-center">
      <div className={cn(styles.capsuleRow, "w-full flex flex-col items-center gap-0")}>
        {/* Label directly above government button */}
        <label
          htmlFor={`profession-${firstOption.key}`}
          className="block text-lg font-bold mb-2 text-center text-[rgb(46,76,130)] dark:text-cyan-200 w-full"
        >
          {t("register.step4.profession_type")}
        </label>
        <button
          type="button"
          id={`profession-${firstOption.key}`}
          aria-pressed={value === firstOption.key}
          className={cn(
            styles.capsuleButton,
            value === firstOption.key && "selected",
            "super-liquid",
            "mb-2"
          )}
          onClick={() => handleSelect(firstOption.key)}
          tabIndex={0}
        >
          <span className="shine" />
          {t(firstOption.labelKey)}
        </button>
      </div>
      {/* Render the rest horizontally centered */}
      <div className={cn(styles.capsuleRow, "w-full justify-center")}>
        {otherOptions.map((option) => (
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
    </section>
  );
};

export default ProfessionTypeSelector;
