'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { code: 'fr', label: 'Français', flag: '🇨🇮' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
] as const;

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<string>('fr');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Changer la langue"
      >
        <Globe size={16} />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 min-w-[130px] rounded-xl border border-border/50 bg-background/95 backdrop-blur-xl p-1 shadow-lg">
            {LANGUAGES.map(({ code, label, flag }) => (
              <button
                key={code}
                onClick={() => {
                  setCurrentLang(code);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                  currentLang === code
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <span>{flag}</span>
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
