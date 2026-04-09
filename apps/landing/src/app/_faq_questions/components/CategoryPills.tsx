'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Typography } from '@hackthe6ix/ui';

const OPTIONS = ['General', 'Application', 'Event'];

export default function CategoryPills({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (v: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full md:max-w-none">
      <div className="hidden md:inline-flex bg-primary-500 rounded-full gap-3 p-0">
        {OPTIONS.map((opt) => {
          const isSelected = selected === opt;

          return (
            <Button
              key={opt}
              aria-pressed={isSelected}
              onClick={() => onSelect(opt)}
              className={`
                px-10 py-3 min-w-[10.625rem] rounded-full flex items-center justify-center
                text-white font-semibold text-sm
                border transition-colors duration-200
                ${
                  isSelected ?
                    'bg-primary-600 border-primary-600'
                  : 'bg-primary-500 border-primary-500 hover:bg-primary-600'
                }
              `}
            >
              <Typography textSize="paragraph-sm" textColor="text-neutral-50">
                {opt}
              </Typography>
            </Button>
          );
        })}
      </div>

      <div className="md:hidden relative w-[90vw] mx-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full flex items-center justify-between px-6 py-3.5 rounded-[24px] bg-primary-600 text-white font-semibold text-sm transition-all duration-200
            ${isOpen ? 'rounded-b-none' : ''}
          `}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <Typography textSize="paragraph-sm" textColor="text-neutral-50">
            {selected}
          </Typography>
          <svg
            className={`w-4 h-4 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {isOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-primary-500 rounded-b-[18px] overflow-hidden shadow-lg z-20 border-t border-primary-400"
            role="listbox"
          >
            {OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`
                  w-full px-6 py-3 text-left flex items-center justify-start text-white transition-colors duration-200 cursor-pointer
                  ${
                    selected === option ? 'bg-primary-600' : (
                      'bg-primary-500 hover:bg-primary-600 focus:bg-primary-600'
                    )
                  }
                `}
                role="option"
                aria-selected={selected === option}
              >
                <Typography textSize="paragraph-sm" textColor="text-neutral-50">
                  {option}
                </Typography>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
