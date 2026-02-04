import React from 'react';
import Image from 'next/image';
import { assets } from '../../lib/assets';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-white/80">{label}</label>
      )}
      <div className="bg-[var(--color-input-bg)] border border-[var(--color-border-primary)] flex gap-2 items-center px-4 py-3 rounded-full w-full">
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-[16px] leading-[20px] text-[var(--color-text-placeholder)] placeholder:text-[var(--color-text-placeholder)] tracking-[-0.176px] min-w-0"
          {...props}
        />
        <div className="relative shrink-0 w-[18px] h-[18px] flex items-center justify-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="#99a1af"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
