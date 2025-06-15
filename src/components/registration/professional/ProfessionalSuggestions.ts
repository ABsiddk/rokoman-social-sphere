
export type Suggestion = { en: string; bn: string };

export const governmentInstitutions: Suggestion[] = [
  { en: "Bangladesh Civil Service Academy", bn: "বাংলাদেশ সিভিল সার্ভিস একাডেমি" },
  { en: "Bangladesh Bank", bn: "বাংলাদেশ ব্যাংক" },
  { en: "Bangladesh Army", bn: "বাংলাদেশ সেনাবাহিনী" },
  { en: "Ministry of Finance", bn: "অর্থ মন্ত্রণালয়" }
];

export const privateInstitutions: Suggestion[] = [
  { en: "BRAC", bn: "ব্র্যাক" },
  { en: "Grameenphone", bn: "গ্রামীণফোন" },
  { en: "Square Group", bn: "স্কয়ার গ্রুপ" },
  { en: "Apex", bn: "অ্যাপেক্স" },
  { en: "North South University", bn: "নর্থ সাউথ বিশ্ববিদ্যালয়" }
];

export const businessInstitutions: Suggestion[] = [
  { en: "Own Business", bn: "নিজস্ব ব্যবসা" },
  { en: "Startup", bn: "স্টার্টআপ" },
  { en: "Shop Owner", bn: "দোকান মালিক" },
  { en: "Freelancer", bn: "ফ্রিল্যান্সার" }
];

export const studentInstitutions: Suggestion[] = [
  { en: "University of Dhaka", bn: "ঢাকা বিশ্ববিদ্যালয়" },
  { en: "BRAC University", bn: "ব্র্যাক বিশ্ববিদ্যালয়" },
  { en: "North South University", bn: "নর্থ সাউথ বিশ্ববিদ্যালয়" },
  { en: "BUET", bn: "বুয়েট" },
  { en: "ICDDRB", bn: "আইসিডিডিআরবি" }
];

export const otherInstitutions: Suggestion[] = [
  { en: "Other", bn: "অন্যান্য" }
];

// ------- Departments -------
export const governmentDepartments: Suggestion[] = [
  { en: "Administration", bn: "প্রশাসন" },
  { en: "Finance", bn: "ফিন্যান্স" },
  { en: "Public Administration", bn: "লোক প্রশাসন" },
  { en: "Law", bn: "আইন" },
  { en: "Engineering", bn: "ইঞ্জিনিয়ারিং" }
];

export const privateDepartments: Suggestion[] = [
  { en: "Human Resources", bn: " মানব সম্পদ" },
  { en: "Finance", bn: "ফিন্যান্স" },
  { en: "Engineering", bn: "ইঞ্জিনিয়ারিং" },
  { en: "Marketing", bn: "মার্কেটিং" },
  { en: "Information Technology", bn: "আইটি" }
];

export const businessDepartments: Suggestion[] = [
  { en: "Business Operations", bn: "ব্যবসা কার্যক্রম" },
  { en: "Sales", bn: "বিক্রয়" },
  { en: "Supply Chain", bn: "সরবরাহ শৃঙ্খল" },
  { en: "Customer Support", bn: "গ্রাহক সহায়তা" }
];

export const studentDepartments: Suggestion[] = [
  { en: "Computer Science", bn: "কম্পিউটার বিজ্ঞান" },
  { en: "Engineering", bn: "ইঞ্জিনিয়ারিং" },
  { en: "Law", bn: "আইন" },
  { en: "Medical", bn: "চিকিৎসা" },
  { en: "Finance", bn: "ফিন্যান্স" },
  { en: "Public Administration", bn: "লোক প্রশাসন" },
  { en: "Environment", bn: "পরিবেশ" }
];

export const otherDepartments: Suggestion[] = [
  { en: "Other", bn: "অন্যান্য" }
];

// ------- Designations -------
export const governmentDesignations: Suggestion[] = [
  { en: "Officer", bn: "কর্মকর্তা" },
  { en: "Head of Department", bn: "বিভাগীয় প্রধান" },
  { en: "Manager", bn: "ম্যানেজার" },
  { en: "Engineer", bn: "প্রকৌশলী" }
];

export const privateDesignations: Suggestion[] = [
  { en: "Executive", bn: "এক্সিকিউটিভ" },
  { en: "Manager", bn: "ম্যানেজার" },
  { en: "Engineer", bn: "প্রকৌশলী" },
  { en: "Doctor", bn: "ডাক্তার" },
  { en: "Student", bn: "ছাত্র/ছাত্রী" }
];

export const businessDesignations: Suggestion[] = [
  { en: "Proprietor", bn: "প্রোপ্রাইটর" },
  { en: "Partner", bn: "অংশীদার" },
  { en: "Owner", bn: "মালিক" },
  { en: "Director", bn: "পরিচালক" }
];

export const studentDesignations: Suggestion[] = [
  { en: "Student", bn: "ছাত্র/ছাত্রী" },
  { en: "Intern", bn: "ইন্টার্ন" }
];

export const otherDesignations: Suggestion[] = [
  { en: "Other", bn: "অন্যান্য" }
];

// ---------- Universal fallback if needed ----------
export const fallbackInstitutions = [
  ...governmentInstitutions,
  ...privateInstitutions,
  ...studentInstitutions,
  ...businessInstitutions
];

export const fallbackDepartments = [
  ...governmentDepartments,
  ...privateDepartments,
  ...studentDepartments,
  ...businessDepartments
];

export const fallbackDesignations = [
  ...governmentDesignations,
  ...privateDesignations,
  ...studentDesignations,
  ...businessDesignations
];

// Export selector functions
export function getInstitutionSuggestions(professionType: string): Suggestion[] {
  switch (professionType) {
    case "government": return governmentInstitutions;
    case "private": return privateInstitutions;
    case "business": return businessInstitutions;
    case "student": return studentInstitutions;
    case "other": return otherInstitutions;
    default: return fallbackInstitutions;
  }
}

export function getDepartmentSuggestions(professionType: string): Suggestion[] {
  switch (professionType) {
    case "government": return governmentDepartments;
    case "private": return privateDepartments;
    case "business": return businessDepartments;
    case "student": return studentDepartments;
    case "other": return otherDepartments;
    default: return fallbackDepartments;
  }
}

export function getDesignationSuggestions(professionType: string): Suggestion[] {
  switch (professionType) {
    case "government": return governmentDesignations;
    case "private": return privateDesignations;
    case "business": return businessDesignations;
    case "student": return studentDesignations;
    case "other": return otherDesignations;
    default: return fallbackDesignations;
  }
}
