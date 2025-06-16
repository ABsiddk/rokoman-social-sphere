
import React, { useState } from "react";
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

  const [professionType, setProfessionType] = useState(currentUser?.professionType || "");
  const [institution, setInstitution] = useState(currentUser?.institution || "");
  const [department, setDepartment] = useState(currentUser?.department || "");
  const [designation, setDesignation] = useState(currentUser?.designation || "");
  const [jobLocation, setJobLocation] = useState(currentUser?.jobLocation || "");
  const [startDate, setStartDate] = useState(currentUser?.startDate || "");

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-cyan-100">{t("profile.professional.info")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="profile-profession">{t("register.step4.profession_type")}</Label>
          <LiquidGlassInput
            id="profile-profession"
            value={isEditing ? professionType : (currentUser?.professionType || "")}
            onChange={e => setProfessionType(e.target.value)}
            className="w-full"
            placeholder={currentUser?.professionType || t("register.step4.profession_type")}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="profile-institution">{t("register.step4.institution")}</Label>
          <LiquidGlassInput
            id="profile-institution"
            value={isEditing ? institution : (currentUser?.institution || "")}
            onChange={e => setInstitution(e.target.value)}
            className="w-full"
            placeholder={currentUser?.institution || t("register.step4.institution")}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="profile-department">{t("register.step4.department")}</Label>
          <LiquidGlassInput
            id="profile-department"
            value={isEditing ? department : (currentUser?.department || "")}
            onChange={e => setDepartment(e.target.value)}
            className="w-full"
            placeholder={currentUser?.department || t("register.step4.department")}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="profile-designation">{t("register.step4.designation")}</Label>
          <LiquidGlassInput
            id="profile-designation"
            value={isEditing ? designation : (currentUser?.designation || "")}
            onChange={e => setDesignation(e.target.value)}
            className="w-full"
            placeholder={currentUser?.designation || t("register.step4.designation")}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="profile-joblocation">{t("register.step4.job_location")}</Label>
          <LiquidGlassInput
            id="profile-joblocation"
            value={isEditing ? jobLocation : (currentUser?.jobLocation || "")}
            onChange={e => setJobLocation(e.target.value)}
            className="w-full"
            placeholder={currentUser?.jobLocation || t("register.step4.job_location")}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="profile-startdate">{t("register.step4.start_date")}</Label>
          <LiquidGlassInput
            id="profile-startdate"
            type="date"
            value={isEditing ? startDate : (currentUser?.startDate || "")}
            onChange={e => setStartDate(e.target.value)}
            className="w-full"
            placeholder={t("register.step4.start_date")}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSection;
