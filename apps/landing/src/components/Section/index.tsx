import { ElementType } from 'react';
import { PolymorphicProps } from '@hackthe6ix/ui/index.js';

type SectionProps<T extends ElementType> = PolymorphicProps<
  {
    id: string;
    backgroundColor: string;
  },
  T
>;

export default function Section<T extends ElementType>({
  id,
  backgroundColor,
  children,
  className = '',
  as,
  ...props
}: SectionProps<T>) {
  const Component = as || 'section';
  return (
    <Component
      id={id}
      style={{ background: backgroundColor }}
      className={`w-full min-h-screen flex flex-col py-12 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
