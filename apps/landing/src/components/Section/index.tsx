import { HTMLAttributes, ReactNode } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string;
  backgroundColor: string;
  children: ReactNode;
  className?: string;
}

export default function Section({
  id,
  backgroundColor,
  children,
  className = '',
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      style={{ background: backgroundColor }}
      className={`w-full min-h-screen flex flex-col ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
