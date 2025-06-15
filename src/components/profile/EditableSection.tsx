
import React, { useState } from "react";
import LiquidGlassButton from "../ui/LiquidGlassButton";
import { Edit } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface EditableSectionProps {
  title: string;
  children: (isEditing: boolean, setIsEditing: (edit: boolean) => void) => React.ReactNode;
  onSave: () => void;
  editButtonColor?: string;
}

const EditableSection: React.FC<EditableSectionProps> = ({ title, children, onSave, editButtonColor = "bg-green-500" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useLanguage();

  return (
    <section className="relative mb-8 rounded-2xl shadow-lg bg-gradient-to-br from-white/60 via-teal-100/60 to-blue-200/60 dark:from-[rgb(55,65,81)] dark:to-[#29383A] dark:via-[#18303c]/50 px-0">
      <div className="absolute top-3 right-5 z-10">
        {!isEditing && (
          <LiquidGlassButton
            className={`flex items-center ${editButtonColor} hover:bg-green-600 text-white px-4 py-2`}
            onClick={() => setIsEditing(true)}
          >
            <Edit size={18} className="mr-1" />
            {t("profile.edit")}
          </LiquidGlassButton>
        )}
      </div>
      <div className="p-6">
        {children(isEditing, setIsEditing)}
        {isEditing && (
          <div className="flex justify-end mt-6">
            <LiquidGlassButton
              className="bg-green-600 hover:bg-green-700 text-white px-6"
              onClick={() => {
                onSave();
                setIsEditing(false);
              }}
            >
              {t("common.save")}
            </LiquidGlassButton>
            <LiquidGlassButton
              className="ml-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              onClick={() => setIsEditing(false)}
              style={{minWidth: 90}}
            >
              {t("common.cancel")}
            </LiquidGlassButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default EditableSection;
