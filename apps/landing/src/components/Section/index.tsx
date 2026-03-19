import { ComponentPropsWithoutRef } from 'react';

interface SectionProps extends Omit<ComponentPropsWithoutRef<'section'>, 'id'> {
  id: string;
  backgroundColor: string;
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
