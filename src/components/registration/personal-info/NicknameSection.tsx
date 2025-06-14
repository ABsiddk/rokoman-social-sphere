
import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';

interface NicknameSectionProps {
  nickNames: string[];
  onUpdate: (nickNames: string[]) => void;
  labelColor?: string;
  inputBgColor?: string;
  t: (key: string) => string;
}

const TOTAL_NICKNAMES = 5; // Nickname 1 handled separately

const NicknameSection = ({
  nickNames,
  onUpdate,
  labelColor = 'text-[rgb(145,153,165)]',
  inputBgColor = 'bg-[rgb(55,65,81)] text-white border-none focus:ring-2 focus:ring-primary',
  t,
}: NicknameSectionProps) => {
  // Only allow up to 5 nicknames (Nickname 1 handled outside)
  const visibleNicknames = (nickNames ?? []).slice(1);
  const nextToShow = visibleNicknames.findIndex(n => n === '') === -1
    ? visibleNicknames.length
    : visibleNicknames.findIndex(n => n === '');

  const handleChange = (idx: number, value: string) => {
    const updated = [...nickNames];
    updated[idx + 1] = value; // Nickname fields start from 1 here
    onUpdate(updated);
  };

  const handleAdd = () => {
    const updated = [...nickNames];
    const nextIdx = visibleNicknames.findIndex(n => n === '');
    if (nextIdx !== -1) {
      updated[nextIdx + 1] = '';
      onUpdate(updated);
    }
  };

  // Show min 1 nickname, max up to TOTAL_NICKNAMES - 1 (excluding Nickname 1), hide empty at end unless added
  const numFields = Math.max(1, visibleNicknames.filter((n, i) => n || i < nextToShow + 1).length);

  return (
    <div>
      {[...Array(TOTAL_NICKNAMES - 1)].map((_, i) =>
        (i < numFields) ? (
          <div key={i + 2} className="mb-2">
            <Label htmlFor={`nickname${i + 2}`} className={labelColor}>
              {t('register.step2.nickname')} {i + 2}
            </Label>
            <Input
              id={`nickname${i + 2}`}
              value={nickNames?.[i + 1] || ''}
              onChange={e => handleChange(i, e.target.value)}
              placeholder={t('register.step2.nickname_placeholder')}
              className={inputBgColor}
              autoComplete="off"
            />
          </div>
        ) : null
      )}
      {numFields < (TOTAL_NICKNAMES - 1) && (
        <Button
          type="button"
          variant="outline"
          onClick={handleAdd}
          className="mt-2 text-[rgb(145,153,165)] border-[rgb(145,153,165)]"
        >
          {t('register.step2.add_nickname')}
        </Button>
      )}
    </div>
  );
};

export default NicknameSection;

