
import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Plus, X } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface NicknameSectionProps {
  nickNames: string[];
  onUpdate: (nickNames: string[]) => void;
}

const NicknameSection = ({ nickNames, onUpdate }: NicknameSectionProps) => {
  const { t } = useLanguage();

  const addNickname = () => {
    if (nickNames.length < 5) {
      onUpdate([...nickNames, '']);
    }
  };

  const removeNickname = (index: number) => {
    const newNicknames = nickNames.filter((_, i) => i !== index);
    onUpdate(newNicknames);
  };

  const updateNickname = (index: number, value: string) => {
    const newNicknames = [...nickNames];
    newNicknames[index] = value;
    onUpdate(newNicknames);
  };

  return (
    <div className="md:col-span-2">
      <Label>{t('register.step2.nickname')}</Label>
      {nickNames.map((nickname, index) => (
        <div key={index} className="flex items-center space-x-2 mt-2">
          <Input
            value={nickname}
            onChange={(e) => updateNickname(index, e.target.value)}
            placeholder={t('register.step2.nickname.placeholder')}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeNickname(index)}
          >
            <X size={16} />
          </Button>
        </div>
      ))}
      {nickNames.length < 5 && (
        <Button
          type="button"
          variant="outline"
          onClick={addNickname}
          className="mt-2"
        >
          <Plus size={16} className="mr-2" />
          {t('register.step2.nickname.add')}
        </Button>
      )}
    </div>
  );
};

export default NicknameSection;
