
import React, { useState } from "react";
import { Label } from "../ui/label";
import LiquidGlassInput from "../ui/LiquidGlassInput";
import { useUser } from "../../contexts/UserContext";
import { useLanguage } from "../../contexts/LanguageContext";

interface Props {
  isEditing: boolean;
}

const AddressSection: React.FC<Props> = ({ isEditing }) => {
  const { currentUser } = useUser();
  const { t } = useLanguage();
  
  const [presentDivision, setPresentDivision] = useState(currentUser?.presentAddress?.division || "");
  const [presentDistrict, setPresentDistrict] = useState(currentUser?.presentAddress?.district || "");
  const [presentSubDistrict, setPresentSubDistrict] = useState(currentUser?.presentAddress?.subDistrict || "");
  const [presentVillage, setPresentVillage] = useState(currentUser?.presentAddress?.village || "");
  const [presentZipCode, setPresentZipCode] = useState(currentUser?.presentAddress?.zipCode || "");

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-cyan-100">{t("profile.address.info")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="profile-division">{t("register.step3.present.division")}</Label>
          <LiquidGlassInput
            id="profile-division"
            value={isEditing ? presentDivision : (currentUser?.presentAddress?.division || "")}
            onChange={e => setPresentDivision(e.target.value)}
            className="w-full"
            placeholder={currentUser?.presentAddress?.division || t("register.step3.present.division")}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="profile-district">{t("register.step3.present.district")}</Label>
          <LiquidGlassInput
            id="profile-district"
            value={isEditing ? presentDistrict : (currentUser?.presentAddress?.district || "")}
            onChange={e => setPresentDistrict(e.target.value)}
            className="w-full"
            placeholder={currentUser?.presentAddress?.district || t("register.step3.present.district")}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="profile-subdistrict">{t("register.step3.present.sub_district")}</Label>
          <LiquidGlassInput
            id="profile-subdistrict"
            value={isEditing ? presentSubDistrict : (currentUser?.presentAddress?.subDistrict || "")}
            onChange={e => setPresentSubDistrict(e.target.value)}
            className="w-full"
            placeholder={currentUser?.presentAddress?.subDistrict || t("register.step3.present.sub_district")}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="profile-village">{t("register.step3.present.village")}</Label>
          <LiquidGlassInput
            id="profile-village"
            value={isEditing ? presentVillage : (currentUser?.presentAddress?.village || "")}
            onChange={e => setPresentVillage(e.target.value)}
            className="w-full"
            placeholder={currentUser?.presentAddress?.village || t("register.step3.present.village")}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="profile-zipcode">{t("register.step3.present.zip")}</Label>
          <LiquidGlassInput
            id="profile-zipcode"
            value={isEditing ? presentZipCode : (currentUser?.presentAddress?.zipCode || "")}
            onChange={e => setPresentZipCode(e.target.value)}
            className="w-full"
            placeholder={currentUser?.presentAddress?.zipCode || t("register.step3.present.zip")}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
