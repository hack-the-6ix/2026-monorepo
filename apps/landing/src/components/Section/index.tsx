import { HTMLAttributes, ReactNode } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string;
  baseColor: string; // The main color of THIS section
  nextColor?: string; // The start color of the NEXT section
  children: ReactNode;
}

export default function Section({
  id,
  baseColor,
  nextColor,
  children,
  className = '',
  ...props
}: SectionProps) {
  const background =
    nextColor ?
      `linear-gradient(to bottom, ${baseColor}, ${nextColor})`
    : baseColor;

  return (
    <section
      id={id}
      style={{ background: background }}
      className={`w-full min-h-screen flex flex-col px-8 md:px-16 ${className}`}
      {...props}
    >
      <div className="max-w-[1700px] w-full mx-auto py-24">{children}</div>
    </section>
  );
}
