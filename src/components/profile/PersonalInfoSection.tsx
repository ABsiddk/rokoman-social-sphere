
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
          {isEditing ? (
            <LiquidGlassInput
              id="profile-fullname"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full"
              placeholder={t("register.step2.full_name_placeholder")}
            />
          ) : (
            <span className="block bg-gray-50 dark:bg-gray-700 rounded px-2 py-2 text-gray-800 dark:text-cyan-50">{currentUser?.name}</span>
          )}
        </div>
        <div>
          <Label htmlFor="profile-nick">{t("register.step2.nickname")}</Label>
          {isEditing ? (
            <LiquidGlassInput
              id="profile-nick"
              value={nickNames[0] || ""}
              onChange={e => setNickNames([e.target.value])}
              className="w-full"
              placeholder={t("register.step2.nickname_placeholder")}
            />
          ) : (
            <span className="block bg-gray-50 dark:bg-gray-700 rounded px-2 py-2 text-gray-800 dark:text-cyan-50">{currentUser?.nickNames?.[0]}</span>
          )}
        </div>
        <div>
          <Label htmlFor="profile-dob">{t("register.step2.date_of_birth")}</Label>
          {isEditing ? (
            <LiquidGlassInput
              id="profile-dob"
              type="date"
              value={dateOfBirth}
              onChange={e => setDateOfBirth(e.target.value)}
              className="w-full"
              placeholder={t("register.step2.date_of_birth")}
            />
          ) : (
            <span className="block bg-gray-50 dark:bg-gray-700 rounded px-2 py-2 text-gray-800 dark:text-cyan-50">
              {currentUser?.dateOfBirth
                ? format(new Date(currentUser.dateOfBirth), "yyyy-MM-dd")
                : t("profile.not.provided")}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="profile-gender">{t("register.step2.gender.label")}</Label>
          {isEditing ? (
            <LiquidGlassSelect
              id="profile-gender"
              value={gender}
              onValueChange={setGender}
              options={genderOptions}
              placeholder={t("register.step2.gender.placeholder")}
            />
          ) : (
            <span className="block bg-gray-50 dark:bg-gray-700 rounded px-2 py-2 text-gray-800 dark:text-cyan-50">{currentUser?.gender}</span>
          )}
        </div>
        <div>
          <Label htmlFor="profile-religion">{t("register.step2.religion.label")}</Label>
          {isEditing ? (
            <LiquidGlassSelect
              id="profile-religion"
              value={religion}
              onValueChange={setReligion}
              options={religionOptions}
              placeholder={t("register.step2.religion.placeholder")}
            />
          ) : (
            <span className="block bg-gray-50 dark:bg-gray-700 rounded px-2 py-2 text-gray-800 dark:text-cyan-50">{currentUser?.religion}</span>
          )}
        </div>
        <div>
          <Label htmlFor="profile-marital">{t("register.step2.marital.label")}</Label>
          {isEditing ? (
            <LiquidGlassSelect
              id="profile-marital"
              value={maritalStatus}
              onValueChange={setMaritalStatus}
              options={maritalStatusOptions}
              placeholder={t("register.step2.marital.placeholder")}
            />
          ) : (
            <span className="block bg-gray-50 dark:bg-gray-700 rounded px-2 py-2 text-gray-800 dark:text-cyan-50">{currentUser?.maritalStatus}</span>
          )}
        </div>
        <div>
          <Label htmlFor="profile-personal-email">{t("register.step2.personal_email")}</Label>
          {isEditing ? (
            <LiquidGlassInput
              id="profile-personal-email"
              value={personalEmail}
              onChange={e => setPersonalEmail(e.target.value)}
              className="w-full"
              placeholder={t("register.step2.personal_email_placeholder")}
            />
          ) : (
            <span className="block bg-gray-50 dark:bg-gray-700 rounded px-2 py-2 text-gray-800 dark:text-cyan-50">{currentUser?.personalEmail}</span>
          )}
        </div>
        <div>
          <Label htmlFor="profile-additional-phone">{t("register.step2.additional_phone")}</Label>
          {isEditing ? (
            <LiquidGlassInput
              id="profile-additional-phone"
              value={additionalPhones[0] || ""}
              onChange={e => setAdditionalPhones([e.target.value])}
              className="w-full"
              placeholder={t("register.step2.additional_phone_placeholder")}
            />
          ) : (
            <span className="block bg-gray-50 dark:bg-gray-700 rounded px-2 py-2 text-gray-800 dark:text-cyan-50">{currentUser?.additionalPhones?.[0]}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
