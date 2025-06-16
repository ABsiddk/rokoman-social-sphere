
import React, { useState } from "react";
import LiquidGlassInput from "../ui/LiquidGlassInput";
import LiquidGlassSelect from "../ui/LiquidGlassSelect";
import { Label } from "../ui/label";
import { useUser } from "../../contexts/UserContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useSelectOptions } from "../registration/personal-info/SelectOptions";
import { format } from "date-fns";

interface Props {
  isEditing: boolean;
}

const PersonalInfoSection: React.FC<Props> = ({ isEditing }) => {
  const { currentUser, updateProfile } = useUser();
  const { t } = useLanguage();
  const { genderOptions, religionOptions, maritalStatusOptions } = useSelectOptions();

  // State for each field (expand to all you need)
  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [nickNames, setNickNames] = useState<string[]>(currentUser?.nickNames ?? [""]);
  const [dateOfBirth, setDateOfBirth] = useState(currentUser?.dateOfBirth ?? "");
  const [gender, setGender] = useState(currentUser?.gender ?? "");
  const [religion, setReligion] = useState(currentUser?.religion ?? "");
  const [maritalStatus, setMaritalStatus] = useState(currentUser?.maritalStatus ?? "");
  const [personalEmail, setPersonalEmail] = useState(currentUser?.personalEmail ?? "");
  const [additionalPhones, setAdditionalPhones] = useState<string[]>(currentUser?.additionalPhones ?? [""]);

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-cyan-100">{t("profile.personal.info")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="profile-fullname">{t("profile.name")}</Label>
          <LiquidGlassInput
            id="profile-fullname"
            value={isEditing ? fullName : (currentUser?.name || "")}
            onChange={e => setFullName(e.target.value)}
            className="w-full"
            placeholder={currentUser?.name || t("register.step2.full_name_placeholder")}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="profile-nick">{t("register.step2.nickname")}</Label>
          <LiquidGlassInput
            id="profile-nick"
            value={isEditing ? (nickNames[0] || "") : (currentUser?.nickNames?.[0] || "")}
            onChange={e => setNickNames([e.target.value])}
            className="w-full"
            placeholder={currentUser?.nickNames?.[0] || t("register.step2.nickname_placeholder")}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="profile-dob">{t("register.step2.date_of_birth")}</Label>
          <LiquidGlassInput
            id="profile-dob"
            type="date"
            value={isEditing ? dateOfBirth : (currentUser?.dateOfBirth ? format(new Date(currentUser.dateOfBirth), "yyyy-MM-dd") : "")}
            onChange={e => setDateOfBirth(e.target.value)}
            className="w-full"
            placeholder={t("register.step2.date_of_birth")}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="profile-gender">{t("register.step2.gender.label")}</Label>
          <LiquidGlassSelect
            id="profile-gender"
            value={isEditing ? gender : (currentUser?.gender || "")}
            onValueChange={setGender}
            options={genderOptions}
            placeholder={currentUser?.gender || t("register.step2.gender.placeholder")}
          />
        </div>
        <div>
          <Label htmlFor="profile-religion">{t("register.step2.religion.label")}</Label>
          <LiquidGlassSelect
            id="profile-religion"
            value={isEditing ? religion : (currentUser?.religion || "")}
            onValueChange={setReligion}
            options={religionOptions}
            placeholder={currentUser?.religion || t("register.step2.religion.placeholder")}
          />
        </div>
        <div>
          <Label htmlFor="profile-marital">{t("register.step2.marital.label")}</Label>
          <LiquidGlassSelect
            id="profile-marital"
            value={isEditing ? maritalStatus : (currentUser?.maritalStatus || "")}
            onValueChange={setMaritalStatus}
            options={maritalStatusOptions}
            placeholder={currentUser?.maritalStatus || t("register.step2.marital.placeholder")}
          />
        </div>
        <div>
          <Label htmlFor="profile-personal-email">{t("register.step2.personal_email")}</Label>
          <LiquidGlassInput
            id="profile-personal-email"
            value={isEditing ? personalEmail : (currentUser?.personalEmail || "")}
            onChange={e => setPersonalEmail(e.target.value)}
            className="w-full"
            placeholder={currentUser?.personalEmail || t("register.step2.personal_email_placeholder")}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="profile-additional-phone">{t("register.step2.additional_phone")}</Label>
          <LiquidGlassInput
            id="profile-additional-phone"
            value={isEditing ? (additionalPhones[0] || "") : (currentUser?.additionalPhones?.[0] || "")}
            onChange={e => setAdditionalPhones([e.target.value])}
            className="w-full"
            placeholder={currentUser?.additionalPhones?.[0] || t("register.step2.additional_phone_placeholder")}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
