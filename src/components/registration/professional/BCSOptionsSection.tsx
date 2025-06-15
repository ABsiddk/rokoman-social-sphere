
import React from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import LiquidGlassInput from "../../ui/LiquidGlassInput";
import { useLanguage } from "../../../contexts/LanguageContext";

interface BCSOptionsSectionProps {
  isBCS?: boolean;
  bcsSession?: string;
  onBCSChange: (checked: boolean) => void;
  onSessionChange: (val: string) => void;
  error?: string;
}

const BCSOptionsSection: React.FC<BCSOptionsSectionProps> = ({
  isBCS,
  bcsSession,
  onBCSChange,
  onSessionChange,
  error
}) => {
  const { t } = useLanguage();

  return (
    <div className="mb-3 w-full px-1 py-2 bg-white/70 dark:bg-gray-900/60 rounded-lg shadow-inner transition-colors">
      <Label className="block font-semibold text-base mb-1 text-[rgb(26,48,92)] dark:text-[rgb(141,226,222)]">
        {t("register.step4.is_bcs") || "Are you a BCS cadre?"}
      </Label>
      <RadioGroup
        className="flex flex-row gap-8 mb-1 ml-1"
        value={isBCS ? "yes" : "no"}
        onValueChange={(value) => onBCSChange(value === "yes")}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="bcs-yes" />
          <Label
            htmlFor="bcs-yes"
            className="font-medium text-base cursor-pointer text-gray-800 dark:text-cyan-100"
          >
            {t("register.step4.yes") || "Yes"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="bcs-no" />
          <Label
            htmlFor="bcs-no"
            className="font-medium text-base cursor-pointer text-gray-800 dark:text-cyan-100"
          >
            {t("register.step4.no") || "No"}
          </Label>
        </div>
      </RadioGroup>

      {isBCS && (
        <div className="animate-fade-in mt-1 pl-6">
          <Label htmlFor="bcsSession" className="text-sm mb-1 font-semibold text-gray-700 dark:text-cyan-200">
            {t("register.step4.bcs_session") || "BCS Batch"}
          </Label>
          <LiquidGlassInput
            id="bcsSession"
            value={bcsSession || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSessionChange(e.target.value)}
            placeholder={t('register.step4.bcs_session.placeholder')}
            error={error}
            autoComplete="off"
            maxLength={32}
            className="mt-0.5"
            style={{ minWidth: 0, maxWidth: "none" }}
          />
        </div>
      )}
    </div>
  );
};

export default BCSOptionsSection;

