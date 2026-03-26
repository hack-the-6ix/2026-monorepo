'use client';

import { useState } from 'react';
import { Button, Typography } from '@hackthe6ix/ui';

const OPTIONS = ['General', 'Application', 'Event'];

export default function CategoryPills({
  onChange,
}: {
  onChange?: (v: string) => void;
}) {
  const [selected, setSelected] = useState('General');

  function handleClick(v: string) {
    setSelected(v);
    onChange?.(v);
  }

  return (
    <div
      className="inline-flex bg-[#2DA990] rounded-full gap-3"
      role="tablist"
      aria-label="FAQ categories"
    >
      {OPTIONS.map((opt) => {
        const isSelected = selected === opt;

        return (
          <Button
            key={opt}
            role="tab"
            aria-selected={isSelected}
            onClick={() => handleClick(opt)}
            className={`
              px-10 py-3 min-w-[170px] rounded-[32px] flex items-center justify-center
              text-white font-semibold text-sm
              transition-all duration-200
              ${
                isSelected ? 'bg-[#208170]' : (
                  'bg-[#2DA990] border border-[#2DA990]'
                )
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
  );
}
