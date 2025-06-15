
import React from 'react';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../ui/select';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '../../ui/popover';
import { Calendar } from '../../ui/calendar';
import { useSelectOptions } from './SelectOptions';
import { cn } from '../../../lib/utils';
import { format } from 'date-fns';

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
  inputBgColor = '',
  t,
}) => {
  const { genderOptions, religionOptions, maritalStatusOptions } = useSelectOptions();
  const [open, setOpen] = React.useState(false);

  // Dark/light mode aware gradients for dropdowns
  const gradient =
    "bg-gradient-to-br from-white via-stone-100 to-blue-50 dark:from-[rgb(55,65,81)] dark:via-gray-700 dark:to-[#393e56] border-none text-gray-900 dark:text-white";
  const hoverGradient =
    "hover:from-blue-100 hover:to-sky-200 dark:hover:from-[#47506E] dark:hover:via-[#29598E] dark:hover:to-[#29383A]";
  const optionHover =
    "data-[state=checked]:bg-emerald-600/70 data-[state=checked]:text-white hover:bg-emerald-500/10 hover:text-emerald-900 dark:hover:text-emerald-300";

  // Date handling: convert string -> Date and vice versa
  const parsedDate: Date | undefined = dateOfBirth ? new Date(dateOfBirth) : undefined;

  return (
    <>
      <div className="mb-2">
        <Label htmlFor="dateOfBirth" className={labelColor}>
          {t('register.step2.date_of_birth')}
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal rounded-lg shadow-sm border-none",
                gradient,
                !dateOfBirth && "text-muted-foreground"
              )}
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

      <div className="mb-2">
        <Label htmlFor="gender" className={labelColor}>
          {t('register.step2.gender')}
        </Label>
        <Select value={gender} onValueChange={onGenderChange}>
          <SelectTrigger
            id="gender"
            className={cn(
              "w-full text-base rounded-lg shadow-sm border-none px-3 py-2 transition focus:ring-2 focus:ring-emerald-600",
              gradient,
              hoverGradient,
              !gender && "text-muted-foreground font-normal"
            )}
          >
            <SelectValue placeholder={t('register.step2.gender_placeholder')} />
          </SelectTrigger>
          <SelectContent className={cn("rounded-lg shadow-lg mt-2 p-1 border-none bg-white/90 dark:bg-[rgb(55,65,81)] dark:text-white z-[1000]")}>
            {genderOptions.map(opt => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className={cn(
                  "rounded-md px-3 py-2 m-1 transition duration-200",
                  optionHover
                )}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-2">
        <Label htmlFor="religion" className={labelColor}>
          {t('register.step2.religion')}
        </Label>
        <Select value={religion} onValueChange={onReligionChange}>
          <SelectTrigger
            id="religion"
            className={cn(
              "w-full text-base rounded-lg shadow-sm border-none px-3 py-2 transition focus:ring-2 focus:ring-emerald-600",
              gradient,
              hoverGradient,
              !religion && "text-muted-foreground font-normal"
            )}
          >
            <SelectValue placeholder={t('register.step2.religion_placeholder')} />
          </SelectTrigger>
          <SelectContent className={cn("rounded-lg shadow-lg mt-2 p-1 border-none bg-white/90 dark:bg-[rgb(55,65,81)] dark:text-white z-[1000]")}>
            {religionOptions.map(opt => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className={cn(
                  "rounded-md px-3 py-2 m-1 transition duration-200",
                  optionHover
                )}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-2">
        <Label htmlFor="maritalStatus" className={labelColor}>
          {t('register.step2.marital_status')}
        </Label>
        <Select value={maritalStatus} onValueChange={onMaritalStatusChange}>
          <SelectTrigger
            id="maritalStatus"
            className={cn(
              "w-full text-base rounded-lg shadow-sm border-none px-3 py-2 transition focus:ring-2 focus:ring-emerald-600",
              gradient,
              hoverGradient,
              !maritalStatus && "text-muted-foreground font-normal"
            )}
          >
            <SelectValue placeholder={t('register.step2.marital_placeholder')} />
          </SelectTrigger>
          <SelectContent className={cn("rounded-lg shadow-lg mt-2 p-1 border-none bg-white/90 dark:bg-[rgb(55,65,81)] dark:text-white z-[1000]")}>
            {maritalStatusOptions.map(opt => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className={cn(
                  "rounded-md px-3 py-2 m-1 transition duration-200",
                  optionHover
                )}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default PersonalDetailsSection;
