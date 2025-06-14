
import React, { useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, Eye, ChevronDown, X, RotateCcw, Save } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const ThemeControls = () => {
  const {
    mode,
    setMode,
    settings,
    updateSettings,
    resetSettings,
    saveSettings,
    isPropertiesOpen,
    toggleProperties,
    closeProperties,
  } = useTheme();

  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        closeProperties();
      }
    };

    if (isPropertiesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isPropertiesOpen, closeProperties]);

  const handleLongPress = () => {
    toggleProperties();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleProperties();
  };

  const toggleTheme = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const getModeIcon = () => {
    switch (mode) {
      case 'light':
        return <Sun className="text-yellow-500" size={20} />;
      case 'dark':
        return <Moon className="text-blue-400" size={20} />;
      case 'system':
        return <Monitor className="text-gray-600 dark:text-gray-300" size={20} />;
      case 'colorBlind':
        return <Eye className="text-purple-500" size={20} />;
      default:
        return <Moon className="text-blue-400" size={20} />;
    }
  };

  return (
    <div className="relative">
      <Popover open={isPropertiesOpen} onOpenChange={closeProperties}>
        <PopoverTrigger asChild>
          <div className="relative">
            <button
              ref={triggerRef}
              onClick={toggleTheme}
              onContextMenu={handleContextMenu}
              onMouseDown={(e) => {
                const timer = setTimeout(handleLongPress, 500);
                const handleMouseUp = () => {
                  clearTimeout(timer);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                document.addEventListener('mouseup', handleMouseUp);
              }}
              className="relative p-2 rounded-lg bg-gradient-to-r from-[rgb(39,113,150)] via-[rgb(75,145,185)] to-[rgb(129,130,135)] hover:shadow-lg transition-all duration-200 group hover:from-[rgb(45,125,165)] hover:via-[rgb(85,155,195)] hover:to-[rgb(139,140,145)]"
            >
              {getModeIcon()}
              <ChevronDown 
                className="absolute -bottom-1 -right-1 text-white bg-gradient-to-r from-[rgb(39,113,150)] to-[rgb(129,130,135)] rounded-full p-0.5" 
                size={12} 
              />
            </button>
          </div>
        </PopoverTrigger>
        
        <PopoverContent 
          className="w-80 p-4 bg-white dark:bg-gradient-to-br dark:from-[rgb(39,113,150)] dark:via-[rgb(54,128,165)] dark:to-[rgb(39,113,150)] border-[rgb(129,130,135)] shadow-xl"
          align="end"
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="text-[rgb(39,113,150)] dark:text-white" size={20} />
                <span className="font-semibold text-[rgb(39,113,150)] dark:text-white">আই কমফোর্ট</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeProperties}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <X size={16} />
              </Button>
            </div>

            {/* Theme Mode Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[rgb(39,113,150)] dark:text-white">থিম মোড</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'dark', label: 'ডার্ক', icon: Moon },
                  { key: 'light', label: 'লাইট', icon: Sun },
                  { key: 'system', label: 'ডিভাইস ডিফল্ট', icon: Monitor },
                  { key: 'colorBlind', label: 'কালার ব্লাইন্ড', icon: Eye },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setMode(key as any)}
                    className={`flex items-center space-x-2 p-2 rounded-lg border transition-all ${
                      mode === key
                        ? 'bg-[rgb(39,113,150)] text-white border-[rgb(39,113,150)]'
                        : 'bg-gray-50 dark:bg-[rgb(129,130,135)] text-[rgb(39,113,150)] dark:text-white border-gray-200 dark:border-[rgb(39,113,150)] hover:bg-gray-100 dark:hover:bg-[rgb(39,113,150)]/20'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-xs">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Adjustment Controls */}
            <div className="space-y-3">
              {[
                { key: 'brightness', label: 'ব্রাইটনেস', value: settings.brightness },
                { key: 'contrast', label: 'কনট্রাস্ট', value: settings.contrast },
                { key: 'saturation', label: 'সেচুরেশন', value: settings.saturation },
              ].map(({ key, label, value }) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between">
                    <label className="text-sm text-[rgb(39,113,150)] dark:text-white">{label}</label>
                    <span className="text-xs text-[rgb(129,130,135)] dark:text-gray-300">{value}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={value}
                    onChange={(e) => updateSettings({ [key]: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 dark:bg-[rgb(129,130,135)] rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between space-x-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetSettings}
                className="flex items-center space-x-1 border-[rgb(129,130,135)] text-[rgb(39,113,150)] dark:text-white hover:bg-[rgb(129,130,135)]/20"
              >
                <RotateCcw size={14} />
                <span>রিসেট</span>
              </Button>
              <Button
                size="sm"
                onClick={saveSettings}
                className="flex items-center space-x-1 bg-gradient-to-r from-[rgb(39,113,150)] via-[rgb(75,145,185)] to-[rgb(129,130,135)] hover:from-[rgb(45,125,165)] hover:via-[rgb(85,155,195)] hover:to-[rgb(139,140,145)] text-white"
              >
                <Save size={14} />
                <span>সেভ</span>
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThemeControls;
