
import React, { useState } from "react";
import LiquidGlassInput from "../ui/LiquidGlassInput";
import { Label } from "../ui/label";
import { useLanguage } from "../../contexts/LanguageContext";
import { useUser } from "../../contexts/UserContext";

interface Props {
  isEditing: boolean;
}

const PhoneSecuritySection: React.FC<Props> = ({ isEditing }) => {
  const { currentUser, updateProfile } = useUser();
  const { t } = useLanguage();
  const [phone, setPhone] = useState(currentUser?.phone || "");

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-cyan-100">{t("profile.phone.security")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="profile-phone">{t("profile.phone")}</Label>
          {isEditing ? (
            <LiquidGlassInput
              id="profile-phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full"
              placeholder={t("profile.phone")}
              autoComplete="off"
            />
          ) : (
            <span className="block bg-gray-50 dark:bg-gray-700 rounded px-2 py-2 text-gray-800 dark:text-cyan-50">{currentUser?.phone || t("profile.not.provided")}</span>
          )}
        </div>
      </div>
      {/* Password editing/copy functionality can be added here if business logic permits */}
    </div>
  );
};

export default PhoneSecuritySection;
