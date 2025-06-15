
import React from "react";
import { Label } from "../ui/label";
import LiquidGlassInput from "../ui/LiquidGlassInput";
import { useUser } from "../../contexts/UserContext";
import { useLanguage } from "../../contexts/LanguageContext";

interface Props {
  isEditing: boolean;
}

const ProfessionalSection: React.FC<Props> = ({ isEditing }) => {
  const { currentUser } = useUser();
  const { t } = useLanguage();

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-cyan-100">{t("profile.professional.info")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>{t("register.step4.profession_type")}</Label>
          {isEditing ? (
            <LiquidGlassInput className="w-full" />
          ) : (
            <span className="block bg-gray-50 dark:bg-gray-700 rounded px-2 py-2 text-gray-800 dark:text-cyan-50">
              {currentUser?.professionType}
            </span>
          )}
        </div>
        {/* Repeat for institution, department, etc. */}
      </div>
    </div>
  );
};

export default ProfessionalSection;
