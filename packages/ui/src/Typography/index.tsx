import { ElementType } from 'react';
import cn from 'classnames';

import type { PolymorphicProps } from '../index';

import './index.css';

export const textSizes = {
  display: 'text-5xl md:text-4xl',
  'heading-lg': 'text-4xl md:text-3xl',
  'heading-sm': 'text-3xl md:text-2xl',
  'subtitle-lg': 'text-2xl md:text-xl',
  'subtitle-sm': 'text-xl md:text-lg',
  'paragraph-lg': 'text-lg md:text-base',
  'paragraph-sm': 'text-base md:text-sm',
  label: 'text-sm md:text-xs',
} as const;
export type TextSize = keyof typeof textSizes;

export const textWeights = {
  regular: 'font-normal',
  medium: 'font-medium',
  'semi-bold': 'font-semi',
  bold: 'font-bold',
  'extra-bold': 'font-extrabold',
} as const;
export type TextWeight = keyof typeof textWeights;

export type TypographyProps<T extends ElementType = 'span'> = PolymorphicProps<
  {
    textSize?: TextSize;
    textWeight?: TextWeight;
  },
  T
>;

export function Typography<T extends ElementType>({
  textSize = 'paragraph-sm',
  textWeight,
  className,
  as,
  ...props
}: TypographyProps<T>) {
  const Component = as ?? 'span';

  return (
    <Component
      className={cn(
        'font-sans',
        textWeight && textWeights[textWeight],
        textSizes[textSize],
        className,
      )}
      {...props}
    />
  );
}
