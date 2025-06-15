
import React from "react";
import styles from "./ProfessionTypeCapsule.module.css";
import { useLanguage } from "../../../contexts/LanguageContext";
import { cn } from "../../../lib/utils"; // for combining classes

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
    if (value === optionKey) onChange("");
    else onChange(optionKey);
  };

  return (
    <section className="mb-4">
      <label className="block text-lg font-bold text-primary dark:text-cyan-200 mb-3">
        {t("register.step4.profession_type")}
      </label>
      <div className={styles.capsuleRow}>
        {PROFESSION_OPTIONS.map((option) => (
          <button
            type="button"
            key={option.key}
            aria-pressed={value === option.key}
            className={cn(
              styles.capsuleButton,
              value === option.key && "selected"
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
