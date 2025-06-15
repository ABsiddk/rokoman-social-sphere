
import React, { useRef } from "react";
import { Camera, Shield } from "lucide-react";
import LiquidGlassButton from "../ui/LiquidGlassButton";
import { useLanguage } from "../../contexts/LanguageContext";
import { useUser } from "../../contexts/UserContext";

interface ProfileHeaderProps {
  avatar?: string;
  name: string;
  role: string;
  onImageChange: (base64: string) => void;
  isEditing: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ avatar, name, role, onImageChange, isEditing }) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          onImageChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center space-x-5 mb-6">
      <div className="relative">
        <img
          src={avatar || "/placeholder.svg"}
          alt={name}
          className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-md"
        />
        {isEditing && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              aria-label={t("profile.change_photo")}
            />
            <button
              className="absolute bottom-0 right-0 z-20 bg-white dark:bg-gray-800 text-[rgb(39,113,150)] p-2 rounded-full border-2 border-teal-300 dark:border-gray-700 shadow-sm hover:scale-110 focus:outline-none"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              <Camera size={16} />
            </button>
          </>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h2>
        <div className="flex items-center space-x-2 mt-1">
          <Shield size={17} />
          <span className="capitalize text-blue-900 dark:text-cyan-200">{role}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
