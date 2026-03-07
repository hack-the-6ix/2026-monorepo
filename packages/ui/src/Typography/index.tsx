import { ElementType } from 'react';
import cn from 'classnames';

import type { PolymorphicProps } from '../index';

import './index.css';

export const textSizes = {
  display: 'md:text-5xl text-4xl',
  'heading-lg': 'md:text-4xl text-3xl',
  'heading-sm': 'md:text-3xl ext-2xl',
  'subtitle-lg': 'md:text-2xl text-xl',
  'subtitle-sm': 'md:text-xl text-lg',
  'paragraph-lg': 'md:text-lg text-base',
  'paragraph-sm': 'md:text-base text-sm',
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

export type TypographyProps<T extends ElementType> = PolymorphicProps<
  {
    textSize?: TextSize;
    textWeight?: TextWeight;
  },
  T
>;

export function Typography<T extends ElementType = 'span'>({
  textSize = 'paragraph-sm',
  textWeight,
  className,
  as,
  ...props
}: TypographyProps<T>) {
  const Component = as || 'span';

  return (
    <Component
      className={cn(
        'typography',
        textWeight && textWeights[textWeight],
        textSizes[textSize],
        className,
      )}
      {...props}
    />
  );
}
