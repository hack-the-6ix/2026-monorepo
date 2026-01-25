import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    'border border-solid flex gap-2 items-center justify-center overflow-clip px-6 py-3 rounded-[32px] shrink-0 font-semibold text-[16px] leading-[20px] text-center tracking-[-0.176px] whitespace-nowrap transition-colors';

  const variantClasses =
    variant === 'primary'
      ? 'bg-[var(--color-bg-primary,#2da990)] border-[var(--color-border-primary,#2da990)] text-[var(--color-text-primary-white,#f9fafb)] hover:opacity-90'
      : 'bg-transparent border-white/20 text-white hover:bg-white/10';

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
