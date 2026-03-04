import { ElementType } from 'react';
import cn from 'classnames';

import type { PolymorphicProps } from '../index';

export type TypographyProps<T extends ElementType = 'span'> = PolymorphicProps<
  {},
  T
>;

export function Typography({ children, className }: TypographyProps) {
  return <div className={cn('text-base', className)}>{children}</div>;
}
