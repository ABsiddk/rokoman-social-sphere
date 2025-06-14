
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
  inputBgColor = 'bg-[rgb(55,65,81)] text-white border-none focus:ring-2 focus:ring-primary',
  t,
}) => {
  const { genderOptions, religionOptions, maritalStatusOptions } = useSelectOptions();
  const [open, setOpen] = React.useState(false);

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
                "w-full justify-start text-left font-normal",
                inputBgColor,
                !dateOfBirth && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 opacity-80" />
              {parsedDate ? format(parsedDate, "PPP") : t('register.step2.date_of_birth_placeholder')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
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
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-2">
        <Label htmlFor="gender" className={labelColor}>
          {t('register.step2.gender')}
        </Label>
        <Select value={gender} onValueChange={onGenderChange}>
          <SelectTrigger id="gender" className={cn(inputBgColor, 'text-white')}>
            <SelectValue placeholder={t('register.step2.gender_placeholder')} />
          </SelectTrigger>
          <SelectContent className="bg-[rgb(55,65,81)] text-white z-50 border-none">
            {genderOptions.map(opt => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="text-[rgb(145,153,165)] data-[state=checked]:text-white"
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
          <SelectTrigger id="religion" className={cn(inputBgColor, 'text-white')}>
            <SelectValue placeholder={t('register.step2.religion_placeholder')} />
          </SelectTrigger>
          <SelectContent className="bg-[rgb(55,65,81)] text-white z-50 border-none">
            {religionOptions.map(opt => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="text-[rgb(145,153,165)] data-[state=checked]:text-white"
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
          <SelectTrigger id="maritalStatus" className={cn(inputBgColor, 'text-white')}>
            <SelectValue placeholder={t('register.step2.marital_placeholder')} />
          </SelectTrigger>
          <SelectContent className="bg-[rgb(55,65,81)] text-white z-50 border-none">
            {maritalStatusOptions.map(opt => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="text-[rgb(145,153,165)] data-[state=checked]:text-white"
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
