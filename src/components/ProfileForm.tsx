
import React, { useState } from "react";
import ProfileHeader from "./profile/ProfileHeader";
import EditableSection from "./profile/EditableSection";
import PhoneSecuritySection from "./profile/PhoneSecuritySection";
import PersonalInfoSection from "./profile/PersonalInfoSection";
import AddressSection from "./profile/AddressSection";
import ProfessionalSection from "./profile/ProfessionalSection";
import { useUser } from "../contexts/UserContext";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from '@/hooks/use-toast';

const ProfileForm = () => {
  const { currentUser, updateProfile } = useUser();
  const { t } = useLanguage();

  // Avatar and name edit handled at header level
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [isAvatarEditing, setIsAvatarEditing] = useState(false);

  return (
    <div className="max-w-3xl mx-auto bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-slate-200 dark:border-gray-700 overflow-hidden mt-7 pb-6 transition-colors animate-fade-in">
      <div className="p-8 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[rgb(39,113,150)]/90 to-[rgb(129,130,135)]/60">
        <ProfileHeader
          avatar={avatar}
          name={currentUser?.name || ""}
          role={currentUser?.role || ""}
          onImageChange={setAvatar}
          isEditing={isAvatarEditing}
        />
        {!isAvatarEditing ? (
          <button className="absolute top-4 right-4 z-40" onClick={() => setIsAvatarEditing(true)}>
            {/* edit icon button appears only for photo/name edit */}
          </button>
        ) : (
          <div className="flex justify-end space-x-2 mt-2">
            {/* Save/cancel special for avatar only */}
            <button
              className="bg-green-600 text-white rounded px-6 py-2 hover:bg-green-700 transition"
              onClick={() => {
                updateProfile({ avatar });
                setIsAvatarEditing(false);
              }}
            >
              {t("common.save")}
            </button>
            <button
              className="bg-gray-300 text-gray-800 rounded px-6 py-2 hover:bg-gray-400 transition"
              onClick={() => setIsAvatarEditing(false)}
            >
              {t("common.cancel")}
            </button>
          </div>
        )}
      </div>

      <div className="p-8 pt-4 space-y-9">
        <EditableSection
          title={t("profile.phoneSecurity")}
          onSave={() => {/* integrate save logic per section here */}}
        >
          {(isEditing) => <PhoneSecuritySection isEditing={isEditing} />}
        </EditableSection>

        <EditableSection
          title={t("profile.personal.info")}
          onSave={() => {/* integrate save logic per section here */}}
        >
          {(isEditing) => <PersonalInfoSection isEditing={isEditing} />}
        </EditableSection>

        <EditableSection
          title={t("profile.address.info")}
          onSave={() => {/* integrate save logic per section here */}}
        >
          {(isEditing) => <AddressSection isEditing={isEditing} />}
        </EditableSection>

        <EditableSection
          title={t("profile.professional.info")}
          onSave={() => {/* integrate save logic per section here */}}
        >
          {(isEditing) => <ProfessionalSection isEditing={isEditing} />}
        </EditableSection>
      </div>
    </div>
  );
};

export default ProfileForm;
