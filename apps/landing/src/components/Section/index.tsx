import { ComponentPropsWithoutRef } from 'react';

interface SectionProps extends Omit<ComponentPropsWithoutRef<'section'>, 'id'> {
  id: string;
  backgroundColor: string;
  noPadding?: boolean;
}

export default function Section({
  id,
  backgroundColor,
  children,
  className = '',
  noPadding = false,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      style={{ background: backgroundColor }}
      className={`w-full min-h-screen flex flex-col py-12 ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
