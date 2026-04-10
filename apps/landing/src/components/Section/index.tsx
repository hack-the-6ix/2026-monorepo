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
  style,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      style={{ background: backgroundColor, ...style }}
      className={`w-full min-h-screen flex flex-col py-12 ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
