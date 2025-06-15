
import React from 'react';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '../../ui/popover';
import { Calendar } from '../../ui/calendar';
import { useSelectOptions } from './SelectOptions';
import { cn } from '../../../lib/utils';
import { format } from 'date-fns';
import LiquidGlassSelect from '../../ui/LiquidGlassSelect';

// This file is getting pretty long.
// After approving these UI changes, consider asking to refactor this file for long-term maintainability!

interface PersonalDetailsSectionProps {
  dateOfBirth: string;
  onDateOfBirthChange: (value: string) => void;
  gender: string;
  onGenderChange: (value: string) => void;
  religion: string;
  onReligionChange: (value: string) => void;
  maritalStatus: string;
  onMaritalStatusChange: (value: string) => void;
  labelColor?: string;
  inputBgColor?: string;
  t: (key: string) => string;
}
const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({
  dateOfBirth,
  onDateOfBirthChange,
  gender,
  onGenderChange,
  religion,
  onReligionChange,
  maritalStatus,
  onMaritalStatusChange,
  labelColor = 'text-[rgb(145,153,165)]',
  t,
}) => {
  const { genderOptions, religionOptions, maritalStatusOptions } = useSelectOptions();
  const [open, setOpen] = React.useState(false);

  const parsedDate: Date | undefined = dateOfBirth ? new Date(dateOfBirth) : undefined;

  // Silky glass & animation wrappers used for visual comfort
  const glassWrap = "rounded-2xl shadow-md p-[1.5px] bg-gradient-to-br from-white/60 via-teal-100/60 to-blue-200/60 dark:from-[rgb(55,65,81)] dark:to-[#29383A] dark:via-[#18303c]/50 mb-2";
  const inner = "w-full h-full rounded-[19px] p-4 bg-white/85 dark:bg-[rgb(34,43,60)] transition-colors duration-300 backdrop-blur-xl";

  return (
    <>
      <div className={glassWrap + " animate-fade-in"}>
        <div className={inner}>
          <Label htmlFor="dateOfBirth" className={`${labelColor} dark:text-cyan-100`}>
            {t('register.step2.date_of_birth')}
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={
                  "w-full rounded-xl px-3 py-2 text-base shadow-md border border-gray-300 dark:border-gray-700 backdrop-blur-xl " +
                  "bg-gradient-to-br from-white via-stone-100 to-blue-50 dark:from-[rgb(55,65,81)] dark:via-gray-700 dark:to-[#393e56] text-gray-900 dark:text-white font-semibold"
                }
                style={{
                  background:
                    "linear-gradient(114deg, rgba(255,255,255,0.92) 0%, rgba(5,117,170,0.22) 94%)",
                  boxShadow: "0 2.5px 16px 0 rgba(20,205,240,0.10)",
                  color: 'inherit',
                  minHeight: '44px',
                  transition: 'background 0.21s, box-shadow 0.21s',
                }}
              >
                <CalendarIcon className="mr-2 h-4 w-4 opacity-80" />
                {parsedDate ? format(parsedDate, "PPP") : t('register.step2.date_of_birth_placeholder')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[rgb(55,65,81)] text-white z-50 border-none" align="start">
              <Calendar
                mode="single"
                selected={parsedDate}
                onSelect={d => {
                  if (d) {
                    onDateOfBirthChange(d.toISOString().slice(0, 10));
                    setOpen(false);
                  }
                }}
                disabled={date =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
                className={cn("p-3 pointer-events-auto bg-[rgb(55,65,81)] text-white")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className={glassWrap + " animate-fade-in"}>
        <div className={inner}>
          <Label htmlFor="gender" className={`${labelColor} dark:text-cyan-100`}>
            {t('register.step2.gender')}
          </Label>
          <LiquidGlassSelect
            value={gender}
            onValueChange={onGenderChange}
            options={genderOptions}
            placeholder={t('register.step2.gender_placeholder')}
            id="gender"
          />
        </div>
      </div>
      <div className={glassWrap + " animate-fade-in"}>
        <div className={inner}>
          <Label htmlFor="religion" className={`${labelColor} dark:text-cyan-100`}>
            {t('register.step2.religion')}
          </Label>
          <LiquidGlassSelect
            value={religion}
            onValueChange={onReligionChange}
            options={religionOptions}
            placeholder={t('register.step2.religion_placeholder')}
            id="religion"
          />
        </div>
      </div>
      <div className={glassWrap + " animate-fade-in"}>
        <div className={inner}>
          <Label htmlFor="maritalStatus" className={`${labelColor} dark:text-cyan-100`}>
            {t('register.step2.marital_status')}
          </Label>
          <LiquidGlassSelect
            value={maritalStatus}
            onValueChange={onMaritalStatusChange}
            options={maritalStatusOptions}
            placeholder={t('register.step2.marital_placeholder')}
            id="maritalStatus"
          />
        </div>
      </div>
    </>
  );
};

export default PersonalDetailsSection;
