import { HTMLAttributes, ReactNode } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string;
  backgroundColor: string;
  children: ReactNode;
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
      className={`w-full min-h-screen flex flex-col px-8 md:px-16 ${className}`}
      {...props}
    >
      <div className="max-w-[1700px] w-full mx-auto py-24">{children}</div>
    </section>
  );
}
